import { useEffect, useState } from "react";
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
import { useNavigation } from "@react-navigation/native";
import { authCommonStyles } from "./authCommonStyles";
import { ScreensCommonStyles, colors } from "../ScreensCommonStyles";
import { Heading } from "native-base";


const initialState = {
  email: "",
  password: "",
};

const LoginScreen = () => {
  const [state, setState] = useState(initialState);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [passwordVisibleText, setPasswordVisibleText] = useState("Показать");
  const [isShowKeyboard, setisShowKeyboard] = useState(false);

  const { height, width } = useWindowDimensions();

  const navigation = useNavigation();

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

  const onSubmit = () => {
    keyboardHide();
    console.log(state);
    setState(initialState);
 navigation.navigate('HomeScreen')
  };

  const keyboardHide = () => {
    setisShowKeyboard(false);
    Keyboard.dismiss();
  };

  const showPassword = (e) => {
    if (passwordVisibleText === "Показать") {
      setPasswordVisibleText("Скрыть");
    } else {
      setPasswordVisibleText("Показать");
    }
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={ScreensCommonStyles.container}>
        <ImageBackground
          style={authCommonStyles.backgroundImage}
          source={require("../../img/Photo_BG.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
          >
            <View
              style={{
                ...authCommonStyles.form,
                marginBottom: isShowKeyboard ? -220 : 0,
              }}
            >
              <Heading style={authCommonStyles.formTitle}>Войти</Heading>
              <TextInput
                style={{ ...authCommonStyles.input, width: width - 32 }}
                placeholder="Адрес электронной почты"
                placeholderTextColor={colors.placeholderTextColor}
                value={state.email}
                onFocus={() => setisShowKeyboard(true)}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
                onSubmitEditing={onSubmit}
              ></TextInput>
              <View>
                <TextInput
                  secureTextEntry={passwordVisible}
                  style={{ ...authCommonStyles.input, width: width - 32 }}
                  placeholder="Пароль"
                  placeholderTextColor={colors.placeholderTextColor}
                  value={state.password}
                  onFocus={() => setisShowKeyboard(true)}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                  onSubmitEditing={onSubmit}
                ></TextInput>
                <TouchableOpacity
                  style={authCommonStyles.showPasswordBtn}
                  onPress={showPassword}
                >
                  <Text style={authCommonStyles.showPasswordBtnTitle}>
                    {passwordVisibleText}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{
                  ...ScreensCommonStyles.submitBtn,
                  marginTop: 43,
                  width: width - 32,
                }}
                activeOpacity={0.8}
                onPress={onSubmit}
              >
                <Text style={ScreensCommonStyles.submitBtnTitle}>Войти</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...authCommonStyles.enterRegisterBtn,
                  width: width - 32,
                  marginBottom: 111,
                }}
                activeOpacity={0}
                onPress={() => navigation.navigate("RegistrationScreen")}
              >
                <Text style={authCommonStyles.enterRegisterBtnTitle}>
                  Нет аккаунта?{" "}
                  <Text style={{ color: "red" }}>Зарегистрироваться</Text>
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

const styles = StyleSheet.create({});
