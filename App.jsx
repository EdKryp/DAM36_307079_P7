import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

export default App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setweatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_KEY = 'c6a53f8b5c104ea595271201242102';

  const getWeather = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=yes&alerts=no`);
      const data = await res.json();
      if (res.status === 200) {
        setweatherData(data);
        setError(null);
      } else {
        setError(`Error finding weather data!`);
      }
    } catch (err) {
      setError(`Error finding weather data!`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    city ? getWeather() : setweatherData(null);
  }, [city]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      <TextInput
        style={styles.textInput}
        placeholder='Enter city name'
        value={city}
        onChangeText={(text) => setCity(text)}
      />
      <TouchableOpacity style={styles.button} onPress={getWeather} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Get Weather'}</Text>
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
      {loading && <ActivityIndicator size='large' color='#3498db' />}
      {weatherData && (
        <View style={styles.weatherContainer}>
          <Text>City: {weatherData.location.name}</Text>
          <Text>Country: {weatherData.location.country}</Text>
          <Text>Temperature: {weatherData.current.temp_c}°C</Text>
          <Text>Condition: {weatherData.current.condition.text}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    width: '80%',
    padding: 10,
    marginVertical: 20,
    borderRadius: 5,
    backgroundColor: '#ecf0f1',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  errorText: {
    color: '#e74c3c',
    marginTop: 10,
    fontSize: 16,
  },
  weatherContainer: {
    marginTop: 20,
    backgroundColor: '#dfe6e9',
    padding: 10,
    borderRadius: 5,
  },
});