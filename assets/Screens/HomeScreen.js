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
import { Text, View } from "react-native";
import { Heading } from "native-base";

const MainTab = createBottomTabNavigator();

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <MainTab.Navigator
      screenOptions={{
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
        name="Публикации"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ color }) => <Squares color={color} />,
          headerStyle: {
            display: "flex",
            flexDirection: "row",
            height: 88,
            justifyContent: "center",
            alignItems: "flex-end",
            borderBottomWidth: 1,
            borderBottomColor: colors.placeholderTextColor,
          },
          header: ({ route, options }) => {
            const title = getHeaderTitle(options, route.name);
            return (
              <View style={options.headerStyle}>
                <Heading style={{ fontSize: 17 }}>{title}</Heading>
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
        name="Создать публикацию"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather title="Go somewhere" name="plus" size={24} color={color} />
          ),
          tabBarStyle: { display: "none" },
          headerStyle: {
            display: "flex",
            height: 88,
            justifyContent: "flex-end",
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: colors.placeholderTextColor,
          },
          header: ({ route, options }) => {
            const title = getHeaderTitle(options, route.name);
            return (
              <View style={options.headerStyle}>
                <Heading style={{ fontSize: 17 }}>{title}</Heading>
              </View>
            );
          },
        }}
      />
      <MainTab.Screen
        name="Профиль"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
          headerStyle: {
            display: "flex",
            height: 88,
            justifyContent: "flex-end",
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: colors.placeholderTextColor,
          },
          header: ({ route, options }) => {
            const title = getHeaderTitle(options, route.name);
            return (
              <View style={options.headerStyle}>
                <Heading style={{ fontSize: 17 }}>{title}</Heading>
              </View>
            );
          },
        }}
      />
    </MainTab.Navigator>
  );
};

export default HomeScreen;
