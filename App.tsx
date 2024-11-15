import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  Platform,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {
  NavigationContainer,
  useNavigationState,
} from '@react-navigation/native';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavBar from './components/NavBar/NavBar';
import Stopwatch from './pages/Stopwatch';
import Clock from './pages/Clock';
import SearchCities from './pages/SearchCities';
import Timer from './pages/Timer';
import Alarm from './pages/Alarm';

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

const App = () => {
  useEffect(() => {
    const requestNotificationPermission = async () => {
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          {
            title: 'Notification Permission',
            message:
              'This app needs access to notifications to send you reminders for clock features.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (permission === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Notification permission granted');
        } else if (permission === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          Alert.alert(
            'Notification Permission',
            'Notifications are disabled. To enable, go to Settings and turn on notifications for this app.',
            [
              {text: 'Cancel', style: 'cancel'},
              {
                text: 'Open Settings',
                onPress: () => Linking.openSettings(),
              },
            ],
          );
        } else {
          Alert.alert(
            'Notifications Disabled',
            'Please enable notifications to receive reminders.',
          );
        }
      }
    };

    requestNotificationPermission();
  }, []);

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
            <Stack.Screen
              name="Alarm"
              component={Alarm}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavBarWrapper>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});

export default App;
