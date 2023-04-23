import { useCallback, useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { setCustomText } from "react-native-global-props";
import AddPhotoSvg from "../Components/AddPhotoSvg";

const loadApp = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("../Fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../Fonts/Roboto-Medium.ttf"),
  });
};

const customTextProps = {
  style: {
    fontFamily: "Roboto-Regular",
  },
};

const initialState = {
  email: "",
  password: "",
};

const LoginScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [passwordVisibleText, setPasswordVisibleText] = useState("Показать");
  const [isShowKeyboard, setisShowKeyboard] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);
  const { height, width } = useWindowDimensions();

  setCustomText(customTextProps);

  useEffect(() => {
        const hideSubscription = Keyboard.addListener( Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide", () => {
      setisShowKeyboard(false);
    });

    return () => {
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    async function prepare() {
      try {
        await loadApp();
      } catch (error) {
        console.warn(error);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onSubmit = () => {
    keyboardHide();
    console.log(state);
    setState(initialState);
  };

  const keyboardHide = () => {
    setisShowKeyboard(false);
    Keyboard.dismiss();
  };

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const showPassword = (e) => {
    if (passwordVisibleText === "Показать") {
      setPasswordVisibleText("Скрыть");
    } else {
      setPasswordVisibleText("Показать");
    }
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <TouchableWithoutFeedback
      onPress={keyboardHide}
      onLayout={onLayoutRootView}
    >
      <View style={styles.container}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require("../img/Photo_BG.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
          >
            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? -220 : 0,
              }}
            >
              <Text style={styles.formTitle}>Войти</Text>
              <TextInput
                style={{ ...styles.input, width: width - 32 }}
                placeholder="Адрес электронной почты"
                placeholderTextColor="#BDBDBD"
                value={state.email}
                onFocus={() => setisShowKeyboard(true)}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
              ></TextInput>
              <View>
                <TextInput
                  secureTextEntry={passwordVisible}
                  style={{ ...styles.input, width: width - 32 }}
                  placeholder="Пароль"
                  placeholderTextColor="#BDBDBD"
                  value={state.password}
                  onFocus={() => setisShowKeyboard(true)}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                ></TextInput>
                <TouchableOpacity
                  style={styles.showPasswordBtn}
                  onPress={showPassword}
                >
                  <Text style={styles.showPasswordBtnTitle}>
                    {passwordVisibleText}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{ ...styles.enterBtn, width: width - 32 }}
                activeOpacity={0.8}
                onPress={onSubmit}
              >
                <Text style={styles.enterBtnTitle}>Войти</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.noAccBtn, width: width - 32 }}
                activeOpacity={0}
                onPress={() => navigation.navigate("RegistrationScreen")}
              >
                <Text style={styles.noAccBtnTitle}>
                  Нет аккаунта? Зарегистрироваться
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "contain",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  form: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    alignItems: "center",
  },
  formTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    marginTop: 32,
    marginBottom: 32,
  },

  input: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    height: 50,
    padding: 16,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
  },
  showPasswordBtn: {
    position: "absolute",
    right: 0,
    transform: [{ translateY: 16 }, { translateX: -35 }],
  },
  showPasswordBtnTitle: { fontSize: 16, lineHeight: 19 },
  enterBtn: {
    marginTop: 43,
    marginBottom: 16,
    height: 51,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  enterBtnTitle: {
    fontSize: 16,
    lineHeight: 19,
    color: "#ffffff",
  },
  noAccBtn: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 111,
  },
  noAccBtnTitle: {
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});
