import { Box, Image } from "native-base";
import React, { useEffect, useState } from "react";
import { auth, AuthProvider } from "../../../firebase/config";
import { getDownloadURL } from "firebase/storage";
import { updateCurrentUser } from "firebase/auth";
// const state = { image, location, title };
import { useSelector } from "react-redux";

const PostsScreen = ({ route }) => {
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {}

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <Box flex={1}>
      
    </Box>
  );
};

export default PostsScreen;
