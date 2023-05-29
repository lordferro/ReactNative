import { extendTheme } from "native-base";

const theme = extendTheme({
  fontConfig: {
    Roboto: {
      400: {
        normal: "Roboto-Regular",
      },
      500: {
        normal: "Roboto-Medium",
      },
    },
  },

  fonts: {
    heading: "Roboto",
    body: "Roboto",
    mono: "Roboto",
  },
  colors: {
    standart: "#212121",
    accentColor: "#FF6C00",
    placeholderTextColor: "#BDBDBD",
    inactiveColor: "#F6f6f6",
    borderColor: "#e8e8e8",
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
    Button: {
      sizes: {
        text: {
          _text: { fontSize: "16px" },
        },
      },
      variants: {
        submitBtn: () => {
          return {
            bg: "accentColor",
            rounded: "full",
            _text: { color: "white" },
            _disabled: {
              _text: { color: "placeholderTextColor" },
              bg: "inactiveColor",
            },
            h: 51,
          };
        },
      },
    },
    Input: {
      sizes: {
        xs: {
          fontSize: 16,
        },
      },
      variants: {
        mainInput: {
          borderRadius: "8px",
          height: "50px",
          borderWidth: "1px",
          borderColor: "borderColor",
          bg: "inactiveColor",
          

          _focus: { bgColor: "white", borderColor: "accentColor" },
          _text: { fontSize: "26px" },
        },
      },
    },
  },
});

export default theme;
