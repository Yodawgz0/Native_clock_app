import {StyleSheet, Text, TouchableOpacity, View, Animated} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Menu from '../assets/menuDots.svg';
import PlayButton from '../assets/play.svg';
import PauseButtonIcon from '../assets/pause.svg';

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [moveWhenMinutes, setMoveWhenMinutes] = useState<number>(0);
  const animatedWidth = useRef(new Animated.Value(90)).current;
  const [animatedBorderRadius, setAnimatedBorderRadius] = useState<number>(50);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime(prevElapsedTime => prevElapsedTime + 10);
      }, 10);
    } else if (!isRunning && elapsedTime !== 0) {
      clearInterval(interval!);
    }
    const {minutes} = formatTime(elapsedTime);
    setMoveWhenMinutes(minutes !== 0 ? 20 : 0);

    return () => clearInterval(interval!);
  }, [isRunning, elapsedTime]);

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: isRunning ? 150 : 90,
      duration: 150,
      useNativeDriver: false,
    }).start();
    setAnimatedBorderRadius(isRunning ? 30 : 50);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(prev => !prev);
  };

  const formatTime = (time: number) => {
    const totalSeconds = Math.floor(time / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60);
    return {
      minutes,
      seconds: String(seconds).padStart(2, '0'),
      milliseconds: String(milliseconds).padStart(2, '0'),
    };
  };

  const {minutes, seconds, milliseconds} = formatTime(elapsedTime);

  return (
    <View style={styles.stopWatchContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Stopwatch</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Menu />
        </TouchableOpacity>
      </View>
      <View style={styles.clockContainer}>
        <TouchableOpacity
          onPress={handleStartStop}
          activeOpacity={1}
          style={styles.stopwatchButton}>
          <Text style={[styles.hoursText, {right: -5}]}>
            {minutes !== 0 ? minutes + ':' : ''}
            {seconds}
          </Text>
          <Text style={[styles.secondsText, , {left: moveWhenMinutes}]}>
            {milliseconds}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.controlButtonContainer}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={handleStartStop}
          style={[
            styles.mainButton,
            {backgroundColor: '#93CCFF', borderRadius: animatedBorderRadius},
          ]}>
          <Animated.View
            style={[
              styles.mainButton,
              {
                width: animatedWidth,
              },
            ]}>
            {isRunning ? (
              <PauseButtonIcon width={25} height={25} />
            ) : (
              <PlayButton width={25} height={25} />
            )}
          </Animated.View>
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
    fontSize: 70,
    fontWeight: '400',
  },
  secondsText: {
    color: 'white',
    fontFamily: 'Rubik',
    fontSize: 50,
    fontWeight: '400',
    marginLeft: 20,
    bottom: 15,
  },
  stopwatchButton: {
    borderColor: '#60626e',
    borderWidth: 10,
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
  mainButton: {
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
