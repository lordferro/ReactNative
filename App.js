import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

export default function App() {
  const [isShowKeyboard, setisShowKeyboard] =
    useState(false);

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
    >
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("./assets/icon.png")}
        >
          <KeyboardAvoidingView
            behavior={
              Platform.OS === "ios"
                ? "padding"
                : "height"
            }
          >
            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard
                  ? 20
                  : 100,
              }}
            >
              <View>
                <Text style={styles.inputTitle}>
                  EMAIL
                </Text>
                <TextInput
                  style={styles.input}
                  textAlign={"center"}
                  onFocus={() =>
                    setisShowKeyboard(true)
                  }
                ></TextInput>
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={styles.inputTitle}>
                  PASSWORD
                </Text>
                <TextInput
                  secureTextEntry
                  style={styles.input}
                  textAlign={"center"}
                  onFocus={() =>
                    setisShowKeyboard(true)
                  }
                ></TextInput>
              </View>
              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.8}
                onPress={() =>
                  setisShowKeyboard(false)
                }
              >
                <Text style={styles.btnTitle}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    // alignItems: "center",
    // justifyContent: "center",
    justifyContent: "flex-end",
  },
  input: {
    borderWidth: 1,

    borderRadius: 6,
    height: 40,
    padding: 10,
  },
  inputTitle: {
    marginBottom: 10,
    fontSize: 18,
  },
  form: {
    marginHorizontal: 40,
  },
  btn: {
    height: 40,
    borderRadius: 6,
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,

    ...Platform.select({
      ios: { backgroundColor: "blue" },
      android: { backgroundColor: "green" },
      default: { backgroundColor: "red" },
    }),

    // backgroundColor: Platform.OS === "ios" ? "blue" : "#ffb6c1",
  },
  btnTitle: {
    color: "#f0f8ff",
    fontSize: 18,
  },
});
