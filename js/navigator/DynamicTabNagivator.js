

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import NavigationUtil from './NavigationUtil'
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import PopPage from '../page/PopPage'
import FavPage from '../page/FavPage'
import TrePage from '../page/TrePage'
import MinePage from '../page/MinePage'
import TestPage from '../page/Test'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { BottomTabBar } from 'react-navigation-tabs'
import { connect } from 'react-redux'
import EventBus from 'react-native-event-bus'
import EventTypes from '../util/EventTypes';


const TABS = {
  PopPage: {
    screen: PopPage,
    navigationOptions: {
      // header: null,
      tabBarLabel: "最热",
      tabBarIcon: ({ tintColor, focused }) => (
        <MaterialIcons
          name="whatshot"
          size={20}
          style={{ color: tintColor }}

        />)
    }
  },
  FavPage: {
    screen: FavPage,
    navigationOptions: {
      // header: null,
      tabBarLabel: "收藏",
      tabBarIcon: ({ tintColor, focused }) => (
        <MaterialIcons
          name="favorite"
          size={20}
          style={{ color: tintColor }}

        />)
    },
  },
  TrePage: {
    screen: TrePage,
    navigationOptions: {
      // header: null,
      tabBarLabel: "趋势",
      tabBarIcon: ({ tintColor, focused }) => (
        <AntDesign
          name="areachart"
          size={20}
          style={{ color: tintColor }}

        />)
    },
  },
  MinePage: {
    screen: MinePage,
    navigationOptions: {
      // header: null,
      tabBarLabel: "我的",
      tabBarIcon: ({ tintColor, focused }) => (
        <AntDesign
          name="home"
          size={20}
          style={{ color: tintColor }}

        />)
    },
  },
  TestPage: {
    screen: TestPage,
    navigationOptions: {
      // header: null,
      tabBarLabel: "测试",
      tabBarIcon: ({ tintColor, focused }) => (
        <AntDesign
          name="home"
          size={20}
          style={{ color: tintColor }}

        />)
    },
  },
}

class DynamicTabNavigator extends Component {

  _tabNavigator() {
    if (this.Tab) {
      return this.Tab;
    }
    // const TabBarComponent = (props) => (<BottomTabBar {...props} />);
    const { PopPage, FavPage, TrePage, MinePage, TestPage } = TABS;//从TABS中取出可配置的导航界面
    const tabs = { PopPage, FavPage, TrePage, MinePage, TestPage };//配置需要显示的tab
    // PopPage.navigationOptions.tabBarLabel = "最新"
    return this.Tab = createAppContainer(createBottomTabNavigator(tabs, {
      // tabBarComponent: TabBarComponent
      tabBarComponent: props => {
        return <TabBarComponent {...props} theme={this.props.theme} />
      }
    }))
  }

  render() {
    const Tab = this._tabNavigator();
    return <Tab
      onNavigationStateChange={(preState, newState, action) => {
        EventBus.getInstance().fireEvent(EventTypes.BOTTOM_TAB_SELECT, {
          from: preState.index,
          to: newState.index
        });
      }}
    />
  }
}


class TabBarComponent extends React.Component {
  constructor(props) {
    super(props)
    this.theme = {
      tintColor: props.activeTintColor,
      updateTime: new Date().getTime(),
    }
  }

  render() {
    // const { routes, index } = this.props.navigation.state;
    // if (routes[index].params) {
    //   const { theme } = routes[index].params;
    //   if (theme && theme.updateTime > this.theme.updateTime) {
    //     this.theme = theme;
    //   }
    // }
    return <BottomTabBar
      {...this.props}
      // activeTintColor={this.theme.tintColor || this.props.activeTintColor}
      activeTintColor={this.props.theme}
    />

  }

}


const mapStateToProps = state => ({
  theme: state.theme.theme,
})

export default connect(mapStateToProps)(DynamicTabNavigator)


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
