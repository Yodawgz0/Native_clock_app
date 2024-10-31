import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Menu from '../assets/menuDots.svg';
import Close from '../assets/close.svg';
import RestartButtoonPink from '../assets/RestartPink.svg';
import PlayButton from '../assets/play.svg';
import PauseButtonIcon from '../assets/pause.svg';
import AddIcon from '../assets/add.svg';

const Timer = () => {
  return (
    <View style={styles.timerContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Timer</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Menu />
        </TouchableOpacity>
      </View>
      <View style={styles.timerHolderContainer}>
        <View style={styles.timerInnerContainerHeader}>
          <Text style={styles.timerInnerContainerHeaderText}>3s Timer</Text>
          <TouchableOpacity style={styles.timerInnerContainerHeaderCloseButton}>
            <Close width={15} height={15} />
          </TouchableOpacity>
        </View>
        <View style={styles.timerFunctionHolder}>
          <View style={styles.timerWatchButton}>
            <Text
              style={{
                flex: 0.5,
                top: 90,
                color: 'white',
                fontSize: 70,
              }}>
              59
            </Text>
            <View style={{flex: 0.5}}>
              <TouchableOpacity style={styles.resetButton}>
                <RestartButtoonPink width={40} height={40} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.controlButtonsContainer}>
            <TouchableOpacity
              style={[
                styles.playButton,
                {backgroundColor: '#2b333a', borderRadius: 50},
              ]}>
              <Text style={{color: 'white', fontSize: 15}}>+1:00</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.playButton,
                {backgroundColor: '#93CCFF', borderRadius: 50},
              ]}>
              {false ? (
                <PauseButtonIcon width={25} height={25} />
              ) : (
                <PlayButton width={25} height={25} />
              )}
            </TouchableOpacity>
          </View>
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

export default Timer;

const styles = StyleSheet.create({
  timerContainer: {
    padding: 10,
    flex: 1,
    backgroundColor: '#1c1e20',
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
  timerHolderContainer: {
    backgroundColor: '#22272c',
    borderRadius: 20,
    flex: 0.87,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 20,
  },
  timerInnerContainerHeader: {
    margin: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timerInnerContainerHeaderText: {
    color: 'white',
    fontSize: 30,
  },
  timerInnerContainerHeaderCloseButton: {
    backgroundColor: '#2b333a',
    alignItems: 'center',
    padding: 5,
    borderRadius: 20,
    height: 27,
    width: 27,
  },
  timerWatchButton: {
    borderColor: '#60626e',
    borderWidth: 10,
    borderRadius: 150,
    height: 300,
    width: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerFunctionHolder: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    top: 50,
  },
  playButton: {
    height: 100,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButtonsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  controlButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 0.1,
  },
  mainButton: {
    height: 90,
    width: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
