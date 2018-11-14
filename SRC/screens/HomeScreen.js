import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  AsyncStorage,
  Platform
} from "react-native";
import { Header, Body, Container, Content } from "native-base";
import Timeline from "react-native-timeline-listview";
import axios from "axios";

class HomeScreen extends Component {
  signOut = async () => {
    AsyncStorage.clear();
    this.props.navigation.navigate("AuthLoading");
  };

  state = {
    data: [],
    student_id: "278"
  };

  componentWillMount = async () => {
    // const userid = await AsyncStorage.getItem('user_id');
    // this.state.student_id = userid

    try {
      let { data } = await axios
        .post("https://chat.qualpros.com/api/student_private_tution_history", {
          student_id: "278"
        })
        .then(response => {
          if (response.data.data.status === "success") {
            //console.log(response.data.data.private_tution_confirm_array)
            this.setState({
              data: response.data.data.private_tution_confirm_array
            });
            // console.log(response.data.data.tutor_list_array);
          } else {
            console.log(response.data.data);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  renderDetail(rowData, sectionID, rowID) {
    let title = <Text style={[styles.title]}>{rowData.title}</Text>;
    var desc = null;
    if (rowData.description && rowData.imageUrl)
      desc = (
        <View style={styles.descriptionContainer}>
          <Image source={{ uri: rowData.imageUrl }} style={styles.image} />
          <Text style={[styles.textDescription]}>{rowData.description}</Text>
        </View>
      );

    return (
      <View style={{ flex: 1 }}>
        {title}
        {desc}
      </View>
    );
  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: "#d91009" }}>
          <Body>
            <Text
              style={{
                alignSelf: Platform.OS == "android" ? "center" : null,
                fontSize: 17,
                color: "#fff"
              }}
            >
              Home
            </Text>
          </Body>
        </Header>
        <Content>
          <Timeline
            circleColor="#939eaf"
            lineColor="#d91009"
            style={styles.list}
            data={this.state.data}
            innerCircle={"dot"}
            timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
            timeStyle={{
              textAlign: "center",
              backgroundColor: "#d91009",
              color: "white",
              padding: 5,
              borderRadius: 13
            }}
            descriptionStyle={{ color: "#939eaf" }}
            options={{
              style: { paddingTop: 5 }
            }}
            innerCircle={"icon"}
            timeContainerStyle={{ minWidth: 72 }}
            renderDetail={this.renderDetail}
          />
        </Content>
      </Container>
    );
  }
}
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  list: {
    flex: 1,
    marginTop: 20
  },
  title: {
    fontSize: 16,
    fontWeight: "bold"
  },
  descriptionContainer: {
    flexDirection: "row",
    paddingRight: 50
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  textDescription: {
    marginLeft: 10,
    color: "gray"
  }
});
