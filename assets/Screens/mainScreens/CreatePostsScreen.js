import React, { useEffect, useState } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { EvilIcons, FontAwesome } from "@expo/vector-icons";
import {
  Button,
  Flex,
  Image,
  Input,
  Pressable,
  Text,
  VStack,
} from "native-base";
import { Dimensions } from "react-native";
import { GetImage } from "../../utils/ImagePicker";

const CreatePostsScreen = ({ navigation, route }) => {
  const [image, setImage] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const { width } = Dimensions.get("window");

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
          <VStack px="16px" alignItems="center" bg={"white"}>
            {image && (
              <Image
                bg="inactiveColor"
                source={{ uri: image }}
                alt=""
                width={width}
                h={240}
                borderRadius={8}
                mt={8}
              />
            )}
            <Pressable onPress={pickImageHandler}>
              <Text
                alignSelf="flex-start"
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
                  color="#BDBDBD"
                />
              }
            />
            <Button mt={8} variant={"submitBtn"} isDisabled={isDisabled}>
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
                color={isDisabled ? "#BDBDBD" : "#fff"}
              />
            </Button>
          </VStack>
        </KeyboardAvoidingView>
      </Flex>
    </TouchableWithoutFeedback>
  );
};

export default CreatePostsScreen;
