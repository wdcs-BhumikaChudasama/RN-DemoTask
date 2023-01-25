/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";

import Colors from "../constants/Colors";

import LoginScreen from "../screens/Auth/LoginScreen/LoginScreen";
import Web3Screen from "../screens/PostLogin/Web3Screen";
import {
  RootStackParamList,
  RootTabParamList,
  TabOneParamList,
  TabTwoParamList,
} from "../../types";
import LinkingConfiguration from "./LinkingConfiguration";
import HeaderDropdown from "./HeaderDropdown";
import NotFoundScreen from "../screens/Auth/NotFoundScreen";
import useColorScheme from "../../hooks/useColorScheme";
import { Magic } from "@magic-sdk/react-native-expo";
import { MAGIC_API_KEY } from "../constants/constant";
import Strings from "../constants/strings";
import icons from "../../assets/images";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import HomePageScreen from "../screens/PostLogin/HomePageScreen";
import EditUserDetails from "../screens/PostLogin/EditUserDetails";

export const magic = new Magic(MAGIC_API_KEY, {
  testMode: false,
});

const LoginRouter = () => (
  <Stack.Group navigationKey="login">
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="BottomTabScreen"
      component={BottomTabs}
      options={{ headerShown: false }}
    />
  </Stack.Group>
);

const Stack = createNativeStackNavigator<RootStackParamList>();
const HomeRouter = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomePageScreen"
      component={HomePageScreen}
      options={{ headerShown: true }}
    />
    <Stack.Screen
      name="EditUserDetails"
      component={EditUserDetails}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const ProfileRouter = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="NotFoundScreen"
      component={NotFoundScreen}
      options={{ headerShown: true }}
    />
  </Stack.Navigator>
);
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

export const BottomTabs = () => (
  <BottomTab.Navigator initialRouteName="HomePageScreen">
    <BottomTab.Screen
      name="HomeRouter"
      component={HomeRouter}
      options={{
        tabBarLabel: Strings.home,
        tabBarIcon: ({ color }) => (
          <TabBarIcon name="home" color={Colors.black} />
        ),
        headerShown: false,
      }}
    />
    <BottomTab.Screen
      name="ProfileRouter"
      component={ProfileRouter}
      options={{
        tabBarLabel: Strings.profile,
        tabBarIcon: ({ color }) => (
          <TabBarIcon name="user-circle" color={Colors.black} />
        ),
        headerShown: false,
      }}
    />
    {/* <BottomTab.Screen
			name={Strings.bottomTabCreate}
			component={() => <></>}
			options={{
				tabBarLabel: Strings.bottomTabCreate,
				selectedIconName: icons.ic_create_bet,
				unSelectedIconName: icons.ic_create_bet,
				headerShown: false
			}}
		/> */}
  </BottomTab.Navigator>
);

const RootRouter = () => {
  const userInfo = useSelector((state: RootState) => {
    return state.userInfo.data;
  });
  if (userInfo?.user?.publicAddress) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  } else {
    return <Stack.Navigator>{LoginRouter()}</Stack.Navigator>;
  }
};

export default function Navigation() {
  const userInfo = useSelector((state: RootState) => {
    return state.userInfo.data;
  });
  return (
    <NavigationContainer
      linking={userInfo?.user?.publicAddress && LinkingConfiguration}
    >
      <magic.Relayer />
      <RootRouter />
    </NavigationContainer>
  );
}
