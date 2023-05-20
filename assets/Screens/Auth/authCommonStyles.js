import { StyleSheet } from "react-native";

export const authCommonStyles = StyleSheet.create({
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
    color: "#212121",
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
  submitBtn: {
    marginTop: 43,
    marginBottom: 16,
    height: 51,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  submitBtnTitle: {
    fontSize: 16,
    lineHeight: 19,
    color: "#ffffff",
  },
  enterRegisterBtn: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 45,
  },
  enterRegisterBtnTitle: {
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});
