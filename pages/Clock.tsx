import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Menu from '../assets/menuDots.svg';
import AddIcon from '../assets/add.svg';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Clock = () => {
  const navigate = useNavigation();
  const [currentTime, setCurrentTime] = useState<[string, 'AM' | 'PM']>([
    (new Date().getHours() > 12
      ? new Date().getHours() - 12
      : new Date().getHours()) +
      ':' +
      new Date().getMinutes().toString().padStart(2, '0'),
    new Date().getHours() > 12 ? 'PM' : 'AM',
  ]);
  const [currentDate, setCurrentDate] = useState<string>(
    new Date().toDateString(),
  );
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  useEffect(() => {
    const intervalTime = setInterval(() => {
      setCurrentTime([
        (new Date().getHours() > 12
          ? new Date().getHours() - 12
          : new Date().getHours()) +
          ':' +
          new Date().getMinutes().toString().padStart(2, '0'),
        new Date().getHours() > 12 ? 'PM' : 'AM',
      ]),
        setCurrentDate(new Date().toDateString());
    }, 1000);

    return () => clearInterval(intervalTime);
  }, []);

  const getSelectedCity = async () => {
    try {
      const city = await AsyncStorage.getItem('selectedCity');
      setSelectedCity(city);
    } catch (error) {
      console.error('Error retrieving city from storage:', error);
    }
  };

  getSelectedCity();
  return (
    <View style={styles.clockContainer}>
      <View style={{flex: 0.9}}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Clock</Text>
          <TouchableOpacity style={styles.menuButton}>
            <Menu />
          </TouchableOpacity>
        </View>
        <View style={styles.timeHeaderContainer}>
          <Text style={styles.topHeaderTime}>{currentTime[0]}</Text>
          <Text style={styles.topHeaderAMPM}>{currentTime[1]}</Text>
        </View>
        <View style={styles.timeHeaderContainer}>
          <Text style={styles.dateHeader}>{currentDate}</Text>
        </View>
        {selectedCity && (
          <View style={styles.selectedCityContainer}>
            <Text style={styles.selectedCityText}>
              Selected City: {selectedCity}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.controlButtonContainer}>
        <TouchableOpacity
          onPress={() => {
            navigate.navigate('SearchCities' as never);
          }}
          activeOpacity={1}
          style={[styles.mainButton, {backgroundColor: '#93CCFF'}]}>
          <AddIcon width={25} height={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Clock;

const styles = StyleSheet.create({
  header: {
    fontFamily: 'Rubik-Regular',
    marginTop: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
  },
  menuButton: {
    padding: 10,
  },
  clockContainer: {
    flex: 1,
    backgroundColor: '#1A1C1E',
    padding: 20,
  },
  timeHeader: {
    color: 'white',
  },
  timeHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    width: '100%',
  },
  topHeaderTime: {
    color: 'white',
    fontSize: 75,
  },
  topHeaderAMPM: {
    color: 'white',
    fontSize: 30,
  },
  dateHeader: {
    color: 'white',
    fontSize: 18,
  },
  selectedCityContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  selectedCityText: {
    color: 'white',
    fontSize: 16,
  },
  controlButtonContainer: {
    flex: 0.1,
    justifyContent: 'flex-end',
  },
  mainButton: {
    height: 90,
    width: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    shadowOffset: {width: 2, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
});
