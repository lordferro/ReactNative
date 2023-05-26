import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "../Screens/mainScreens/PostsScreen";
import CreatePostsScreen from "../Screens/mainScreens/CreatePostsScreen";
import ProfileScreen from "../Screens/mainScreens/ProfileScreen";
// icons
import { Feather, EvilIcons } from "@expo/vector-icons";
import Squares from "../img/squaresSVG";
import { colors } from "./ScreensCommonStyles";
import { useNavigation } from "@react-navigation/native";
import { getHeaderTitle } from "@react-navigation/elements";
import { Entypo } from "@expo/vector-icons";
import { Dimensions, StatusBar, Text, View } from "react-native";
import { Heading } from "native-base";
import { useEffect } from "react";

const MainTab = createBottomTabNavigator();

const HomeScreen = ({route}) => {
  const {height} = Dimensions.get('window')
  const navigation = useNavigation();
  
  useEffect(() => {
      console.log(route.params)
  
    },[route.params]);

  return (
    <MainTab.Navigator
      screenOptions={{
        unmountOnBlur: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#fff",
        tabBarActiveBackgroundColor: `${colors.accentColor}`,
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
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather title="Go somewhere" name="plus" size={24} color={color} />
          ),
          tabBarStyle: { display: "none" },
          headerStyle: {
            display: "flex",
            height:
              Platform.OS === "android"
                ? StatusBar.currentHeight + height * 0.07
                : StatusBar.currentHeight + height * 0.07,

            justifyContent: "flex-end",
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: colors.placeholderTextColor,
          },
          header: ({  options }) => {
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
          headerStyle: {
            display: "flex",
            flexDirection: "row",
            height:
              Platform.OS === "android"
                ? StatusBar.currentHeight + height * 0.07
                : StatusBar.currentHeight + height * 0.07,
            justifyContent: "center",
            alignItems: "flex-end",
            borderBottomWidth: 1,
            borderBottomColor: colors.placeholderTextColor,
          },
          header: ({  options }) => {
         
            return (
              <View style={options.headerStyle}>
                <Heading style={{ fontSize: 17 }}>Posts</Heading>
                <Entypo
                  style={{ position: "relative", left: 100, top: -2 }}
                  name="log-out"
                  size={24}
                  color={colors.placeholderTextColor}
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
          headerStyle: {
            display: "flex",
            height:
              Platform.OS === "android"
                ? StatusBar.currentHeight + height * 0.07
                : StatusBar.currentHeight + height * 0.07,
            justifyContent: "flex-end",
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: colors.placeholderTextColor,
          },
          header: ({  options }) => {
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
