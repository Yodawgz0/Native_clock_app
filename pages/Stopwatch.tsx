import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Menu from '../assets/menuDots.svg';
import PlayButton from '../assets/play.svg';

const Stopwatch = () => {
  return (
    <View style={styles.stopWatchContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Stopwatch</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Menu />
        </TouchableOpacity>
      </View>
      <View style={styles.clockContainer}>
        <TouchableOpacity style={styles.stopwatchButton}>
          <Text style={styles.hoursText}>00</Text>
          <Text style={styles.secondsText}>00</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.controlButtonContainer}>
        <TouchableOpacity style={styles.playButton}>
          <PlayButton width={30} height={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Stopwatch;

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
  hoursText: {
    color: 'white',
    fontSize: 60,
    fontWeight: '400',
  },
  secondsText: {
    color: 'white',
    fontFamily: 'Rubik',
    fontSize: 45,
    fontWeight: '400',
    marginLeft: 20,
    bottom: 15,
  },
  stopwatchButton: {
    borderColor: '#60626e',
    borderWidth: 10,
    borderCurve: 'circular',
    borderRadius: 150,
    height: 300,
    width: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clockContainer: {
    height: 500,
    marginTop: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopWatchContainer: {
    flex: 1,
    backgroundColor: '#1A1C1E',
    padding: 20,
  },
  menuButton: {
    padding: 10,
  },
  controlButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 68,
  },
  playButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    backgroundColor: '#93CCFF',
    height: 90,
    width: 90,
    borderRadius: 45,
  },
});
