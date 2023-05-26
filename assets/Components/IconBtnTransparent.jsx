import { IconButton } from "native-base";

export const IconBtnTransparent = ({ name, onPress, IconGroup }) => {
    // const Tag = iconGroup
  return (
    <IconButton
      onPress={onPress}
      _pressed={{ bg: "transparent" }}
     icon={ <IconGroup name={name} size={48} color="white"/>}
    />
  );
};
