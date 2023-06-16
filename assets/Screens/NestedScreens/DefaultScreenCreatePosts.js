import React, { useEffect, useState } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
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
  Spinner,
  Text,
  VStack,
  useToast,
  useToken,
} from "native-base";
import * as Location from "expo-location";
import { useSelector } from "react-redux";

import { writeDataToFirestore } from "../../serviceAPI/opereationsWithDB";

const DefaultScreenCreatePosts = ({ navigation, route }) => {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isCleared, setisCleared] = useState(false);
  const [placeholderTextColor] = useToken("colors", ["placeholderTextColor"]);

  const { userId, name } = useSelector((state) => state.auth);

  const toast = useToast();

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }

        let { coords } = await Location.getCurrentPositionAsync({});
        setLocation(coords);

        let address = await Location.reverseGeocodeAsync({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
        setAddress(address[0]);
      } catch (error) {
        toast.show(error.message);
      }
    })();
  }, [isCleared]);

  useEffect(() => {
    if (route.params) {
      setImage(route.params.snap);
    }
  }, [route.params]);

  useEffect(() => {
    if (image || title || location) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [image, location, title]);

  function clearForm() {
    setImage(null);
    setTitle("");
    setLocation(null);
    setAddress(null);
    setisCleared(true);
  }

  const submitHandle = async () => {
    if (!image || !title || !location) {
      toast.show({
        description: "Please fill all the fields",
      });
      return;
    }
    writeDataToFirestore(image, location, address, title, userId, name);
    clearForm();
    navigation.navigate("Posts");
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
                  width="full"
                  h={240}
                />
              )}
              <IconButton
                opacity={0.5}
                position="absolute"
                onPress={() => {
                  navigation.navigate("CameraScreen");
                }}
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
            <Pressable
              onPress={() => {
                navigation.navigate("CameraScreen");
              }}
            >
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
              value={title}
              onChangeText={(value) => setTitle(value)}
            />
            <Input
              value={address && address.city + ", " + address.country}
              isDisabled={!location}
              variant="underlined"
              mt={4}
              size="xl"
              placeholder="Location..."
              placeholderTextColor="placeholderTextColor"
              onFocus={() => {
                if (!location) {
                  setisCleared(true);
                }
                navigation.navigate("MapScreen", { location });
              }}
              InputLeftElement={
                location ? (
                  <EvilIcons
                    marginRight={1}
                    name="location"
                    size={30}
                    color={placeholderTextColor}
                  />
                ) : (
                  <Spinner size="sm" marginRight={1} />
                )
              }
            />
            <Button
              w="full"
              mt={8}
              variant={"submitBtn"}
              isDisabled={isDisabled}
              onPress={submitHandle}
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
              onPress={clearForm}
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

export default DefaultScreenCreatePosts;
