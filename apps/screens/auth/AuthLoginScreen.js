import {
  ActivityIndicator,
  Button,
  Card,
  MD2Colors,
  TextInput,
} from "react-native-paper";
import { Alert, StyleSheet, View } from "react-native";
import { useState, useEffect, useMemo } from "react";
import ServiceAuthLogin from "../../services/auth/ServiceAuthLogin";
import ServiceTokenSave from "../../services/token/ServiceTokenSave";
import ServiceAuthCheck from "../../services/auth/ServiceAuthCheck";
import { useIsFocused } from "@react-navigation/native";

const AuthLoginScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInput = (name, value) => {
    setUser((values) => ({ ...values, [name]: value }));
  };

  useEffect(() => {
    if (isFocused) {
      ServiceAuthCheck()
        .then((response) => {
          navigation.navigate("ScreenPembelianList");
        })
        .then((error) => {});
    }
  }, [isFocused]);

  const handleServiceAuthLogin = () => {
    ServiceAuthLogin(user)
      .then((response) => {
        ServiceTokenSave(response.data.token);
        Alert.alert("Sukses", "Anda berhasil login.");
        navigation.navigate("ScreenPembelianList");
      })
      .catch((error) => {});
  };

  return (
    <View style={styles.container}>
      {!isFocused && (
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
              onPress={handleServiceAuthLogin}
              style={{ width: "100%" }}
              icon="eye"
              mode="contained">
              Login
            </Button>
          </Card.Actions>
        </Card>
      )}
      {isFocused && (
        <ActivityIndicator animating={true} color={MD2Colors.red800} />
      )}
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
