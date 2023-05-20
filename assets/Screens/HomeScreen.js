import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "../Screens/mainScreens/PostsScreen";
import CreatePostsScreen from "../Screens/mainScreens/CreatePostsScreen";
import ProfileScreen from "../Screens/mainScreens/ProfileScreen";
// icons
import { Feather } from "@expo/vector-icons";
import Squares from "../img/squaresSVG";
const MainTab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <MainTab.Screen
        options={{
          tabBarIcon: ({ color }) => <Squares color={color} />,
          tabBarIconStyle: {},
        }}
        name="Публикации"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <Feather title="Go somewhere" name="plus" size={24} color={color} />
          ),
          tabBarIconStyle: {},
        }}
        name="Создать публикацию"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
          tabBarIconStyle: {},
        }}
        name="Профиль"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

export default HomeScreen;
