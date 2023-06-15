import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import { setCustomText } from "react-native-global-props";
import { TextStyles } from "./assets/globalStyles";
import { NativeBaseProvider } from "native-base";
import theme from "./theme/index";
import { store } from "./redux/store";
import Main from "./assets/Components/Main";

export default function App() {
  const [fontLoaded] = useFonts({
    "Roboto-Medium": require("./assets/Fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/Fonts/Roboto-Regular.ttf"),
  });

  if (!fontLoaded) {
    return null;
  }
  // set global text styles
  setCustomText(TextStyles);

  return (
    <NativeBaseProvider theme={theme}>
      <Provider store={store}>
        <Main />
      </Provider>
    </NativeBaseProvider>
  );
}
