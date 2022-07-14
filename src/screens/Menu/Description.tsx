import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  SlideInDown,
  useDerivedValue,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolate,
  SharedValue,
} from 'react-native-reanimated';
import { ReText } from 'react-native-redash';
import colors from '../../constants/colors';
import { ListItem } from '../../types';
import CardCount from './CardCount';

interface Props {
  selectedItem: ListItem;
  toggle: SharedValue<number>;
}

export const Description = ({ selectedItem, toggle }: Props) => {
  const [count, setCount] = useState<number>(1);
  const price = Number(selectedItem.price);

  const animatedPrice = useSharedValue(price);
  const formattedPrice = useDerivedValue(
    () => `₺${animatedPrice.value.toFixed(2)}`
  );

  const containerOpacity = useDerivedValue(() => {
    return interpolate(toggle.value, [0, 1], [0, 1]);
  });

  const onMinusPress = () => {
    if (count === 1) {
      return;
    }
    setCount(count - 1);
  };

  const onPlusPress = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    animatedPrice.value = withTiming(price * count);
  }, [count]);

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: containerOpacity.value,
    };
  });

  return (
    <Animated.View style={[styles.container, animatedContainerStyle]}>
      <Animated.Text entering={SlideInDown.duration(1200)} style={styles.name}>
        {selectedItem.name}
      </Animated.Text>
      <Animated.Text style={styles.rate} entering={SlideInDown.duration(1400)}>
        ★ {selectedItem.rate}/5
      </Animated.Text>
      <Animated.Text
        style={styles.description}
        entering={SlideInDown.duration(1600)}
      >
        {selectedItem.description}
      </Animated.Text>
      <Animated.View style={styles.countRow}>
        <CardCount {...{ count, onMinusPress, onPlusPress }} />
        <Animated.View entering={SlideInDown.duration(1800)}>
          <ReText style={styles.price} text={formattedPrice} />
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.black,
  },
  rate: {
    fontSize: 16,
    color: colors.red,
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    color: colors.black,
    marginVertical: 15,
  },
  countRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 24,
    fontWeight: '600',
  },
});
