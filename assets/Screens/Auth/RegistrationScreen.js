import { useEffect, useState } from "react";
import {
  ImageBackground,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import {
  Box,
  Heading,
  KeyboardAvoidingView,
  Image,
  VStack,
  IconButton,
  AddIcon,
  Input,
  Pressable,
  Icon,
  Button,
  Link,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { GetImage } from "../../utils/ImagePicker";
import { MaterialIcons } from "@expo/vector-icons/build/Icons";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const RegistrationScreen = ({ route }) => {
  const [state, setState] = useState(initialState);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

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

  const onSubmit = () => {
    keyboardHide();
    console.log(state);
    setState(initialState);
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <ImageBackground
        resizeMode="cover"
        style={{ flex: 1, justifyContent: "flex-end" }}
        source={require("../../img/Photo_BG.jpg")}
      >
        <TouchableWithoutFeedback onPress={keyboardHide}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
          >
            <VStack
              px="16px"
              alignItems="center"
              bg={"white"}
              borderTopRadius={25}
            >
              <Box
                position="absolute"
                w={120}
                h={120}
                top="-12.5%"
                bg="inactiveColor"
                borderRadius={16}
              >
                {image && (
                  <Image
                    borderRadius={16}
                    w={120}
                    h={120}
                    alt="User avatar"
                    source={{ uri: image }}
                  />
                )}
                <IconButton
                  position="absolute"
                  bottom="12.5%"
                  right="-12.5%"
                  width={25}
                  h={25}
                  borderWidth={1}
                  borderColor="accent"
                  borderRadius="full"
                  _icon={{ color: "accent" }}
                  icon={<AddIcon />}
                  onPress={pickImageHandler}
                />
              </Box>
              <Heading fontSize="30" mt={92}>
                Registration
              </Heading>
              <Input
                mt="32px"
                size="text"
                variant="mainInput"
                placeholder="Full name"
                value={state.name}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, name: value }))
                }
                onSubmitEditing={onSubmit}
              ></Input>

              <Input
                mt="16px"
                size="text"
                variant="mainInput"
                placeholder="Email"
                value={state.email}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
                onSubmitEditing={onSubmit}
              ></Input>

              <Input
                mt="16px"
                size="text"
                variant="mainInput"
                placeholder="Password"
                value={state.password}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, password: value }))
                }
                onSubmitEditing={onSubmit}
                type={passwordVisible ? "password" : "text"}
                InputRightElement={
                  <Pressable
                    onPress={() => setPasswordVisible(!passwordVisible)}
                  >
                    <Icon
                      as={
                        <MaterialIcons
                          name={
                            passwordVisible ? "visibility-off" : "visibility"
                          }
                        />
                      }
                      size={5}
                      mr="2"
                      color="muted.400"
                    />
                  </Pressable>
                }
              />
              <Button mt="43px" size="text" variant="submitBtn" w="100%">
                Register
              </Button>
              <Link
                mt="16px"
                mb={10}
                _text={{ fontSize: "16px" }}
                activeOpacity={0}
                onPress={() => navigation.navigate("LoginScreen")}
              >
                Already registered? Log in.
              </Link>
            </VStack>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;
