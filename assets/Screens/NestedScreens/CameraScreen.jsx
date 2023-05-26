import { Camera, CameraType } from "expo-camera";
import { Box, Button, Factory, HStack, Image, Text } from "native-base";
import { Entypo, Ionicons, AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import * as MediaLibrary from "expo-media-library";
import usePreviousRouteName from "../../utils/GetPreviousScreen";

export const CameraScreen = ({ navigation, route }) => {
  const [cameraReady, setCameraReady] = useState(false);
  const [snap, setSnap] = useState("");
  const [type, setType] = useState(CameraType.back);
  const prevScreen = usePreviousRouteName();

  const takePhoto = async () => {
    if (cameraReady) {
      const photo = await this.CameraFactory.takePictureAsync();
      setSnap(photo.uri);
      console.log(route.params);
    }
  };
  const CameraFactory = Factory(Camera);

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  return (
    <Box flex={1}>
      <CameraFactory
        ref={(ref) => (this.CameraFactory = ref)}
        onCameraReady={() => {
          setCameraReady(true);
        }}
        type={type}
        justifyContent="flex-end"
        flex={1}
        alignItems="center"
      >
        {snap && (
          <Box
            borderWidth={1}
            borderColor={"white"}
            position={"absolute"}
            top={50}
            left={0}
            borderRadius={10}
            overflow={"hidden"}
          >
            <Image
              width={200}
              height={200}
              alt="your picture"
              source={{ uri: snap }}
            />
          </Box>
        )}
        <HStack space={"30%"} justifyContent={"space-between"}>
          <Entypo
            name="circle-with-cross"
            size={48}
            color="white"
            onPress={() => {
              setSnap("");
            }}
          />

          {snap ? (
            <AntDesign
              name="downcircleo"
              size={48}
              color="white"
              onPress={async () => {
                MediaLibrary.saveToLibraryAsync(snap);
                navigation.navigate(prevScreen, { snap });
              }}
            />
          ) : (
            <Button
              _pressed={{ bg: "gray.500" }}
              bg={"gray.300"}
              mb={3}
              borderStyle={"dotted"}
              borderWidth={5}
              borderColor={"gray.400"}
              borderRadius={"50"}
              size={"md"}
              onPress={takePhoto}
            >
              {"    "}
            </Button>
          )}
          <Ionicons
            name="camera-reverse-outline"
            size={48}
            color="white"
            onPress={toggleCameraType}
          />
        </HStack>
      </CameraFactory>
    </Box>
  );
};
