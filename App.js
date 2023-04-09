import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import AuthLoginScreen from "./apps/screens/auth/AuthLoginScreen";
import ScreenPembelianList from "./apps/screens/pembelian/ScreenPembelianList";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ScreenPembelianAdd from "./apps/screens/pembelian/ScreenPembelianAdd";
import WidgetCoreMenu from "./apps/widgets/core/WidgetCoreMenu";
import ScreenPembelianPay from "./apps/screens/pembelian/ScreenPembelianPay";

const theme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3498db",
    accent: "#f1c40f",
  },
};

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            activeTintColor: "#e91e63",
            itemStyle: { marginVertical: 5 },
          }}
          drawerContent={(props) => <WidgetCoreMenu {...props} />}
          initialRouteName="ScreenPembelianList">
          <Drawer.Screen
            name="ScreenAuthLogin"
            component={AuthLoginScreen}
            options={{ title: "Welcome", drawerItemStyle: { display: "none" } }}
          />
          <Drawer.Screen
            name="ScreenPembelianList"
            options={{
              headerBackVisible: false,
              title: "Pembelian",
              headerShown: false,
            }}
            component={ScreenPembelianList}
          />
          <Drawer.Screen
            name="ScreenPembelianAdd"
            options={{
              headerBackVisible: false,
              title: "Create Pembelian",
              headerShown: false,
              drawerItemStyle: { display: "none" },
            }}
            component={ScreenPembelianAdd}
          />
          <Drawer.Screen
            name="ScreenPembelianPay"
            options={{
              headerBackVisible: false,
              title: "Pembayaran",
              headerShown: false,
              drawerItemStyle: { display: "none" },
            }}
            component={ScreenPembelianPay}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

