import { StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import colors from '../../constants/colors';
import { SCREEN_WIDTH } from '../../constants/screen';

interface Props {
  toggle: SharedValue<number>;
}

export const Circle = ({ toggle }: Props) => {
  const circleScale = useDerivedValue(() => {
    const scaleInterpolate = interpolate(toggle.value, [0, 1], [0, 1]);

    return scaleInterpolate;
  });

  const top = useDerivedValue(() => {
    const topInterpolate = interpolate(
      toggle.value,
      [0, 1],
      [-SCREEN_WIDTH / 2, -20]
    );

    return topInterpolate;
  });

  const left = useDerivedValue(() => {
    const leftInterpolate = interpolate(
      toggle.value,
      [0, 1],
      [SCREEN_WIDTH / 2, 100]
    );

    return leftInterpolate;
  });

  const opacity = useDerivedValue(() => {
    const opacityInterpolate = interpolate(toggle.value, [0, 1], [0, 1]);

    return opacityInterpolate;
  });

  const animatedCircleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: circleScale.value }],
      left: left.value,
      top: top.value,
      opacity: opacity.value,
    };
  });

  return <Animated.View style={[styles.circle, animatedCircleStyle]} />;
};

const styles = StyleSheet.create({
  circle: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    borderRadius: SCREEN_WIDTH / 2,
    backgroundColor: colors.cute,
  },
});
