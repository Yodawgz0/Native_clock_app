import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Menu from '../assets/menuDots.svg';

const Stopwatch = () => {
  return (
    <View style={styles.stopWatchContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Stopwatch</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Menu />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Stopwatch;

const styles = StyleSheet.create({
  header: {
    marginTop: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    color: 'white',
    fontSize: 25,
  },
  stopWatchContainer: {
    flex: 1,
    backgroundColor: '#1A1C1E',
    padding: 20,
  },
  menuButton: {
    padding: 10,
  },
});
