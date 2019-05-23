

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, AsyncStorage } from 'react-native';
import DataStore from '../dao/DataStore'


const KEY = "save_key";
export default class DataStoreDemoPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showText: ''
    }
    this.dataStore = new DataStore();
  }

  getData() {
    let url = `https://api.github.com/search/repositories?q=${this.value}`
    this.dataStore.fetchData(url)
      .then(data => {
        let showData = `初次数据加载时间：${new Date(data.timestamp)}\n${JSON.stringify(data.data)}`;
        this.setState({
          showText: showData
        })
      })
      .catch(error => {
        error && console.log(error)
      })

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.input_container}>
          <TextInput
            style={styles.input}
            onChangeText={text => {
              this.value = text;
            }}
          />
        </View>
        <View style={styles.input_container}>
          <Text style={styles.welcome}
            onPress={() => {
              this.getData();
            }}
          >get</Text>
        </View>

        <Text style={styles.instructions}>{this.state.showText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
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
  input: {
    height: 40,
    flex: 1,
    borderColor: 'blue',
    borderWidth: 1,
  },
  input_container: {
    flexDirection: "row"
  }
});
