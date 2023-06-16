import { IconButton } from "native-base";

export const IconBtnTransparent = ({ name, onPress, IconGroup, style, color = 'white', size= 48 }) => {

  return (
    <IconButton
      style = {style}
      onPress={onPress}
      _pressed={{ bg: "transparent" }}
     icon={ <IconGroup name={name} size={size} color={color}/>}
    />
  );
};
