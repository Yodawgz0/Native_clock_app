import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Animated,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import BackButton from '../assets/ArrowBack.svg';
import SearchIcon from '../assets/SearchIcon.svg';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchCities = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [timeZones, setTimeZones] = useState<string[]>([]);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const navigate = useNavigation();

  const allContinents = [
    'Africa',
    'America',
    'Antarctica',
    'Asia',
    'Europe',
    'Australia',
    'Pacific',
  ];

  useEffect(() => {
    const fetchTimeZones = async () => {
      try {
        const response = await fetch('http://worldtimeapi.org/api/timezone');
        const data = await response.json();

        const filteredTimeZones = data.filter((zone: string) =>
          allContinents.some(continent => zone.includes(continent)),
        );

        setTimeZones(filteredTimeZones);
      } catch (error) {
        console.error('Error fetching timezones:', error);
      }
    };

    fetchTimeZones();
  }, []);

  useEffect(() => {
    if (searchText.length > 0) {
      const filtered = timeZones
        .filter(zone => zone.toLowerCase().includes(searchText.toLowerCase()))
        .slice(0, 5);
      setFilteredCities(filtered);

      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    } else {
      setFilteredCities([]);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [searchText, timeZones]);

  const handleCitySelect = async (city: string) => {
    try {
      await AsyncStorage.setItem('selectedCity', city);
      navigate.navigate('Clock' as never);
    } catch (error) {
      console.error('Error saving city to storage:', error);
    }
  };

  const listOpacity = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <View style={styles.cityContainer}>
      <View style={styles.searchContainer}>
        <BackButton
          onPress={() => navigate.navigate('Clock' as never)}
          height={20}
          width={20}
        />
        <View style={{marginLeft: 10}}>
          <TextInput
            placeholder="Search for a city"
            cursorColor={'#c1c1c1'}
            placeholderTextColor="#c1c1c1"
            style={{color: 'white'}}
            onChangeText={setSearchText}
            value={searchText}
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
        <Animated.View
          style={[styles.searchIconDisplayContainer, {opacity: fadeAnim}]}>
          <SearchIcon width={100} height={100} />
          <Text style={{color: 'white'}}>Search for a city</Text>
        </Animated.View>
      ) : (
        <Animated.View style={{opacity: listOpacity}}>
          <FlatList
            data={filteredCities}
            keyExtractor={item => item}
            renderItem={({item}) => (
              <View style={[styles.cityItem]}>
                <Text
                  onPress={() => handleCitySelect(item.split('/')[1])}
                  style={{color: 'white'}}>
                  {item.split('/')[1].split('_').join(' ') || item}
                </Text>
              </View>
            )}
          />
        </Animated.View>
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
  cityItem: {
    marginVertical: 15,
    marginHorizontal: 30,
  },
});
