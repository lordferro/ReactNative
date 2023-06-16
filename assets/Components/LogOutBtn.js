import { useToken } from "native-base";
import { IconBtnTransparent } from "./IconBtnTransparent";
import { Entypo } from "@expo/vector-icons";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { useDispatch } from "react-redux";

export const LogOutBtn = () => {
    const [placeholderTextColor] = useToken("colors", ["placeholderTextColor"]);

      const dispatch = useDispatch();
    
      const signOut = () => {
        dispatch(authSignOutUser());
    };
    
  return (
    <IconBtnTransparent
      IconGroup={Entypo}
      name="log-out"
      style={{
        position: "absolute",
        right: 12,
        top: 12,
      }}
      color={placeholderTextColor}
      onPress={signOut}
      size={24}
    />
  );
};
