import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens
import RegistrationScreen from "../Screens/Auth/RegistrationScreen";
import LoginScreen from "../Screens/Auth/LoginScreen";
import HomeScreen from "../Screens/HomeScreen";


const AuthStack = createNativeStackNavigator(); // указывает на группу навигаторов
const HomeStack = createNativeStackNavigator()

const useRoute = () => {

    return (
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
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    );
  }


export default useRoute;
