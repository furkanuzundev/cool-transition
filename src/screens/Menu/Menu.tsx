import { View, StyleSheet, FlatList } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { MenuItem } from './MenuItem';
import { ListItem } from '../../types';
import { burgers } from '../../constants/data';
import colors from '../../constants/colors';
import Header from '../../components/Header';
import { ItemDetails } from './ItemDetails';
import { useState } from 'react';

const NUM_COLUMNS = 2;
const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);

export const Menu = () => {
  const [selectedItem, setSelectedItem] = useState<ListItem>();

  const keyExtractor = (item: ListItem) => item.id.toString();

  const renderItem = ({ item }) => {
    return (
      <MenuItem
        {...{
          item,
          selectedItem,
          setSelectedItem,
        }}
      />
    );
  };

  return (
    <View style={styles.main}>
      <Header title='Menu' />
      <AnimatedFlatlist
        data={burgers}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        numColumns={NUM_COLUMNS}
        horizontal={false}
        columnWrapperStyle={styles.columnWrapperStyle}
        showsVerticalScrollIndicator={false}
        entering={FadeInDown.duration(800)}
        contentContainerStyle={styles.contentContainerStyle}
      />
      {selectedItem && <ItemDetails {...{ selectedItem, setSelectedItem }} />}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.darkGrey,
  },
  columnWrapperStyle: {
    justifyContent: 'space-evenly',
    paddingVertical: 40,
  },
  contentContainerStyle: {
    paddingVertical: 40,
  },
});
