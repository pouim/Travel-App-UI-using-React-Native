import React, { Component } from 'react';
import { NetInfo, Image, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { theme } from '../constants';

export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      icon: 'default',
      temp: '',
      precipChance: '',
      summary: 'Weather is Offline',
      locationName: 'Current \nWeather'
    }
  }

  componentDidMount() {
    return fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + this.props.lat + '&lon=' + this.props.long + '&units=metric&appid=6cedc15d13a6f3899101777c5bd94f70').then((response) => response.json()).then((responseJson) => {
      this.setState({temp: responseJson.main.temp});
    }).catch((error) => {
      console.error(error);
      this.setState({isLoading: false});
    });
  }

  render() {
    return (
            <View>
              <Text style={styles.recommendationTemp}>{this.state.temp}℃</Text>
            </View>
    )
  }
}

const styles = StyleSheet.create({
    recommendationTemp: {
    fontSize: theme.sizes.font * 1.25,
    color: theme.colors.white
  },
});

