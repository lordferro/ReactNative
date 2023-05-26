import { Camera, CameraType } from "expo-camera";
import { Box, Factory, HStack, IconButton, Image, Text } from "native-base";
import { Entypo, Ionicons, AntDesign, Feather } from "@expo/vector-icons";
import { useState } from "react";
import * as MediaLibrary from "expo-media-library";
import usePreviousRouteName from "../../utils/GetPreviousScreen";
import { IconBtnTransparent } from "../../Components/IconBtnTransparent";

export const CameraScreen = ({ navigation, route }) => {
  const [cameraReady, setCameraReady] = useState(false);
  const [snap, setSnap] = useState("");
  const [type, setType] = useState(CameraType.back);
  const prevScreen = usePreviousRouteName();

  const takePhoto = async () => {
    if (cameraReady) {
      const photo = await this.CameraFactory.takePictureAsync();
      setSnap(photo.uri);
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
        {cameraReady && (
          <HStack display="flex" space={"25%"}>
            <IconBtnTransparent
              onPress={() => {
                setSnap("");
              }}
              IconGroup={Entypo}
              name="circle-with-cross"
            />

            {snap ? (
              <IconBtnTransparent
                onPress={async () => {
                  MediaLibrary.saveToLibraryAsync(snap);
                  navigation.navigate(prevScreen, {
                    screen: "CreatePost",
                    params: { snap },
                  });
                }}
                IconGroup={AntDesign}
                name="downcircleo"
              />
            ) : (
              <IconBtnTransparent
                name="ios-camera-outline"
                onPress={takePhoto}
                IconGroup={Ionicons}
              />
            )}
            <IconBtnTransparent
              name="camera-reverse-outline"
              IconGroup={Ionicons}
              onPress={toggleCameraType}
            />
          </HStack>
        )}
      </CameraFactory>
    </Box>
  );
};
