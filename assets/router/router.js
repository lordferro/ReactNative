import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens
import RegistrationScreen from "../Screens/Auth/RegistrationScreen";
import LoginScreen from "../Screens/Auth/LoginScreen";
import HomeScreen from "../Screens/HomeScreen";
import { CameraScreen } from "../Screens/NestedScreens/CameraScreen";

const AuthStack = createNativeStackNavigator(); // указывает на группу навигаторов

const useRoute = () => {

    return (
      <AuthStack.Navigator initialRouteName="HomeScreen">
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
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="CameraScreen"
          component={CameraScreen}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    );
  }


export default useRoute;
