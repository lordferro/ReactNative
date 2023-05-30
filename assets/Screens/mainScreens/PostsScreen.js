import { Box } from "native-base";
import React, { useEffect, useState } from "react";

const PostsScreen = ({ route }) => {
  const [posts, setPosts] = useState([]);
  console.log(route.params);

  // useEffect(() => {setPosts((prevState) => [...prevState, route.params])}, [route.params]);

  return <Box flex={1}></Box>;
};

export default PostsScreen;
