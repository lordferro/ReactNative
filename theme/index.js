import { extendTheme } from "native-base";

const theme = extendTheme({
    colors: {
      standart: '#212121',
    accent: "#FF6C00",
    placeholderTextColor: "#BDBDBD",
    inactiveColor: "#E8E8E8",
  },
  components: {
    Heading: {
      baseStyle: () => {
        return {
          fontWeight: "medium",
          lineHeight: "35",
          color: "standart",
          letterSpacing: 0.01,
        };
      },
    },
    Button: {},
  },
});

export default theme;
