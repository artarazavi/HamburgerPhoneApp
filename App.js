import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { db } from './config';
import * as Font from 'expo-font';
import call from 'react-native-phone-call';

export default class App extends React.Component {
  state = {
    number: '',
    eventStatus: '',
    fontsLoaded: false,
  }

  call = (num) => {
    const args = {
      number: num,
      prompt: false,
    };
    call(args).catch(console.error);
  };

  componentDidMount= async()  => {
    //load fonts
    await Font.loadAsync({'Audiowide': require('./assets/fonts/Audiowide-Regular.ttf')});
    this.setState({ fontsLoaded: true });

    //get status
    db.ref('test/event_status').on('value', snapshot => {
      let data = snapshot.val();
      this.setState({ eventStatus: data });
    });

    //get button press
    db.ref('test/button_press').on('value', snapshot => {
      let data = snapshot.val();
      this.setState({ number: data });
    });
  }

  componentDidUpdate(){
    //initiate call
    if(this.state.eventStatus === "in call" && this.state.number.length > 0){
      this.call(this.state.number);
      db.ref('/test').set({ event_status:  "Ready for next call", button_press:  ""});
    }
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
          <Text>{this.state.eventStatus}</Text>
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
    fontSize: 36,
    fontFamily: 'Audiowide'
  },
  burgerImg: {
    height: 300,
    width: 300
  }
});
