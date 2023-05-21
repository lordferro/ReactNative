import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "../Screens/mainScreens/PostsScreen";
import CreatePostsScreen from "../Screens/mainScreens/CreatePostsScreen";
import ProfileScreen from "../Screens/mainScreens/ProfileScreen";
// icons
import { Feather, EvilIcons } from "@expo/vector-icons";
import Squares from "../img/squaresSVG";
import { colors } from "./ScreensCommonStyles";
import { useNavigation } from "@react-navigation/native";

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
          tabBarIconStyle: {},
        }}
      />
      <MainTab.Screen
        name="Создать публикацию"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather title="Go somewhere" name="plus" size={24} color={color} />
          ),
          tabBarIconStyle: {},
          tabBarStyle:{display:'none'}
        }}
      />
      <MainTab.Screen
        name="Профиль"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
          tabBarIconStyle: {},
        }}
      />
    </MainTab.Navigator>
  );
};

export default HomeScreen;
