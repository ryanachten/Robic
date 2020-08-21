import * as React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

import { Text, View } from '../components/Themed';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <Input
        label="Email"
        placeholder="robic@user.com"
        leftIcon={<Icon name="envelope" size={24} color="black" />}
      />
      <Input
        label="Password"
        placeholder="***********"
        leftIcon={<Icon name="user" size={24} color="black" />}
      />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});