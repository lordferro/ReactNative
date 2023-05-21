import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import useRoute from "./assets/router/router";
import { setCustomText } from "react-native-global-props";
import { TextStyles } from "./assets/globalStyles";
import { NativeBaseProvider } from "native-base";
import theme from "./theme/index";

export default function App() {
  const [fontLoaded] = useFonts({
    "Roboto-Medium": require("./assets/Fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/Fonts/Roboto-Regular.ttf"),
  });
  // set global text styles
  
    if (!fontLoaded) {
      return null;
    }
  setCustomText(TextStyles);
  const routing = useRoute();

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>{routing}</NavigationContainer>
    </NativeBaseProvider>
  );
}
