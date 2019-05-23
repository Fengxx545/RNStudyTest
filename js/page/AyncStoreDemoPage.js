

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, AsyncStorage } from 'react-native';


const KEY = "save_key";
export default class AyncStoreDemoPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showText: ''
    }
  }

  doSave() {
    //用法一
    AsyncStorage.setItem(KEY, this.value, error => {
      error && console.log(error.toString());
    });

    // //用法二
    // AsyncStorage.setItem(KEY, this.value)
    //     .catch(error => {
    //         error && console.log(error.toString());
    //     });
    //
    // //用法三
    // try {
    //     await  AsyncStorage.setItem(KEY, this.value);
    // } catch (error) {
    //     error && console.log(error.toString());
    // }
  }

  doRemove() {
    //用法一
    AsyncStorage.removeItem(KEY, error => {
      error && console.log(error.toString());
    });

    // //用法二
    // AsyncStorage.removeItem(KEY)
    //     .catch(error => {
    //         error && console.log(error.toString());
    //     });
    //
    // //用法三
    // try {
    //     await  AsyncStorage.removeItem(KEY);
    // } catch (error) {
    //     error && console.log(error.toString());
    // }
  }

  getData() {
    //用法一
    AsyncStorage.getItem(KEY, (error, value) => {
      this.setState({
        showText: value
      });
      console.log(value);
      error && console.log(error.toString());
    });
    // //用法二
    // AsyncStorage.getItem(KEY)
    //     .then(value => {
    //         this.setState({
    //             showText: value
    //         });
    //         console.log(value);
    //
    //     })
    //     .catch(error => {
    //         error && console.log(error.toString());
    //     });
    // //用法三
    // try {
    //     const value = await  AsyncStorage.getItem(KEY);
    //     this.setState({
    //         showText: value
    //     });
    //     console.log(value);
    // } catch (error) {
    //     error && console.log(error.toString());
    // }
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
              this.doSave();
            }}
          >save</Text>
          <Text style={styles.welcome}
            onPress={() => {
              this.doRemove();
            }}
          >del</Text>
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
