import React, { useEffect, useState } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { EvilIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
import {
  Button,
  Center,
  Flex,
  IconButton,
  Image,
  Input,
  Pressable,
  Text,
  VStack,
  useToken,
} from "native-base";
import { Dimensions } from "react-native";
import { GetImage } from "../../utils/ImagePicker";

const CreatePostsScreen = ({ navigation, route }) => {
  const [image, setImage] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const { width } = Dimensions.get("window");
  const [placeholderTextColor] = useToken("colors", ["placeholderTextColor"]);

  useEffect(() => {
    if (route.params) {
      setImage(route.params.snap);
    }
  }, [route.params]);

  const pickImageHandler = () => {
    Alert.alert("", "Do you want to change the profile photo?", [
      {
        text: "Camera",

        onPress: () => {
          navigation.navigate("CameraScreen");
        },
      },
      {
        text: "Gallery",
        onPress: () => {
          GetImage(setImage);
        },
      },
    ]);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Flex bg="white" justifyContent="flex-end" flex={1}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""}>
          <VStack px="16px" bg={"white"}>
            <Center
              width="full"
              h={240}
              bg="inactiveColor"
              borderRadius={8}
              overflow="hidden"
            >
              {image && (
                <Image
                  resizeMode="cover"
                  bg="inactiveColor"
                  source={{ uri: image }}
                  alt=""
                  width='full'
                  h={240}
                />
              )}
              <IconButton
                opacity={0.5}
                position="absolute"
                onPress={pickImageHandler}
                w={60}
                h={60}
                bg="white"
                borderRadius="full"
                icon={
                  <Ionicons
                    name="camera-sharp"
                    size={24}
                    color={placeholderTextColor}
                  />
                }
              />
            </Center>
            <Pressable onPress={pickImageHandler}>
              <Text
                fontSize="md"
                fontWeight="normal"
                color="placeholderTextColor"
                mt={2}
              >
                {image ? "Change picture" : "Snap a picture"}
              </Text>
            </Pressable>
            <Input
              variant="underlined"
              mt={8}
              size="xl"
              placeholder="Title"
              placeholderTextColor="placeholderTextColor"
            />
            <Input
              variant="underlined"
              mt={4}
              size="xl"
              placeholder="Location..."
              placeholderTextColor="placeholderTextColor"
              InputLeftElement={
                <EvilIcons
                  marginRight={1}
                  name="location"
                  size={30}
                  color={placeholderTextColor}
                />
              }
            />
            <Button
              w="full"
              mt={8}
              variant={"submitBtn"}
              isDisabled={isDisabled}
            >
              <Text
                fontSize={16}
                color={isDisabled ? "placeholderTextColor" : "white"}
              >
                Publish
              </Text>
            </Button>
            <Button
              variant="submitBtn"
              width={70}
              alignSelf="center"
              mt="15%"
              mb={1}
              isDisabled={isDisabled}
            >
              <FontAwesome
                name="trash-o"
                size={24}
                color={isDisabled ? placeholderTextColor : "#fff"}
              />
            </Button>
          </VStack>
        </KeyboardAvoidingView>
      </Flex>
    </TouchableWithoutFeedback>
  );
};

export default CreatePostsScreen;
