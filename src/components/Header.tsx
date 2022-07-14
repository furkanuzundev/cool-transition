import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';

interface Props {
  title?: string;
}

export default function Header({ title }: Props) {
  return (
    <View style={styles.main}>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: colors.darkGrey,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    color: colors.black,
    fontWeight: 'bold',
  },
});
