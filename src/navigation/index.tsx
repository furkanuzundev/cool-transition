import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

//screens
import { Menu } from '../screens/Menu';
import colors from '../constants/colors';
import { StatusBar } from 'expo-status-bar';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/screen';

function App() {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeareaview}>
        <NavigationContainer>
          <StatusBar style='dark' />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Main' component={Menu} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  safeareaview: {
    backgroundColor: colors.darkGrey,
    flex: 1,
  },
});
