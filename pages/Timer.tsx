import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Menu from '../assets/menuDots.svg';
import Close from '../assets/close.svg';
import RestartButtoonPink from '../assets/RestartPink.svg';
import PlayButton from '../assets/play.svg';
import PauseButtonIcon from '../assets/pause.svg';
import AddIcon from '../assets/add.svg';
import BackspaceIcon from '../assets/Backspace.svg';

const Timer = () => {
  const [seconds, setSeconds] = useState(180);
  const [isRunning, setIsRunning] = useState(false);
  const [numPadShow, setNumPadShow] = useState<boolean>(false);
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(prev => prev - 1);
      }, 1000);
    } else if (seconds === 0 || !isRunning) {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, seconds]);

  const handlePlayPause = () => {
    setIsRunning(!isRunning);
  };

  const handleAddMinute = () => {
    setSeconds(prev => prev + 60);
  };

  const formatTime = (sec: number) => {
    const minutes = Math.floor(sec / 60).toString();
    const seconds = (sec % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const numPadKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '0'];

  return (
    <View style={styles.timerContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Timer</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Menu />
        </TouchableOpacity>
      </View>
      {numPadShow ? (
        <View>
          <View style={styles.timerHolderContainer}>
            <View style={styles.timerInnerContainerHeader}>
              <Text style={styles.timerInnerContainerHeaderText}>3m Timer</Text>
              <TouchableOpacity
                style={styles.timerInnerContainerHeaderCloseButton}>
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
                  {formatTime(seconds)}
                </Text>
                <View style={{flex: 0.5}}>
                  <TouchableOpacity
                    style={styles.resetButton}
                    onPress={() => setSeconds(180)}>
                    <RestartButtoonPink width={40} height={40} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.controlButtonsContainer}>
                <TouchableOpacity
                  style={[
                    styles.playButton,
                    {backgroundColor: '#2b333a', borderRadius: 50},
                  ]}
                  onPress={handleAddMinute}>
                  <Text style={{color: 'white', fontSize: 15}}>+1:00</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.playButton,
                    {backgroundColor: '#93CCFF', borderRadius: 50},
                  ]}
                  onPress={handlePlayPause}>
                  {isRunning ? (
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
      ) : (
        <View>
          <TextInput />
          <View style={styles.numPadContainer}>
            {numPadKeys.map((key, index) => (
              <View style={styles.numKeyPadButton}>
                <Text style={styles.textNumpPageKeys} key={key}>
                  {key}
                </Text>
              </View>
            ))}
            <View
              style={[styles.numKeyPadButton, {backgroundColor: '#60626e'}]}>
              <BackspaceIcon height={24} width={24} />
            </View>
          </View>
        </View>
      )}
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
    fontSize: 17,
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
    margin: 10,
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
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  controlButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 0.13,
  },
  mainButton: {
    height: 90,
    width: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  numPadContainer: {
    flexWrap: 'wrap',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 60,
  },
  numKeyPadButton: {
    flex: 0.7,
    minWidth: 80,
    minHeight: 80,
    borderRadius: 45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2b333a',
    margin: 5,
  },
  textNumpPageKeys: {
    color: 'white',
    fontSize: 27,
  },
});
