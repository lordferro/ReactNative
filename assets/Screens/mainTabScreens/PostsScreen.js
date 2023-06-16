import {
  Box,
  Center,
  FlatList,
  HStack,
  Image,
  Spacer,
  Text,
  VStack,
  useToken,
} from "native-base";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { EvilIcons } from "@expo/vector-icons";

const PostsScreen = ({ route }) => {
  const [posts, setPosts] = useState([]);
  const { userId } = useSelector((state) => state.auth);
  const [placeholderTextColor] = useToken("colors", ["placeholderTextColor"]);

  useEffect(() => {
    try {
      const q = query(collection(db, "posts"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const postsDB = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().userId === userId) {
            postsDB.push({ ...doc.data(), id: doc.id });
            console.log(doc.id);
          }
        });
        setPosts(postsDB);
      });
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <VStack flex={1} alignItems="center" paddingX="16px">
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <>
            <Box w={["100%", "380px"]}>
              <Center py={2}>
                <Image
                  borderRadius="8px"
                  alt={item.title}
                  w={343}
                  h={240}
                  source={{ uri: item.postPictureUrl }}
                />
              </Center>
              <Text fontSize="xl" fontWeight={500}>
                {item.title}
              </Text>
              <Text fontSize="xl" textAlign="right">
                <EvilIcons
                  marginRight={1}
                  name="location"
                  size={30}
                  color={placeholderTextColor}
                />
                {item.address.city + ", " + item.address.country}
              </Text>
            </Box>
          </>
        )}
        keyExtractor={(item) => item.id}
      />
    </VStack>
  );
};

export default PostsScreen;
