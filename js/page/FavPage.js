

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, RefreshControl, ActivityIndicator, ToastAndroid } from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation'
import NavigationUtil from '../navigator/NavigationUtil';
import { FLAG_STORE } from '../dao/DataStore'

import { connect } from 'react-redux'
import actions from '../redux/action/index'
import PopItem from '../common/PopItem'
import Toast from 'react-native-easy-toast'

import NavigationBar from '../common/NavigationBar'
import FavDao from '../dao/FavDao';
import FavoriteUtil from '../util/FavoriteUtil';
import TrdItem from '../common/TrdItem';
import EventBus from 'react-native-event-bus';
import EventTypes from '../util/EventTypes';


export default class FavPage extends Component {


  constructor(props) {
    super(props)
    // this.tabsName = ['最热', '趋势'];
  }

  render() {
    const statusBar = {
      backgroundColor: 'red'
    }
    const navigationBar = <NavigationBar
      title='收藏'
      statusBar={
        statusBar
      }
    />

    const TabNavigator = createAppContainer(
      createMaterialTopTabNavigator(
        {
          'Popular': {
            screen: props => <FavTabPage {...props} flag={FLAG_STORE.Flag_pop} />,//设置传参
            navigationOptions: {
              title: '最热',
            }
          },
          'Trending': {
            screen: props => <FavTabPage {...props} flag={FLAG_STORE.Flag_trd} />,//设置传参
            navigationOptions: {
              title: '趋势',
            }
          }
        }, {
          // initialRouteName:"Trending",
          // animationEnabled:false,
          // backBehavior:"none",
          tabBarOptions: {
            activeTintColor: "red",
            inactiveTintColor: "yellow",
            pressColor: "red",
            scrollEnabled: false,//不能在style中上设置宽高，要在tabStyle设置，要不然设置成不可滑动的话label文字不显示
            // style: {
            //   backgroundColor: '#789',
            //   height: 30,
            //   alignItems: 'center',
            // },
            tabStyle: {
              borderColor: "blue",
              borderWidth: 1,
              height: 30
            },
            indicatorStyle: {
              backgroundColor: "red",
              height: 3
            },
            labelStyle: {
              backgroundColor: "black"
            },
            style: {
              backgroundColor: "yellow"
            }
          }
        }
      )
    );

    return <View style={{ flex: 1 }}>
      {navigationBar}
      <TabNavigator />
    </View>;
  }
}

class FavTab extends Component {

  constructor(props) {
    super(props)
    const { flag } = this.props;
    this.storeName = flag;
    this.favDao = new FavDao(flag);
  }
  componentDidMount() {
    this.loadData(true);
    EventBus.getInstance().addListener(EventTypes.BOTTOM_TAB_SELECT, this.listener = data => {
      if (data.to === 1) {
        this.loadData(false);
      }
      // handle the event
    })
  }
  componentWillUnmount() {
    EventBus.getInstance().removeListener(this.listener);
  }

  loadData(isShowLoad) {
    const { onFavLoad } = this.props;
    onFavLoad(this.storeName, isShowLoad);
  }
  _getStore() {
    const { fav } = this.props;
    let storeData = fav[this.storeName];//动态获取state
    if (!storeData) {
      storeData = {
        items: [],
        originalData: [],
        isLoading: false,
      }
    }
    return storeData;
  }

  onFavorite(item, isFav) {
    FavoriteUtil.onFavorite(this.favDao, item, isFav, this.storeName)
    this.loadData(false);
    if (this.storeName === FLAG_STORE.Flag_pop) {
      EventBus.getInstance().fireEvent(EventTypes.FAV_CHANGE_POP)
    } else if (this.storeName === FLAG_STORE.Flag_trd) {
      EventBus.getInstance().fireEvent(EventTypes.FAV_CHANGE_TRD)
    }
  }


  renderItemView(data) {
    const showString = data.item;
    const Item = this.storeName === FLAG_STORE.Flag_pop ? PopItem : TrdItem
    return <Item
      projectModel={showString}
      onSelect={(callBack) => {
        NavigationUtil.goPage({
          projectModel: showString,
          flag: this.storeName,
          callBack,
        }, 'DetailPage')
      }
      }
      onFavorite={(item, isfav) => this.onFavorite(item, isfav)}
    />
  }


  render() {
    let storeData = this._getStore();
    return (
      <View style={styles.container}>


        <FlatList
          data={storeData.originalData}
          renderItem={data => this.renderItemView(data)}
          keyExtractor={item => (item.item.id || item.item.fullName) + ""}
          refreshControl={
            <RefreshControl
              title={'loading'}
              titleColor={'red'}
              colors={['red', 'blue', 'green']}
              refreshing={storeData.isLoading}
              onRefresh={() => this.loadData(true)}
              tintColor={'black'}
            />
          }

        />

        <Toast
          ref={'toast'}
          positon={'center'}
        />

      </View>
    );
  }
}

const mapStateToProps = state => ({
  fav: state.fav,//需要跟combineReducers中的一致
});
const mapDispatchToProps = dispatch => ({
  onFavLoad: (storeName, isShowLoad) => dispatch(actions.onFavLoad(storeName, isShowLoad))
})

const FavTabPage = connect(mapStateToProps, mapDispatchToProps)(FavTab)

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
  tabStyle: {
    // minWidth: 50,
    // padding: 0,
  },
  tab_indicator: {
    height: 1,
    backgroundColor: 'white'

  },
  label: {
    alignItems: 'center',
    fontSize: 13,
    color: '#abc111',
    margin: 0
  },
  footerContainer: {
    alignItems: 'center'
  },
  indicator: {
    color: 'green',
    margin: 10
  }
});
