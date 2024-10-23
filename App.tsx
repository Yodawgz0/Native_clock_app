import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import NavBar from './components/NavBar/NavBar';
import Stopwatch from './pages/Stopwatch';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Clock from './pages/Clock';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.appContainer}>
      <StatusBar
        barStyle={'light-content'}
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
          <Stack.Screen
            name="Clock"
            component={Clock}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
        <NavBar />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});

export default App;
