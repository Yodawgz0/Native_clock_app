import React, {useEffect, useMemo, useState} from 'react';
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
import DeleteIcon from '../assets/Delete.svg';

const Timer = () => {
  const [seconds, setSeconds] = useState(180);
  const [isRunning, setIsRunning] = useState(false);
  const [numPadShow, setNumPadShow] = useState<boolean>(false);
  const [placeholder, setPlaceholder] = useState<string[]>(['00', '00', '00']);
  const unitTime: string[] = ['h', 'm', 's'];
  const [originSeconds, SetOriginalSeconds] = useState(180);

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
    const hours = Math.floor(sec / 3600).toString();
    const minutes = Math.floor((sec % 3600) / 60).toString();
    const seconds = (sec % 60).toString().padStart(2, '0');
    return `${parseInt(hours) ? hours + ':' : ''}${
      parseInt(minutes) ? minutes + ':' : ''
    }${seconds}`;
  };

  const calculateSecondsFromPlaceholder = () => {
    const hours = parseInt(placeholder[0]) || 0;
    const minutes = parseInt(placeholder[1]) || 0;
    const seconds = parseInt(placeholder[2]) || 0;
    return hours * 3600 + minutes * 60 + seconds;
  };

  const handleNumPadPlay = () => {
    const totalSeconds = calculateSecondsFromPlaceholder();
    if (totalSeconds > 0) {
      setSeconds(totalSeconds);
      SetOriginalSeconds(totalSeconds);
      setIsRunning(true);
      setNumPadShow(false);
      setPlaceholder(['00', '00', '00']);
    }
  };

  const numPadKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '0'];
  const handleNumPadPress = (key: string) => {
    const updatedPlaceholder = [...placeholder];
    if (updatedPlaceholder[2][0] === '0') {
      updatedPlaceholder[2] = updatedPlaceholder[2][1] + key;
    } else if (updatedPlaceholder[1][0] === '0') {
      updatedPlaceholder[1] = updatedPlaceholder[1][1] + key;
    } else if (updatedPlaceholder[0][0] === '0') {
      updatedPlaceholder[0] = updatedPlaceholder[0][1] + key;
    }
    setPlaceholder(updatedPlaceholder);
  };

  const handleBackspacePress = () => {
    const updatedPlaceholder = [...placeholder];
    if (parseInt(updatedPlaceholder[2]) > 1) {
      updatedPlaceholder[2] = '0' + updatedPlaceholder[2][0];
    } else if (parseInt(updatedPlaceholder[1]) > 0) {
      updatedPlaceholder[2] = '00';
      updatedPlaceholder[1] = '0' + updatedPlaceholder[1][0];
    } else if (parseInt(updatedPlaceholder[0]) > 0) {
      updatedPlaceholder[1] = '00';
      updatedPlaceholder[0] = '0' + updatedPlaceholder[0][0];
    }
    setPlaceholder(updatedPlaceholder);
  };

  const timerHeaderCalc = useMemo(() => {
    return seconds >= 3600
      ? `${Math.floor(seconds / 3600)}h Timer`
      : seconds >= 60
      ? `${Math.floor(seconds / 60)}m Timer`
      : `${seconds}s Timer`;
  }, [placeholder]);

  return (
    <View style={styles.timerContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Timer</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Menu />
        </TouchableOpacity>
      </View>
      {!numPadShow ? (
        <>
          <View style={styles.timerHolderContainer}>
            <View style={styles.timerInnerContainerHeader}>
              <Text style={styles.timerInnerContainerHeaderText}>
                {timerHeaderCalc}
              </Text>
              <TouchableOpacity
                style={styles.timerInnerContainerHeaderCloseButton}>
                <Close width={15} height={15} />
              </TouchableOpacity>
            </View>
            <View style={styles.timerFunctionHolder}>
              <View style={styles.timerWatchButton}>
                <Text
                  style={{flex: 0.5, top: 90, color: 'white', fontSize: 70}}>
                  {formatTime(seconds)}
                </Text>
                <View style={{flex: 0.5}}>
                  <TouchableOpacity
                    style={styles.resetButton}
                    onPress={() => setSeconds(originSeconds)}>
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
              onPress={() => setNumPadShow(true)}
              activeOpacity={1}
              style={[styles.mainButton, {backgroundColor: '#93CCFF'}]}>
              <AddIcon width={25} height={25} />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View>
          <View style={styles.textInputConatiner}>
            {[0, 1, 2].map(idx => (
              <View style={styles.textInPlaceholderInput} key={idx}>
                <TextInput
                  placeholder={placeholder[idx]}
                  style={{fontSize: 50, color: 'white'}}
                  onChangeText={text => {
                    const updatedPlaceholder = [...placeholder];
                    updatedPlaceholder[idx] = text;
                    setPlaceholder(updatedPlaceholder);
                  }}
                  value={placeholder[idx]}
                  keyboardType="numeric"
                />
                <Text style={styles.suffixInputPlaceholder}>
                  {unitTime[idx]}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.numPadContainer}>
            {numPadKeys.map(key => (
              <TouchableOpacity
                key={key}
                style={styles.numKeyPadButton}
                onPress={() => handleNumPadPress(key)}>
                <Text style={styles.textNumpPageKeys}>{key}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[styles.numKeyPadButton, {backgroundColor: '#60626e'}]}
              onPress={handleBackspacePress}>
              <BackspaceIcon height={24} width={24} />
            </TouchableOpacity>
          </View>
          <View style={styles.addTimerControlButtons}>
            <TouchableOpacity
              onPress={() => {
                setNumPadShow(false);
                setPlaceholder(['00', '00', '00']);
              }}
              style={[styles.deleteButton]}>
              <DeleteIcon height={24} width={24} />
            </TouchableOpacity>
            {parseInt(placeholder.join('')) ? (
              <TouchableOpacity
                onPress={handleNumPadPlay}
                activeOpacity={1}
                style={[styles.mainButton, {backgroundColor: '#93CCFF'}]}>
                <PlayButton width={25} height={25} />
              </TouchableOpacity>
            ) : (
              <></>
            )}
            <View style={{width: 80}}></View>
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
  textInputConatiner: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 80,
    marginTop: 30,
    marginBottom: 80,
  },
  textInPlaceholderInput: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  suffixInputPlaceholder: {
    color: 'white',
    fontSize: 16,
    bottom: 20,
    alignSelf: 'flex-end',
  },
  deleteButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 50,
    height: 50,
    borderRadius: 35,
    backgroundColor: '#3b5062',
    margin: 20,
  },
  addTimerControlButtons: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
