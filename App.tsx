import React from 'react';
import {
  NavigationContainer,
  useNavigationState,
} from '@react-navigation/native';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavBar from './components/NavBar/NavBar';
import Stopwatch from './pages/Stopwatch';
import Clock from './pages/Clock';
import SearchCities from './pages/SearchCities';
import Timer from './pages/Timer';

const Stack = createNativeStackNavigator();

const NavBarWrapper = ({children}: {children: React.ReactNode}) => {
  const navigationState = useNavigationState(state => state);
  const currentRouteName = navigationState?.routes[navigationState.index]?.name;
  const shouldShowNavBar = currentRouteName !== 'SearchCities';

  return (
    <View style={{flex: 1}}>
      {children}
      {shouldShowNavBar && <NavBar />}
    </View>
  );
};

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.appContainer}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor="#1A1C1E"
        translucent
      />
      <NavigationContainer>
        <NavBarWrapper>
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
            <Stack.Screen
              name="SearchCities"
              component={SearchCities}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Timer"
              component={Timer}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavBarWrapper>
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
