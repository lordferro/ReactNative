import { useState } from "react";
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
import { Heading } from "native-base";
import AddPhotoSvg from "../../Components/AddPhotoSvg";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { authCommonStyles } from "./authCommonStyles";
import { ScreensCommonStyles, colors } from "../ScreensCommonStyles";

const initialState = {
  login: "",
  email: "",
  password: "",
};

const RegistrationScreen = () => {
  const [state, setState] = useState(initialState);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [passwordVisibleText, setPasswordVisibleText] = useState("Показать");
  const [isShowKeyboard, setisShowKeyboard] = useState(false);
  const { height, width } = useWindowDimensions();
  const [image, setImage] = useState(null);

  const navigation = useNavigation();

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

  const onSubmit = () => {
    keyboardHide();
    console.log(state);
    setState(initialState);
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
              <Heading style={{ ...authCommonStyles.formTitle, marginTop: 92 }}>
                Регистрация
              </Heading>
              <TextInput
                style={{ ...authCommonStyles.input, width: width - 32 }}
                placeholder="Логин"
                placeholderTextColor={colors.placeholderTextColor}
                value={state.login}
                onFocus={() => setisShowKeyboard(true)}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, login: value }))
                }
                onSubmitEditing={onSubmit}
              ></TextInput>
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
                <Text style={ScreensCommonStyles.submitBtnTitle}>
                  Зарегистрироваться
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...authCommonStyles.enterRegisterBtn,
                  width: width - 32,
                }}
                activeOpacity={0}
                onPress={() => navigation.navigate("LoginScreen")}
              >
                <Text style={authCommonStyles.enterRegisterBtnTitle}>
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
});
