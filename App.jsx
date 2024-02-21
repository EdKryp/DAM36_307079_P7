import React, {useState, useEffect} from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'

export default App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setweatherData] = useState(null);
  const [error, setError] = useState(null);
  const API_KEY = 'c6a53f8b5c104ea595271201242102';
  
  const getWeather = async()=>{
    try{
      const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=yes&alerts=no`)
      const data = await res.json();
      if(res.status === 200){
        setweatherData(data);
        setError(null);
      }else{
        setError(`Error finding weather data!`)
      }
    }catch(err){
      setError(`Error finding weather data!`)
    }
  }

  useEffect(()=>{
    city ? getWeather : setweatherData(null);
  }, [city]);

  return[
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Weather App!</Text>
      <TextInput
      style={styles.textInput}
      placeholder='Enter city name'
      value={city}
      onChangeText= {(text) => setCity(text)}
      />
      <TouchableOpacity style={styles.button} onPress={getWeather}>
        <Text>Get Weather</Text>
      </TouchableOpacity>
      {error && <Text>{error}</Text>}
      {weatherData && (
        <View>
          <Text>City: {weatherData.location.name}</Text>
          <Text>Country: {weatherData.location.country}</Text>
          <Text>Temperature: {weatherData.current.temp_c}</Text>
          <Text>Condition: {weatherData.current.condition.text}</Text>
        </View>
      )}
    </View>
  ]
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title:{
    fontSize: 24,
    marginBottom:20,
  },
  textInput:{
    borderWidth:1,
    borderColor:'gray',
    width:'80%',
    padding:10,
    margin:20
  },
  button:{
    backgroundColor:'lightblue',
    padding:10,
    borderRadius:5
  }
})
