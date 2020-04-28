import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { db } from './config';
import * as Font from 'expo-font';

export default class App extends React.Component {
  state = {
    number: '',
    fontsLoaded: false,
  }

  componentDidMount= async()  => {
    await Font.loadAsync({'Audiowide': require('./assets/fonts/Audiowide-Regular.ttf')});
    this.setState({ fontsLoaded: true });
    db.ref('test/button_press').on('value', snapshot => {
      let data = snapshot.val();
      this.setState({ number: data });
    });
  }
  render() {
    if(this.state.fontsLoaded) {
      return (
        <View style={styles.container}>
          <Text style={styles.titleTxt}>Hamburger Phone</Text>
          <Image
            source={require('./assets/images/hamburger.png')}
            style={styles.burgerImg}
          />
          <Text>Calling</Text>
          <Text>{this.state.number}</Text>
        </View>
      )
    }
    else{
      return(null)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTxt: {
    fontSize: 38,
    fontFamily: 'Audiowide'
  },
  burgerImg: {
    height: 300,
    width: 300
  }
});
