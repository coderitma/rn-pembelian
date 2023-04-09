// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
} from "react-native";

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Divider } from "react-native-paper";

const WidgetCoreMenu = (props) => {
  return (
    <SafeAreaView style={{ flex: 1, marginTop: 80 }}>
      {/*Top Large Image */}
      <Image
        source={{
          uri: "https://www.iconarchive.com/download/i87032/graphicloads/colorful-long-shadow/Book.256.png",
        }}
        style={styles.sideMenuProfileIcon}
      />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <Divider style={{ marginTop: 20 }} />
        <DrawerItem
          label="My GitHub"
          onPress={() => Linking.openURL("https://github.com/coderitma")}
        />
        <View style={styles.customItem}>
          <Text
            onPress={() => {
              Linking.openURL("https://juaracoding.com/");
            }}>
            Rate Us
          </Text>
          <Image
            source={{
              uri: "https://www.iconarchive.com/download/i42772/oxygen-icons.org/oxygen/Actions-rating.256.png",
            }}
            style={styles.iconStyle}
          />
        </View>
      </DrawerContentScrollView>
      <Text
        style={{
          fontSize: 16,
          textAlign: "center",
          color: "grey",
        }}>
        © YanzenProject, 2023
      </Text>
      <Text
        style={{
          fontSize: 16,
          textAlign: "center",
          color: "grey",
          marginBottom: 30,
        }}>
        Build with love.
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: "center",
    width: 100,
    height: 100,
    borderRadius: 0,
    alignSelf: "center",
    marginBottom: 100 / 2,
  },
  iconStyle: {
    width: 16,
    height: 16,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default WidgetCoreMenu;
