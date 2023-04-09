import { Appbar } from "react-native-paper";
import { View, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import ServiceAuthCheck from "../../services/auth/ServiceAuthCheck";

const WidgetCoreLayout = ({
  navigation,
  children,
  title,
  actionFAB,
  actions,
  actionBack,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    ServiceAuthCheck()
      .then((response) => {})
      .catch((error) => {
        navigation.navigate("ScreenAuthLogin");
      });
  }, []);

  return (
    <>
      <SafeAreaView>
        <StatusBar hidden={true} barStyle={"light-content"} />
        <Appbar.Header>
          {!actionBack && (
            <Appbar.Action
              icon="menu"
              onPress={() => {
                navigation.toggleDrawer();
              }}
            />
          )}
          {actionBack && (
            <Appbar.BackAction
              onPress={() => {
                navigation.navigate(actionBack);
              }}
            />
          )}
          <Appbar.Content title={title} />
          {actions}
        </Appbar.Header>
        <View>{children}</View>
      </SafeAreaView>
      {actionFAB}
    </>
  );
};

export default WidgetCoreLayout;
