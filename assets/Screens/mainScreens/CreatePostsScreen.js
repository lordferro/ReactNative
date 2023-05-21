import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { ScreensCommonStyles, colors } from "../ScreensCommonStyles";
import { EvilIcons, FontAwesome } from "@expo/vector-icons";

const CreatePostsScreen = () => {
  const [image, setImage] = useState(require("../../img/Photo_BG.jpg"));
  const [isDisabled, setIsDisabled] = useState(true);
  const [isShowKeyboard, setisShowKeyboard] = useState(false);

  const keyboardHide = () => {
    setisShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={ScreensCommonStyles.container}
      >
        <View style={{ marginBottom: isShowKeyboard ? 80 : 0 }}>
          <Image source={image || null} style={styles.mainImage}></Image>
          <Text style={styles.captionImg}>
            {image ? "Редактировать фото" : "Загрузите фото"}
          </Text>
          <TextInput
            placeholder="Название"
            placeholderTextColor={colors.placeholderTextColor}
            style={styles.input}
            onFocus={() => setisShowKeyboard(true)}
          />

          <TextInput
            placeholder={"Местность..."}
            placeholderTextColor={colors.placeholderTextColor}
            style={{ ...styles.input, paddingLeft: 30 }}
            onFocus={() => setisShowKeyboard(true)}
          />
          <EvilIcons
            style={styles.icon}
            name="location"
            size={24}
            color={colors.placeholderTextColor}
          />
          <TouchableOpacity
            disabled={isDisabled}
            style={[
              { ...ScreensCommonStyles.submitBtn, marginTop: 0 },
              isDisabled && ScreensCommonStyles.submitBtnDisabled,
            ]}
          >
            <Text
              style={
                [ScreensCommonStyles.submitBtnTitle, isDisabled&&{...ScreensCommonStyles.submitBtnTitleDisabled}]
            
              }
            >
              Опубликовать
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={isDisabled}
            style={[
              { ...ScreensCommonStyles.submitBtn, marginTop: 120, width:80, alignSelf:'center' },
              isDisabled && {...ScreensCommonStyles.submitBtnDisabled},
            ]}
          >
            <FontAwesome
              name="trash-o"
              size={24}
              color={isDisabled?colors.placeholderTextColor:'#fff'}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  imgWrapper: {},
  mainImage: {
    width: 343,
    height: 240,
    backgroundColor: `${colors.inactiveColor}`,
    borderWidth: 1,
    borderColor: `${colors.inactiveColor}`,
    borderRadius: 8,
    resizeMode: "cover",
    marginBottom: 8,
  },
  captionImg: {
    fontSize: 16,
    lineHeight: 19,
    color: `${colors.placeholderTextColor}`,
    marginBottom: 32,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: `${colors.inactiveColor}`,
    fontSize: 16,
    // marginVertical: 16,
    paddingVertical: 15,
  },
  icon: {
    position: "relative",
    top: -40,
  },
});
export default CreatePostsScreen;
