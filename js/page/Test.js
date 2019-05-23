

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil'
import actions from '../redux/action'
import { connect } from 'react-redux'


class MinePage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>MinePage</Text>
        <Text style={styles.instructions}
          onPress={() => {
            // navigation.setParams({
            //   theme: {
            //     tintColor: 'red',
            //     updateTime: new Date().getTime(),
            //   }
            // })
            this.props.onThemeChange('#096')
          }}
        >改变主题颜色</Text>
        <Text style={styles.instructions}
          onPress={() => {
            NavigationUtil.goPage(this.props,'FetchDemo')
          }}
        >
          跳转FetchDemo
        </Text>
        <Text style={styles.instructions}
          onPress={() => {
            NavigationUtil.goPage(this.props,'AyncStoreDemoPage')
          }}
        >
          跳转AyncStoreDemoPage
        </Text>
        <Text style={styles.instructions}
          onPress={() => {
            NavigationUtil.goPage(this.props,'DataStoreDemoPage')
          }}
        >
          跳转DataStoreDemoPage
        </Text>
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
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  onThemeChange: theme => dispatch(actions.onThemeChange(theme))
})

export default connect(mapStateToProps, mapDispatchToProps)(MinePage)