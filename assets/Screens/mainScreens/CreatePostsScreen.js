import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreenCreatePosts from "../NestedScreens/DefaultScreenCreatePosts";
import { CameraScreen } from "../NestedScreens/CameraScreen";
import { MapScreen } from "../NestedScreens/MapScreen";

const NestedScreens = createStackNavigator();

const CreatePostsStack = () => {
  return (
    <NestedScreens.Navigator>
      <NestedScreens.Screen
        name="DefaultScreenCreatePosts"
        component={DefaultScreenCreatePosts}
        options={{ headerShown: false }}
      />

      <NestedScreens.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{ headerShown: false }}
      />
      <NestedScreens.Screen
        name="MapScreen"
        component={MapScreen}
        options={{ headerShown: false }}
      />
    </NestedScreens.Navigator>
  );
};

export default CreatePostsStack;
