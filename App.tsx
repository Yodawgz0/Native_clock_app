import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import NavBar from './components/NavBar/NavBar';
import Stopwatch from './pages/Stopwatch';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={styles.appContainer}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="#1A1C1E"
        translucent
      />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Stopwatch"
            component={Stopwatch}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <NavBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});

export default App;
