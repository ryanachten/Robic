import gql from "graphql-tag";
import * as React from "react";
import { compose, graphql } from "react-apollo";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-elements";
import { ActivityChart, LogOutButton, ScreenHeader } from "../components";

class Dashboard extends React.Component {
  public static navigationOptions = {
    headerRight: <LogOutButton />,
    title: "Activity"
  };

  public state = {
    exercises: [
      {
        title: "Benchpress",
        highestNetValue: 72.5 * 5 * 5,
        recentSessions: [
          { date: new Date(2018, 11, 29), netValue: 70 * 5 * 5 },
          { date: new Date(2018, 12, 6), netValue: 72.5 * 3 * 5 },
          { date: new Date(2018, 12, 13), netValue: 72.5 * 4 * 5 },
          { date: new Date(2018, 12, 20), netValue: 72.5 * 5 * 5 }
        ]
      },
      {
        title: "Incline Butterfly",
        highestNetValue: 22 * 8 * 4,
        recentSessions: [
          { date: new Date(2018, 11, 29), netValue: 20 * 8 * 4 },
          { date: new Date(2018, 12, 6), netValue: 22 * 6 * 4 },
          { date: new Date(2018, 12, 13), netValue: 22 * 7 * 4 },
          { date: new Date(2018, 12, 20), netValue: 22 * 8 * 4 }
        ]
      },
      {
        title: "Z-Curl",
        highestNetValue: 14 * 10 * 4,
        recentSessions: [
          { date: new Date(2018, 11, 29), netValue: 10 * 10 * 4 },
          { date: new Date(2018, 12, 6), netValue: 12 * 10 * 4 },
          { date: new Date(2018, 12, 13), netValue: 12 * 10 * 4 },
          { date: new Date(2018, 12, 20), netValue: 14 * 10 * 4 }
        ]
      }
    ]
  };

  public render() {
    const { exercises } = this.state;
    const { currentUser } = this.props.data;

    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.welcomeMessage}>{`${
            currentUser.firstName
          }'s recent activity`}</Text>
          <ActivityChart exercises={exercises} />
        </View>
        <Card>
          <Text>Stats</Text>
          <Text>Some line graph providing an overview of growth</Text>
          <Text>Exercise with most growth</Text>
          <Text>Exercise with least growth</Text>
        </Card>
        <Card>
          <Text>Recent session stats</Text>
          <Text>Some line graph providing an overview of growth</Text>
          <Text>Recent PB's</Text>
          <Text>Areas of focus</Text>
        </Card>
      </ScrollView>
    );
  }
}

const query = gql`
  {
    currentUser {
      firstName
    }
  }
`;

export default graphql(query)(Dashboard);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  welcomeMessage: {
    fontSize: 18,
    marginTop: 25
  }
});