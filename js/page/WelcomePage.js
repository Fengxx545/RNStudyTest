

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil'



export default class WelcomePage extends Component {


  componentDidMount(){
    this.timer=setTimeout(()=>{
      NavigationUtil.goHome(this.props)
    //  const {navigation} = this.props;
    //  navigation.navigate("Main");
    },500);
  }

  componentWillUnmount(){
    this.timer&&clearTimeout(this.timer); 
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
