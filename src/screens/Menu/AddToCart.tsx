import { StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import Animated, {
  interpolate,
  SlideInDown,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import colors from '../../constants/colors';

export const AddToCart = ({ toggle }) => {
  const containerOpacity = useDerivedValue(() => {
    return interpolate(toggle.value, [0, 1], [0, 1]);
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      opacity: containerOpacity.value,
    };
  });

  return (
    <TouchableWithoutFeedback>
      <Animated.View
        style={[styles.button, containerStyle]}
        entering={SlideInDown.duration(2500)}
      >
        <Text style={styles.buttonText}>Add To Cart</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    padding: 15,
    margin: 10,
  },
  buttonText: {
    color: colors.cute,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
