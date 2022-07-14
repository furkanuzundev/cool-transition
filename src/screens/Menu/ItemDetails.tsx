import { useEffect } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolateColor,
  runOnJS,
} from 'react-native-reanimated';

import colors from '../../constants/colors';
import { ListItem } from '../../types';
import { BackButton } from './BackButton';
import { CustomAnimatedImage } from './AnimatedImage';
import { Circle } from './Circle';
import { Description } from './Description';
import { AddToCart } from './AddToCart';

interface Props {
  selectedItem: ListItem;
  setSelectedItem: (item: ListItem) => void;
}

export const ItemDetails = ({ selectedItem, setSelectedItem }: Props) => {
  const toggle = useSharedValue(0);

  useEffect(() => {
    onStartAnimation();
  }, [selectedItem]);

  const onStartAnimation = () => {
    toggle.value = withTiming(1, {
      duration: 600,
    });
  };

  const onBackPress = () => {
    toggle.value = withTiming(0, { duration: 400 }, (finished) => {
      if (finished) {
        runOnJS(setSelectedItem)(null);
      }
    });
  };

  const containerAnimatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      toggle.value,
      [0, 1],
      ['rgba(246, 246, 246, 0)', 'rgba(246, 246, 246, 1)']
    );

    return {
      backgroundColor: backgroundColor,
    };
  });

  return (
    <Animated.View style={[styles.container, containerAnimatedStyle]}>
      <Circle {...{ selectedItem, toggle }} />
      <CustomAnimatedImage {...{ selectedItem, toggle }} />
      <BackButton {...{ setSelectedItem, onBackPress, toggle }} />
      <Description {...{ selectedItem, toggle }} />
      <AddToCart {...{ toggle }} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    bottom: 0 + StatusBar.currentHeight,
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    zIndex: 999,
  },
});
