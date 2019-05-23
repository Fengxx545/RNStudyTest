

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput } from 'react-native';



export default class FetchDemo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showText: ''
    }
  }

  loadData() {
    // https://api.github.com/search/repositories?q=java
    let url = `https://api.github.com/search/repositories?q=${this.searchKey}`
    fetch(url)
      .then((response) => response.text())
      .then(responseText => {
        this.setState({
          showText: responseText,
        })
      })
  }
  loadData2() {
    // https://api.github.com/search/repositories?q=java
    let url = `https://api.github.com/search/repositories?q=${this.searchKey}`
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
        throw new Error('网络请求异常');
      })
      .then(responseText => {
        this.setState({
          showText: responseText,
        })
      })
      .catch(e => {
        this.setState({
          showText: e.toString()
        })
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.input_container}>
          <TextInput
            style={styles.input}
            onChangeText={text => {
              this.searchKey = text
            }}
          />
          <Text style={styles.welcome}
            onPress={() => {
              this.loadData2();
            }}
          >加载</Text>
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
