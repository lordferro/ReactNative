import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import useRoute from "./assets/router/router";
import { setCustomText } from "react-native-global-props";
import { TextStyles } from "./assets/globalStyles";
import { NativeBaseProvider } from "native-base";
import theme from "./theme/index";
import { store } from "./redux/store";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  getAuth,
} from "firebase/auth";
import { auth } from "./firebase/config";
import { useState } from "react";

export default function App() {
  const [fontLoaded] = useFonts({
    "Roboto-Medium": require("./assets/Fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/Fonts/Roboto-Regular.ttf"),
  });
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      console.log("out");
    }
  });

  const routing = useRoute(user);

  if (!fontLoaded) {
    return null;
  }
  // set global text styles
  setCustomText(TextStyles);

  return (
    <NativeBaseProvider theme={theme}>
      <Provider store={store}>
        <NavigationContainer>{routing}</NavigationContainer>
      </Provider>
    </NativeBaseProvider>
  );
}
