import { Button, Card, TextInput } from "react-native-paper";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthLoginScreen = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInput = (name, value) => {
    setUser((values) => ({ ...values, [name]: value }));
  };

  const login = async () => {
    try {
      let response = await fetch("http://192.168.1.4:4000/users/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      let { status } = response;
      let json = await response.json();

      if (status === 400) {
        throw await json;
      }

      await AsyncStorage.setItem("@token", json.token);
      return json;
    } catch (error) {
      console.log(error);
      Alert.alert("Ups", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title
          title="Login"
          subtitle="Untuk memasuki aplikasi ini, diharapkan login."
        />
        <Card.Content>
          <TextInput
            style={{ marginBottom: 15 }}
            label={"email"}
            mode="outlined"
            value={user.email || ""}
            onChangeText={(text) => handleInput("email", text)}
            keyboardType="email-address"
          />
          <TextInput
            style={{ marginBottom: 15 }}
            label={"password"}
            mode="outlined"
            value={user.password || ""}
            onChangeText={(text) => handleInput("password", text)}
            secureTextEntry
          />
        </Card.Content>
        <Card.Actions>
          <Button
            onPress={login}
            style={{ width: "100%" }}
            icon="eye"
            mode="contained">
            Login
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 4,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  card: {
    width: "100%",
  },
});

export default AuthLoginScreen;
