import { Box } from "native-base";
import React, { useEffect, useState } from "react";

// const state = { image, location, title };

const PostsScreen = ({ route }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return <Box flex={1}></Box>;
};

export default PostsScreen;
