import React, { Component } from "react";
import { StyleSheet, FlatList } from "react-native";
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Text,
  Thumbnail,
  Left,
  Right
} from "native-base";
import CardFriend from "../components/CardFriend";
import Loading from "../components/Loading";

export default class Friends extends Component {
  componentDidMount() {
    this.props.getRecommendation(this.props.access_token);
  }

  _keyExtractor = (item, index) => item.id;

  toChat = id => {
    this.props.navigation.navigate("Chat", {
      id
    });
  };

  renderFriendRecommendation = ({ item }) => (
    <CardFriend
      key={item.id}
      name={item.username}
      photo={item.cover}
      status="dummy"
      onPress={() => this.toChat(item.id)}
    />
  );

  render() {
    if (this.props.isLoading) {
      return <Loading />;
    }
    return (
      <Container>
        <Content>
          <Card style={styles.card}>
            <CardItem>
              <Left>
                <Thumbnail
                  large
                  source={{ uri: "https://placeimg.com/640/480/people" }}
                />
                <Body>
                  <Text style={styles.txtName}>{this.props.user.username}</Text>
                  <Text note>status azure</Text>
                </Body>
              </Left>
            </CardItem>
            <Text style={styles.txtHead}>Friends</Text>
            <CardFriend />
            <CardFriend />
            <Text style={styles.txtHead}>Friend recommendations</Text>
            <FlatList
              data={this.props.recommendations}
              renderItem={this.renderFriendRecommendation}
              keyExtractor={this.keyExtractor}
            />
            <CardFriend />
            <CardFriend />
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    padding: 5
  },
  txtName: {
    fontSize: 20,
    fontWeight: "bold"
  },
  txtHead: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5
  }
});
