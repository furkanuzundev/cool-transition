import { StyleSheet, Image, StatusBar } from 'react-native';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SCREEN_WIDTH } from '../../constants/screen';
import { ListItem } from '../../types';

const AnimatedImage = Animated.createAnimatedComponent(Image);

interface Props {
  selectedItem: ListItem;
  toggle: SharedValue<number>;
}

const STATUS_BAR_HEIGHT = StatusBar.currentHeight;

export const CustomAnimatedImage = ({ selectedItem, toggle }: Props) => {
  const insets = useSafeAreaInsets();

  const top = useDerivedValue(() => {
    const topInterpolate = interpolate(
      toggle.value,
      [0, 1],
      [selectedItem.pageY - insets.top - STATUS_BAR_HEIGHT, 0]
    );

    return topInterpolate;
  });

  const left = useDerivedValue(() => {
    const leftInterpolate = interpolate(
      toggle.value,
      [0, 1],
      [selectedItem.pageX, 0]
    );

    return leftInterpolate;
  });

  const width = useDerivedValue(() => {
    const widthInterpolate = interpolate(
      toggle.value,
      [0, 1],
      [150, SCREEN_WIDTH]
    );

    return widthInterpolate;
  });

  const height = useDerivedValue(() => {
    const heightInterpolate = interpolate(
      toggle.value,
      [0, 1],
      [150, SCREEN_WIDTH]
    );

    return heightInterpolate;
  });

  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      top: top.value,
      left: left.value,
      width: width.value,
      height: height.value,
    };
  });

  return (
    <AnimatedImage
      source={selectedItem.image}
      style={[styles.image, animatedImageStyle]}
      resizeMode='cover'
    />
  );
};

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
  },
});
