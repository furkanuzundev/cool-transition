import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { useAnimatedRef } from 'react-native-reanimated';

import { SCREEN_WIDTH } from '../../constants/screen';
import colors from '../../constants/colors';
import { ListItem } from '../../types';

interface Props {
  item: ListItem;
  selectedItem?: ListItem;
  setSelectedItem?: (item: ListItem) => void;
}
export const MenuItem = ({ item, setSelectedItem, selectedItem }: Props) => {
  const imageRef = useAnimatedRef();

  const getMeasure = async () => {
    return new Promise((resolve, reject) => {
      imageRef[item.id].measure(
        (x: any, y: any, width: any, height: any, pageX: any, pageY: any) => {
          resolve({ pageX, pageY });
        }
      );
    });
  };

  const onItemPress = async () => {
    const measure: any = await getMeasure();
    setSelectedItem({ ...item, ...measure });
  };

  return (
    <TouchableWithoutFeedback onPress={onItemPress}>
      <View style={styles.cardContainer}>
        <View style={styles.imageView}>
          <Image
            ref={(ref) => {
              imageRef[item.id] = ref;
            }}
            source={item.image}
            style={[
              styles.image,
              {
                opacity: selectedItem && selectedItem.id === item.id ? 0 : 1,
              },
            ]}
            resizeMode='cover'
          />
        </View>
        <View style={styles.cardDetail}>
          <Text style={styles.rate}>★ {item.rate}/5</Text>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>₺{item.price}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    width: SCREEN_WIDTH * 0.45,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  imageView: {
    width: 150,
    height: 150,
    bottom: 75,
    marginBottom: -75,
    alignSelf: 'center',
  },
  image: {
    width: 150,
    height: 150,
  },
  cardDetail: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
    height: 120,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
  },
  price: {
    fontSize: 16,
    color: colors.red,
  },
  rate: {
    fontSize: 14,
    color: colors.red,
  },
});
