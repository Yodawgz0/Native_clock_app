import React from 'react';
import {StyleSheet, Text, View, Switch, TouchableOpacity} from 'react-native';
import AddIcon from '../assets/add.svg';
import Menu from '../assets/menuDots.svg';

const Alarm = () => {
  return (
    <View style={styles.container}>
      <View style={{flex: 0.9}}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Alarm</Text>
          <TouchableOpacity style={styles.menuButton}>
            <Menu />
          </TouchableOpacity>
        </View>

        {/* First Alarm Entry */}
        <View style={styles.alarmCard}>
          <View style={styles.alarmInfo}>
            <Text style={styles.time}>8:30</Text>
            <Text style={styles.period}>AM</Text>
          </View>
          <Text style={styles.days}>Mon, Tue, Wed, Thu, Fri</Text>
          <Switch style={styles.switch} />
        </View>

        {/* Second Alarm Entry */}
        <View style={styles.alarmCard}>
          <View style={styles.alarmInfo}>
            <Text style={styles.time}>9:00</Text>
            <Text style={styles.period}>AM</Text>
          </View>
          <Text style={styles.days}>Sun, Sat</Text>
          <Switch style={styles.switch} />
        </View>
      </View>

      <View style={styles.controlButtonContainer}>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.mainButton, {backgroundColor: '#93CCFF'}]}>
          <AddIcon width={25} height={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Alarm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
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
  alarmCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  alarmInfo: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  time: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#e5e5e5',
  },
  period: {
    fontSize: 20,
    color: '#e5e5e5',
    marginLeft: 4,
  },
  days: {
    fontSize: 16,
    color: '#a5a5a5',
    marginTop: 4,
  },
  switch: {
    position: 'absolute',
    top: 20,
    right: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#5e7ce2',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 36,
    color: '#ffffff',
    fontWeight: 'bold',
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
