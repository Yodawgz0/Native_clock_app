import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Stopwatch = () => {
  return (
    <View style={styles.stopWatchContainer}>
      <Text style={{marginTop: 20}}>Stopwatch</Text>
    </View>
  );
};

export default Stopwatch;

const styles = StyleSheet.create({
  stopWatchContainer: {
    flex: 1,
    backgroundColor: ' #1A1C1E',
    padding: 20,
  },
});
