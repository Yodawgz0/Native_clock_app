import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import BackButton from '../assets/ArrowBack.svg';
import SearchIcon from '../assets/SearchIcon.svg';

const SearchCities = () => {
  const [searchText, setSearchText] = useState<string>('');
  return (
    <View style={styles.cityContainer}>
      <View style={styles.searchContainer}>
        <BackButton height={20} width={20} />
        <View style={{marginLeft: 10}}>
          <TextInput
            placeholder="Search for a city"
            cursorColor={'#c1c1c1'}
            placeholderTextColor="#c1c1c1"
            onChangeText={setSearchText}
          />
        </View>
      </View>
      <View
        style={{
          marginTop: 10,
          borderBottomColor: '#c1c1c1',
          borderStyle: 'solid',
          borderWidth: 1,
        }}></View>
      {!searchText.length ? (
        <View style={styles.searchIconDisplayContainer}>
          <SearchIcon width={100} height={100} />
          <Text style={{color: 'white'}}>Search for a city</Text>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default SearchCities;

const styles = StyleSheet.create({
  cityContainer: {
    flex: 1,
    backgroundColor: '#1A1C1E',
    paddingTop: 20,
    marginTop: 30,
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  searchIconDisplayContainer: {
    width: 'auto',
    flex: 0.5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
