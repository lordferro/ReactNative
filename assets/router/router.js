import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens
import RegistrationScreen from "../Screens/Auth/RegistrationScreen";
import LoginScreen from "../Screens/Auth/LoginScreen";
import { CameraScreen } from "../Screens/NestedScreens/CameraScreen";
import { Box, Center, Text } from "native-base";
import HomeScreen from "../Screens/HomeScreen";

const AuthStack = createNativeStackNavigator(); // указывает на группу навигаторов

const useRoute = (props) => {
  return props ? (
    <HomeScreen />
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
