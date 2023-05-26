import React from "react";
import { TouchableOpacity } from "react-native";
import { Touchable } from "react-native";
import { View, Text, StyleSheet } from "react-native";

const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity><Text>Posts</Text></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default PostsScreen;
