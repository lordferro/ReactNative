import MapView, { Marker } from "react-native-maps";
import { Box, Factory } from "native-base";

export const MapScreen = ({
  route: {
    params: {
      location: { latitude, longitude },
    },
  },
}) => {
  const FactoryMapView = Factory(MapView);

  return (
    <Box flex={1} justifyContent="center">
      <FactoryMapView
        flex={1}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <Marker coordinate={{ latitude: latitude, longitude: longitude }} />
      </FactoryMapView>
    </Box>
  );
};
