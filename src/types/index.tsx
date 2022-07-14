import { ImageSourcePropType } from 'react-native';

type ListItem = {
  id: number;
  name: string;
  image: ImageSourcePropType;
  price: string;
  rate: number;
  description: string;
  pageX: number;
  pageY: number;
};

export { ListItem };
