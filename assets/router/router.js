import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens
import RegistrationScreen from "../Screens/Auth/RegistrationScreen";
import LoginScreen from "../Screens/Auth/LoginScreen";
import { CameraScreen } from "../Screens/NestedScreens/CameraScreen";
import { MapScreen } from "../Screens/NestedScreens/MapScreen";
import { HomeScreen } from "../Screens/NestedScreens/HomeScreen";

const AuthStack = createNativeStackNavigator();
const NestedStack = createNativeStackNavigator();

const useRoute = (props) => {
  return props ? (
    <NestedStack.Navigator>
      <NestedStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <NestedStack.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{ headerShown: false }}
      />
      <NestedStack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{ headerShown: true }}
      />
    </NestedStack.Navigator>
  ) : (
    <AuthStack.Navigator initialRouteName="RegistrationScreen">
      <AuthStack.Screen
        name="RegistrationScreen"
        component={RegistrationScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};

export default useRoute;

// import { createStackNavigator } from "@react-navigation/stack";
// import DefaultScreenCreatePosts from "../NestedScreens/DefaultScreenCreatePosts";
// import { CameraScreen } from "../NestedScreens/CameraScreen";
// import { MapScreen } from "../NestedScreens/MapScreen";
