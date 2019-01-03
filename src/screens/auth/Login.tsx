import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-elements";
import { Button, FormInput } from "../../components";

class Login extends React.Component {
  public static navigationOptions = {
    title: "Login"
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  public handleFieldUpdate(fieldName, value) {
    const state = {};
    state[fieldName] = value;
    this.setState(state);
  }

  public submitLogin() {
    const { email, password } = this.state;
    console.log(email, password);
  }

  public clearFields() {
    this.setState({
      email: "",
      password: ""
    });
  }

  public render() {
    const { email, password } = this.state;

    return (
      <Card containerStyle={styles.formContainer}>
        <FormInput
          autoCorrect={false}
          label="Email"
          onChangeText={text => this.handleFieldUpdate("email", text)}
          placeholder="example@email.com"
          value={email}
        />
        <FormInput
          autoCorrect={false}
          label="Password"
          onChangeText={text => this.handleFieldUpdate("password", text)}
          placeholder="At least 6 characters"
          secureTextEntry
          value={password}
        />
        <View style={styles.buttonWrapper}>
          <Button
            iconName="done"
            title="Submit"
            onPress={() => this.submitLogin()}
          />
          <Button
            iconName="clear"
            title="Clear"
            onPress={() => this.clearFields()}
          />
        </View>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20
  },
  formContainer: {
    flex: 1
  },
  formHeader: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center"
  }
});

export default Login;
