import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../../styles/constants";

function Button({ children, onPress, mode, style, disabled }) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
        disabled={disabled}
      >
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text
            numberOfLines={1}
            style={[styles.buttonText, mode === "flat" && styles.flatText]}
          >
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    padding: 8,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
  flatText: {
    color: GlobalStyles.colors.primary200,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4,
  },
});
