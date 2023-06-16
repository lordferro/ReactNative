import { Camera, CameraType } from "expo-camera";
import { Box, Factory, HStack, Image } from "native-base";
import {
  Entypo,
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useState } from "react";
import * as MediaLibrary from "expo-media-library";
import usePreviousRouteName from "../../utils/GetPreviousScreen";
import { IconBtnTransparent } from "../../Components/IconBtnTransparent";
import { useDispatch } from "react-redux";
import { authSlice } from "../../../redux/auth/authReducer";

export const CameraScreen = ({ navigation, route }) => {
  const [cameraReady, setCameraReady] = useState(false);
  const [snap, setSnap] = useState("");
  const [type, setType] = useState(CameraType.back);
  const [saveLocally, setsaveLocally] = useState(false);
  const prevScreen = usePreviousRouteName();
  const dispatch = useDispatch()

  const {setPhotoUri} = authSlice.actions

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
        {snap &&
          (saveLocally ? (
            <IconBtnTransparent
              IconGroup={MaterialCommunityIcons}
              name="content-save-move-outline"
              onPress={() => {
                setsaveLocally(false);
              }}
            />
          ) : (
            <IconBtnTransparent
              IconGroup={MaterialCommunityIcons}
              name="content-save-off-outline"
              onPress={() => {
                setsaveLocally(true);
              }}
            />
          ))}
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
                  if (saveLocally) MediaLibrary.saveToLibraryAsync(snap);
                  dispatch(setPhotoUri({photoUri:snap}))
                  navigation.navigate(prevScreen, {
                    screen: route.params.from,
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
