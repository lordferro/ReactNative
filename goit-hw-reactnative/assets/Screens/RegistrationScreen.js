import { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TextInput,
} from "react-native";

const RegistrationScreen = () => {
 const [passwordVisible, setPasswordVisible] = useState(true);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../img/Photo_BG.jpg")}
      >
        <View>
          <Text>Регистрация</Text>
          <TextInput style={styles.input} placeholder="Логин"></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Адрес электронной почты"
          ></TextInput>
          <TextInput
            secureTextEntry={passwordVisible}
                          
            style={styles.input}
            placeholder="Пароль"
          ></TextInput>
        </View>
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
    justifyContent: "center",
    // justifyContent: "flex-end",
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    height: 50,
    padding: 16,
  },
});
