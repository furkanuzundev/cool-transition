import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';

import colors from '../../constants/colors';
import { SCREEN_WIDTH } from '../../constants/screen';
import useCheckCount from '../../hooks/useCheckCount';

interface Props {
  count: number;
  onMinusPress: () => void;
  onPlusPress: () => void;
}

export default function CardCount({
  count = 1,
  onMinusPress,
  onPlusPress,
}: Props) {
  const isAvailable = useCheckCount(count);
  return (
    <Animated.View style={styles.row} entering={SlideInDown.duration(1800)}>
      <TouchableOpacity
        style={styles.pressable}
        onPress={onMinusPress}
        disabled={!isAvailable}
      >
        <Text
          style={[
            styles.buttonText,
            { color: isAvailable ? colors.black : colors.grey },
          ]}
        >
          -
        </Text>
      </TouchableOpacity>
      <View style={styles.countContainer}>
        <Text style={styles.count}>{count}</Text>
      </View>
      <TouchableOpacity style={styles.pressable} onPress={onPlusPress}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 5,
    width: SCREEN_WIDTH * 0.3,
  },
  pressable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  countContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  count: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
});
