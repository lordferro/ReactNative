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

const RegistrationScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [isShowKeyboard, setisShowKeyboard] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);
  const { height, width } = useWindowDimensions();

  setCustomText(customTextProps);

  useEffect(() => {
    async function prepare() {
      // Pre-load fonts, make any API calls you need to do here
      try {
        await loadApp();
      } catch (error) {
        console.warn(error);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../img/Photo_BG.jpg")}
      >
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""}>
          <View
            style={{ ...styles.form, marginBottom: isShowKeyboard ? -160 : 0 }}
          >
            <View style={styles.addPhoto}>
              <TouchableOpacity style={styles.addPhotoBtn}>
                <AddPhotoSvg />
              </TouchableOpacity>
            </View>
            <Text style={styles.formTitle}>Регистрация</Text>
            <TextInput
              style={{ ...styles.input, width: width - 32 }}
              placeholder="Логин"
              placeholderTextColor="#BDBDBD"
              onFocus={() => setisShowKeyboard(true)}
              onBlur={() => setisShowKeyboard(false)}
            ></TextInput>
            <TextInput
              style={{ ...styles.input, width: width - 32 }}
              placeholder="Адрес электронной почты"
              placeholderTextColor="#BDBDBD"
              onFocus={() => setisShowKeyboard(true)}
              onBlur={() => setisShowKeyboard(false)}
            ></TextInput>
            <TextInput
              secureTextEntry={passwordVisible}
              style={{ ...styles.input, width: width - 32 }}
              placeholder="Пароль"
              placeholderTextColor="#BDBDBD"
              onFocus={() => setisShowKeyboard(true)}
              onBlur={() => setisShowKeyboard(false)}
            ></TextInput>
            <TouchableOpacity
              style={{ ...styles.registerBtn, width: width - 32 }}
              activeOpacity={0.8}
            >
              <Text style={styles.registeretBtnTitle}>Зарегистрироваться</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.alreadyRegisteretBtn, width: width - 32 }}
              activeOpacity={0}
            >
              <Text style={styles.alreadyRegisteretBtnTitle}>
                Уже есть аккаунт? Войти
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

export default RegistrationScreen;

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
    borderTopEndRadius: "25",
    borderTopStartRadius: "25",
    alignItems: "center",
  },
  addPhoto: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: "16",
    position: "absolute",
    transform: [{ translateY: -60 }],
  },
  addPhotoBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    transform: [{ translateY: -14 }, { translateX: 12.5 }],
  },
  formTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    marginTop: 92,
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
  registerBtn: {
    marginTop: 43,
    marginBottom: 16,
    height: 51,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  registeretBtnTitle: {
    fontSize: 16,
    lineHeight: 19,
    color: "#ffffff",
  },
  alreadyRegisteretBtn: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 45,
  },
  alreadyRegisteretBtnTitle: {
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});
