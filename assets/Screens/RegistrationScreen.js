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
  Image,
} from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { setCustomText } from "react-native-global-props";
import AddPhotoSvg from "../Components/AddPhotoSvg";
import * as ImagePicker from "expo-image-picker";

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
  login: "",
  email: "",
  password: "",
};

const RegistrationScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [passwordVisibleText, setPasswordVisibleText] = useState("Показать");
  const [isShowKeyboard, setisShowKeyboard] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);
  const { height, width } = useWindowDimensions();
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  setCustomText(customTextProps);

  useEffect(() => {
    const hideSubscription = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        setisShowKeyboard(false);
      }
    );

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
                marginBottom: isShowKeyboard ? -160 : 0,
              }}
            >
              <View style={styles.addPhoto}>
                {image && (
                  <Image
                    source={{ uri: image }}
                    style={{ width: 120, height: 120, borderRadius: 16 }}
                  />
                )}
                <TouchableOpacity
                  style={styles.addPhotoBtn}
                  onPress={pickImage}
                >
                  <AddPhotoSvg />
                </TouchableOpacity>
              </View>
              <Text style={styles.formTitle}>Регистрация</Text>
              <TextInput
                style={{ ...styles.input, width: width - 32 }}
                placeholder="Логин"
                placeholderTextColor="#BDBDBD"
                value={state.login}
                onFocus={() => setisShowKeyboard(true)}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, login: value }))
                }
              ></TextInput>
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
                style={{ ...styles.registerBtn, width: width - 32 }}
                activeOpacity={0.8}
                onPress={onSubmit}
              >
                <Text style={styles.registeretBtnTitle}>
                  Зарегистрироваться
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.alreadyRegisteretBtn, width: width - 32 }}
                activeOpacity={0}
                onPress={() => navigation.navigate("LoginScreen")}
              >
                <Text style={styles.alreadyRegisteretBtnTitle}>
                  Уже есть аккаунт? Войти
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
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
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    alignItems: "center",
  },
  addPhoto: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
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
  showPasswordBtn: {
    position: "absolute",
    right: 0,
    transform: [{ translateY: 16 }, { translateX: -35 }],
  },
  showPasswordBtnTitle: { fontSize: 16, lineHeight: 19 },
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
