

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, BackHandler } from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil'
import BackPressComponent from '../common/BackPressComponent'
import DynamicTabNavigator from '../navigator/DynamicTabNagivator'
import { NavigationActions } from "react-navigation";
import { connect } from 'react-redux';

class HomePage extends Component {

  constructor(props){
    super(props)
    this.backPress = new BackPressComponent({backPress:this.onBackPress()});
  }

  componentDidMount() {
    this.backPress.componentDidMount();
    // BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount() {
    this.backPress.componentWillUnmount();
    // BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  /** * 处理 Android 中的物理返回键 * https://reactnavigation.org/docs/en/redux-integration.html#handling-the-hardware-back-button-in-android * @returns {boolean} */
  onBackPress = () => {
    const { dispatch, nav } = this.props;
    //if (nav.index === 0) {
    if (nav.routes[1].index === 0) {//如果RootNavigator中的MainNavigator的index为0，则不处理返回事件
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };


  render() {
    //保存外层的navigation
    NavigationUtil.navigation = this.props.navigation;
    return <DynamicTabNavigator />
  }
}


const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(HomePage);

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
