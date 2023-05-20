import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens
import RegistrationScreen from "../Screens/Auth/RegistrationScreen";
import LoginScreen from "../Screens/Auth/LoginScreen";
import HomeScreen from "../Screens/HomeScreen";


const AuthStack = createNativeStackNavigator(); // указывает на группу навигаторов
const HomeStack = createNativeStackNavigator()

const useRoute = (isAuth) => {
  if (!isAuth) {
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
      </AuthStack.Navigator>
    );
  }
  return (
    <HomeStack.Navigator initialRouteName="HomeScreen">
      <HomeStack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
    </HomeStack.Navigator>
  );
};

export default useRoute;
