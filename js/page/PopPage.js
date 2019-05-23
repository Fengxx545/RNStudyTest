

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
import EventBus from 'react-native-event-bus';
import EventTypes from '../util/EventTypes';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const PAGE_SIZE = 10;
const favDao = new FavDao(FLAG_STORE.Flag_pop)

export default class PopPage extends Component {


  constructor(props) {
    super(props)
    this.tabsName = ['java', 'Android', 'Ios', 'React', 'React-Native', 'C/C++'];
  }

  _genTabs() {
    const tabs = {};
    this.tabsName.forEach((item, index) => {
      // const key = 'tab ${index}' 拼接不起作用
      tabs[`tab${index}`] = {
        // screen: PopTab,
        screen: props => <PopTabPage {...props} tabLabel={item} />,//设置传参
        navigationOptions: {
          title: item
        }
      }
    });
    return tabs;
  }

  render() {
    const statusBar = {
      backgroundColor: 'red'
    }
    const navigationBar = <NavigationBar
      title='Pop'
      statusBar={
        statusBar
      }
    />

    const TabNavigator = createAppContainer(
      createMaterialTopTabNavigator(
        this._genTabs(), {
          tabBarOptions: {
            tabStyle: styles.tabStyle,
            upperCaseLabel: false,//是否使用大写，默认为true
            scrollEnabled: true, //设置是否可以滚动
            // style: {
            //   backgroundColor: '#789',
            //   height: 30,
            //   alignItems: 'center',
            // },
            indicatorStyle: styles.tab_indicator,//指示器的style
            labelStyle: styles.label,//文字样式
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

class PopTab extends Component {

  constructor(props) {
    super(props)
    this.storeName = this.props.tabLabel;
    this.isFavChange = false;
  }
  componentDidMount() {
    this.loadData();
    EventBus.getInstance().addListener(EventTypes.FAV_CHANGE_POP, this.favChangeListener = () => {
      // handle the event
      this.isFavChange = true;
    })
    EventBus.getInstance().addListener(EventTypes.BOTTOM_TAB_SELECT, this.bottomTabChangeListener = data => {
      // handle the event
      if (data.to === 0 && this.isFavChange) {
        this.loadData(null, true);
      }
    })
  }
  componentWillUnmount() {
    EventBus.getInstance().removeListener(this.favChangeListener);
    EventBus.getInstance().removeListener(this.bottomTabChangeListener);
  }

  loadData(loadMore, refreshFav) {
    const { onLoadPopData, onLoadMorePopData, refPopFav } = this.props;
    const store = this._getStore();
    const url = this.getUrl(this.storeName);

    if (loadMore) {
      onLoadMorePopData(this.storeName, ++store.pageIndex, PAGE_SIZE, store.items, favDao, callBack => {
        // this.refs.toast.show('没有更多数据了');
        ToastAndroid.showWithGravity(
          "没有更多数据了",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      });
    } else if (refreshFav) {
      refPopFav(this.storeName, store.pageIndex, PAGE_SIZE, store.items, favDao)
    } else {
      onLoadPopData(this.storeName, url, PAGE_SIZE, favDao);
    }
  }
  _getStore() {
    const { popData } = this.props;
    let storeData = popData[this.storeName];//动态获取state
    if (!storeData) {
      storeData = {
        items: [],
        originalData: [],
        isLoading: false,
        hideLoadingMore: true,
      }
    }
    return storeData;
  }

  getUrl(key) {
    return URL + key + QUERY_STR;
  }
  renderItemView(data) {
    const showString = data.item;
    // return <View style={{ marginBottom: 20 }}>
    //   <Text style={{ fontSize: 8, color: '#123', backgroundColor: '#fac' }}>
    //     {JSON.stringify(showString)}
    //     {/* {showString} */}
    //   </Text>
    // </View>
    return <PopItem
      projectModel={showString}
      onSelect={(callBack) => {
        NavigationUtil.goPage({
          projectModel: showString,
          flag: FLAG_STORE.Flag_pop,
          callBack,
        }, 'DetailPage')
      }
      }
      onFavorite={(item, isfav) => FavoriteUtil.onFavorite(favDao, item, isfav, FLAG_STORE.Flag_pop)}
    />
  }

  genFooter() {
    return this._getStore().hideLoadingMore ? null :
      <View style={styles.footerContainer}>
        <ActivityIndicator style={styles.indicator} />
        <Text>加载更多数据。。。</Text>
      </View>
  }

  render() {
    const { popData } = this.props;
    // let storeData = popData[this.storeName];//动态获取state
    // if (!storeData) {
    //   storeData = {
    //     items: [],
    //     isLoading: false
    //   }
    // }
    let storeData = this._getStore();
    return (
      <View style={styles.container}>


        <FlatList
          data={storeData.originalData}
          renderItem={data => this.renderItemView(data)}
          keyExtractor={item => item.item.id + ""}
          refreshControl={
            <RefreshControl
              title={'loading'}
              titleColor={'red'}
              colors={['red', 'blue', 'green']}
              refreshing={storeData.isLoading}
              onRefresh={() => this.loadData()}
              tintColor={'black'}
            />
          }
          ListFooterComponent={() => this.genFooter()}//底部布局
          onEndReached={() => {//列表滚动到底部回调
            setTimeout(() => {//确保onMomentumScrollBegin在之前运行，设置标志位正常
              if (this.canLoadMore) {//会被调两次，所以加标志位
                console.log('-----onEndReached------')
                this.loadData(true);
                this.canLoadMore = false;
              }
            }, 100)
          }}
          onMomentumScrollBegin={() => {//解决被调两次的问题
            console.log('-----onEndReached---onMomentumScrollBegin---')
            this.canLoadMore = true;
          }}
          onEndReachedThreshold={0.1}//列表的长度和底部多长距离的比值
        />


        {/* <Text style={styles.welcome}>{tabLabel}</Text>
        <Text style={styles.instructions}
          onPress={() => {
            NavigationUtil.goPage(this.props, "DetailPage")
          }}
        >To get started, edit App.js</Text> */}


        <Toast
          ref={'toast'}
          positon={'center'}
        />

      </View>
    );
  }
}

const mapStateToProps = state => ({
  popData: state.popData,//需要跟combineReducers中的一致
});
const mapDispatchToProps = dispatch => ({
  onLoadPopData: (storeName, url, pageSize, favDao) => dispatch(actions.onLoadPopData(storeName, url, pageSize, favDao)),
  onLoadMorePopData: (storeName, pageInde, pageSize, dataArray, favDao, callBack) => dispatch(actions.onLoadMorePopData(storeName, pageInde, pageSize, dataArray, favDao, callBack)),
  refPopFav: (storeName, pageInde, pageSize, dataArray, favDao) => dispatch(actions.refPopFav(storeName, pageInde, pageSize, dataArray, favDao))
})

const PopTabPage = connect(mapStateToProps, mapDispatchToProps)(PopTab)

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
    backgroundColor: '#789',
    height: 30,
    alignItems: 'center',
    // padding: 0,
  },
  tab_indicator: {
    height: 1,
    backgroundColor: 'white'

  },
  label: {
    fontSize: 13,
    color: '#987654',
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
