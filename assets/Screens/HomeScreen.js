import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "../Screens/mainScreens/PostsScreen";
import ProfileScreen from "../Screens/mainScreens/ProfileScreen";
// icons
import { Feather } from "@expo/vector-icons";
import Squares from "../img/squaresSVG";
import { Entypo } from "@expo/vector-icons";

import { Dimensions, StatusBar, View } from "react-native";
import { Heading, useToken } from "native-base";
import CreatePostsStack from "../Screens/mainScreens/CreatePostsScreen";

const MainTab = createBottomTabNavigator();

const HomeScreen = () => {
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
        : StatusBar.currentHeight + height * 0.07,

    justifyContent: "flex-end",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: placeholderTextColor,
  };

  return (
    <MainTab.Navigator
      initialRouteName="CreatePost"
      backBehavior="history"
      screenOptions={{
        unmountOnBlur: true,
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
        tabBarStyle: { height: 83 },
        tabBarHideOnKeyboard: true,
      }}
    >
      <MainTab.Screen
        name="CreatePost"
        component={CreatePostsStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="plus" size={24} color={color} />
          ),
          tabBarStyle: { display: "none" },
          headerStyle: headerStyle,
          header: ({ options }) => {
            return (
              <View style={options.headerStyle}>
                <Heading style={{ fontSize: 17 }}>Create post</Heading>
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
                <Entypo
                  style={{ position: "relative", left: 100, top: -2 }}
                  name="log-out"
                  size={24}
                  color={placeholderTextColor}
                />
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
              </View>
            );
          },
        }}
      />
    </MainTab.Navigator>
  );
};

export default HomeScreen;
