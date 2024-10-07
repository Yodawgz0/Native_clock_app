import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AlarmIcon from '../../assets/alarm.svg';
import ClockIcon from '../../assets/clock.svg';
import HourGlass from '../../assets/hourglass.svg';
import TimerIcon from '../../assets/timer.svg';
import SleepIcon from '../../assets/sleep.svg';
import {useState} from 'react';

const NavBar = () => {
  const allIcons = [AlarmIcon, ClockIcon, HourGlass, TimerIcon, SleepIcon];
  const titles = ['Alarm', 'Clock', 'Timer', 'Stopwatch', 'Bedtime'];
  const [selectedIcon, setSelectedIcon] = useState<number>(3);
  return (
    <View style={styles.navBarContainer}>
      {allIcons.map((Icon, index) => (
        <TouchableOpacity
          onPress={() => {
            setSelectedIcon(index);
          }}
          style={[
            styles.iconContainer,
            selectedIcon === index ? styles.selectedIcon : '',
          ]}
          key={index}>
          <Icon width="24" height="24" />
          <Text style={styles.iconTitle}>{titles[index]}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  navBarContainer: {
    backgroundColor: '#232A30',
    paddingVertical: 25,
    flex: 0.04,
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-around',
  },
  iconContainer: {
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderRadius: 15,
    alignItems: 'center',
  },
  iconTitle: {
    color: 'white',
    fontSize: 9,
    fontWeight: '600',
  },
  selectedIcon: {
    backgroundColor: '#9DADBE',
  },
});
