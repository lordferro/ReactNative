import { useState } from "react";
import {
  ImageBackground,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  Heading,
  KeyboardAvoidingView,
  VStack,
  Input,
  Pressable,
  Icon,
  Button,
  Link,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons/build/Icons";

const initialState = {
  email: "",
  password: "",
};

const LoginScreen = () => {
  const [state, setState] = useState(initialState);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const navigation = useNavigation();

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
              <Heading fontSize="30" mt="32px">
                Log in
              </Heading>

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
              <Button
                onPress={() => {
                  navigation.navigate("HomeScreen");
                }}
                mt="43px"
                size="text"
                variant="submitBtn"
                w="100%"
              >
                Log in
              </Button>
              <Link
                mt="16px"
                mb={10}
                _text={{ fontSize: "16px" }}
                activeOpacity={0}
                onPress={() => navigation.navigate("RegistrationScreen")}
              >
                Not registered? Register.
              </Link>
            </VStack>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
