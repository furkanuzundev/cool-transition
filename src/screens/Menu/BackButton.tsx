import { StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';

import images from '../../constants/images';

const AnimatedImage = Animated.createAnimatedComponent(Image);

interface Props {
  onBackPress: () => void;
  toggle: SharedValue<number>;
}

export const BackButton = ({ onBackPress, toggle }: Props) => {
  const containerOpacity = useDerivedValue(() => {
    return interpolate(toggle.value, [0, 1], [0, 1]);
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      opacity: containerOpacity.value,
    };
  });

  return (
    <TouchableWithoutFeedback onPress={onBackPress}>
      <AnimatedImage
        source={images.backButton}
        resizeMode='cover'
        style={[styles.backButtonImage, containerStyle]}
      />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  backButtonImage: {
    width: 30,
    height: 30,
    position: 'absolute',
    zIndex: 10,
    left: 20,
    top: 20,
  },
});
