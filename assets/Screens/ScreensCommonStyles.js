import { StyleSheet } from "react-native";

export const ScreensCommonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  submitBtn: {
    marginBottom: 16,
    height: 51,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  submitBtnDisabled: {
    backgroundColor: "#E8E8E8",
    color: "#BDBDBD",
  },
  submitBtnTitle: {
    fontSize: 16,
    lineHeight: 19,
    color: "#ffffff",
  },
  submitBtnTitleDisabled: {
    color: "#BDBDBD",
  },
});

export const colors = {
  placeholderTextColor: "#BDBDBD",
  inactiveColor: "#E8E8E8",
  accentColor: "#FF6C00"
};