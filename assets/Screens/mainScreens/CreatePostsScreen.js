import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import { ScreensCommonStyles, colors } from "../ScreensCommonStyles";

const CreatePostsScreen = () => {
  const [image, setImage] = useState(require("../../img/Photo_BG.jpg"));
  return (
    <View style={ScreensCommonStyles.container}>
      <View style={styles.imgWrapper}>
        <Image source={image || null} style={styles.mainImage}></Image>
        <Text style={styles.captionImg}>
          {image ? "Редактировать фото" : "Загрузите фото"}
        </Text>
        <TextInput
          placeholder="Название"
          placeholderTextColor={colors.placeholderTextColor}
          style={styles.input}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imgWrapper: {},
  mainImage: {
    width: 343,
    height: 240,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    resizeMode: "cover",
    marginBottom: 8,
  },
  captionImg: {
    fontSize: 16,
    lineHeight: 19,
    color: `${colors.placeholderTextColor}`,
  },
  input: {
    borderBottomWidth: 1,
  },
});
export default CreatePostsScreen;
