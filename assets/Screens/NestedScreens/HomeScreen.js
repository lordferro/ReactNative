import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "../mainTabScreens/PostsScreen";
import ProfileScreen from "../mainTabScreens/ProfileScreen";
// icons
import { Feather } from "@expo/vector-icons";
import Squares from "../../img/squaresSVG";

import { Dimensions, StatusBar, View } from "react-native";
import { Heading, useToken } from "native-base";
import { LogOutBtn } from "../../Components/LogOutBtn";
import CreatePostsScreen from "../mainTabScreens/CreatePostsScreen";

const MainTab = createBottomTabNavigator();

export const HomeScreen = () => {
  const [accentColor, placeholderTextColor] = useToken("colors", [
    "accentColor",
    "placeholderTextColor",
  ]);
  const { height } = Dimensions.get("window");

  const headerStyle = {
    display: "flex",
    height:
      Platform.OS === "android"
        ? StatusBar.currentHeight + height * 0.07
        : StatusBar.currentHeight + height * 0.08,

    justifyContent: "flex-end",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: placeholderTextColor,
  };

  return (
    <MainTab.Navigator
      initialRouteName="Posts"
      backBehavior="history"
      screenOptions={{
        unmountOnBlur: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#fff",
        tabBarActiveBackgroundColor: accentColor,
        tabBarItemStyle: {
          borderRadius: 100,
          width: 70,
          height: 40,
          marginTop: 9,
          marginHorizontal: 20,
        },
        tabBarStyle: { height: 60 },
        tabBarHideOnKeyboard: true,
      }}
    >
      <MainTab.Screen
        name="CreatePost"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="plus" size={24} color={color} />
          ),
          headerStyle: headerStyle,
          header: ({ options }) => {
            return (
              <View style={options.headerStyle}>
                <Heading style={{ fontSize: 17 }}>Create post</Heading>
                <LogOutBtn />
              </View>
            );
          },
        }}
      />
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ color }) => <Squares color={color} />,
          headerStyle: headerStyle,
          header: ({ options }) => {
            return (
              <View style={options.headerStyle}>
                <Heading style={{ fontSize: 17 }}>Posts</Heading>
                <LogOutBtn />
              </View>
            );
          },
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
          headerStyle: headerStyle,
          header: ({ options }) => {
            return (
              <View style={options.headerStyle}>
                <Heading style={{ fontSize: 17 }}>Profile</Heading>
                <LogOutBtn />
              </View>
            );
          },
        }}
      />
    </MainTab.Navigator>
  );
};

