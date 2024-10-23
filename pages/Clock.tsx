import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Menu from '../assets/menuDots.svg';

const Clock = () => {
  const [currentTime, setCurrentTime] = useState<[string, 'AM' | 'PM']>([
    (new Date().getHours() > 12
      ? new Date().getHours() - 12
      : new Date().getHours()) +
      ':' +
      new Date().getMinutes(),
    new Date().getHours() > 12 ? 'PM' : 'AM',
  ]);
  const [currentDate, setCurrentDate] = useState<string>(
    new Date().toDateString(),
  );

  useEffect(() => {
    const intervalTime = setInterval(() => {
      setCurrentTime([
        (new Date().getHours() > 12
          ? new Date().getHours() - 12
          : new Date().getHours()) +
          ':' +
          new Date().getMinutes(),
        new Date().getHours() > 12 ? 'PM' : 'AM',
      ]),
        setCurrentDate(new Date().toDateString());
    }, 1000);
    return () => clearInterval(intervalTime);
  });

  return (
    <View style={styles.clockContainer}>
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
    width: 390,
  },
  topHeaderTime: {
    color: 'white',
    fontSize: 75,
  },
  topHeaderAMPM: {
    color: 'white',
    fontSize: 20,
    marginLeft: 5,
  },
  dateHeader: {
    color: 'white',
  },
});
