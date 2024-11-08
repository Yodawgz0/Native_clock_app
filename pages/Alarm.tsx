import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Switch,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import AddIcon from '../assets/add.svg';
import Menu from '../assets/menuDots.svg';
import UpArrow from '../assets/UpArrowKey.svg';
import DownArrow from '../assets/DownArrowKey.svg';

const Alarm = () => {
  const [expandedAlarms, setExpandedAlarms] = useState<number[]>([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState('8:30 AM'); // Default time
  const [alarms, setAlarms] = useState([
    {time: '8:30', period: 'AM', days: 'Mon, Tue, Wed, Thu, Fri', active: true},
    {time: '9:00', period: 'AM', days: 'Sun, Sat', active: false},
  ]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newAlarm, setNewAlarm] = useState({
    time: '',
    period: 'AM',
    days: '',
    active: true,
  });

  const toggleExpand = (index: number) => {
    setExpandedAlarms(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index],
    );
  };

  const handleAddAlarm = () => {
    setAlarms([...alarms, newAlarm]);
    setModalVisible(false);
    setNewAlarm({time: '', period: 'AM', days: '', active: true});
  };

  const toggleAlarmActive = (index: number) => {
    setAlarms(prev =>
      prev.map((alarm, i) =>
        i === index ? {...alarm, active: !alarm.active} : alarm,
      ),
    );
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 0.9}}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Alarm</Text>
          <TouchableOpacity style={styles.menuButton}>
            <Menu />
          </TouchableOpacity>
        </View>

        {alarms.map((alarm, index) => (
          <View key={index} style={styles.alarmCard}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={styles.alarmInfo}>
                <Text style={styles.time}>
                  {alarm.time}
                  <Text style={styles.period}>{alarm.period}</Text>
                </Text>
                <Text style={styles.days}>{alarm.days}</Text>
              </View>
              <View style={styles.actions}>
                <Switch
                  style={styles.switch}
                  value={alarm.active}
                  onValueChange={() => toggleAlarmActive(index)}
                />
                <TouchableOpacity
                  style={styles.expandButton}
                  onPress={() => toggleExpand(index)}>
                  {expandedAlarms.includes(index) ? (
                    <UpArrow width={15} height={15} />
                  ) : (
                    <DownArrow width={15} height={15} />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {expandedAlarms.includes(index) && (
              <View style={styles.expandedContent}>
                {/* Additional expanded options here */}
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Modal for adding a new alarm */}
      <Modal
        transparent
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Set Alarm</Text>
            <TextInput
              style={styles.input}
              placeholder="Time (e.g., 8:30)"
              value={newAlarm.time}
              onChangeText={text => setNewAlarm({...newAlarm, time: text})}
            />
            <TextInput
              style={styles.input}
              placeholder="Days (e.g., Mon, Tue)"
              value={newAlarm.days}
              onChangeText={text => setNewAlarm({...newAlarm, days: text})}
            />
            <View style={styles.switchRow}>
              <Text style={styles.switchText}>AM</Text>
              <Switch
                value={newAlarm.period === 'PM'}
                onValueChange={value =>
                  setNewAlarm({...newAlarm, period: value ? 'PM' : 'AM'})
                }
              />
              <Text style={styles.switchText}>PM</Text>
            </View>
            <View style={styles.switchRow}>
              <Text style={styles.switchText}>Active</Text>
              <Switch
                value={newAlarm.active}
                onValueChange={value =>
                  setNewAlarm({...newAlarm, active: value})
                }
              />
            </View>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleAddAlarm}>
              <Text style={styles.modalButtonText}>Add Alarm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.controlButtonContainer}>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.mainButton, {backgroundColor: '#93CCFF'}]}
          onPress={() => setModalVisible(true)}>
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
    flexDirection: 'column',
    alignItems: 'baseline',
    width: 200,
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
  actions: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  expandButton: {
    backgroundColor: '#2b333a',
    alignItems: 'center',
    padding: 5,
    borderRadius: 20,
    height: 27,
    width: 27,
  },
  switch: {
    marginLeft: 10,
  },
  expandedContent: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    margin: 20,
    padding: 20,
    backgroundColor: '#2b2b2b',
    borderRadius: 10,
  },
  modalTitle: {
    color: '#e5e5e5',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#3a3a3a',
    color: '#e5e5e5',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  switchText: {
    color: '#e5e5e5',
  },
  modalButton: {
    backgroundColor: '#93CCFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },
  modalButtonText: {
    color: '#121212',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
