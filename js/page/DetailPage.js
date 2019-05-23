

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View,WebView } from 'react-native';
import NavigationBar from '../common/NavigationBar'
import ViewUtil from '../util/ViewUtil'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import NavigationUtil from '../navigator/NavigationUtil';
// import  WebView  from 'react-native-webview';
import BackPressComponent from '../common/BackPressComponent'
import favDao from '../dao/FavDao'



const TRENDING_URL = 'https://github.com/';

export default class DetailPage extends Component {

  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    const { projectModel, flag } = this.params;
    // this.favoriteDao = new FavoriteDao(flag);
    this.favDao = new favDao(flag);
    this.url = projectModel.item.html_url || TRENDING_URL + projectModel.item.fullName;
    const title = projectModel.item.full_name || projectModel.item.fullName;
    this.state = {
      title: title,
      url: this.url,
      canGoBack: false,
      // isFavorite:projectModel.isFavorite
      isFav: projectModel.isFav,
    };
    this.backPress = new BackPressComponent({ backPress: () => this.onBackPress() });
  }

  componentDidMount() {
    this.backPress.componentDidMount()
  }

  componentWillUnmount() {
    this.backPress.componentWillUnmount()
  }

  onFavoriteButtonClick() {
    const { projectModel, callBack } = this.params;
    const isFav = projectModel.isFav = !projectModel.isFav;
    this.setState({
      isFav: isFav,
    });
    let key = projectModel.item.fullName ? projectModel.item.fullName : projectModel.item.id.toString();
    if (projectModel.isFav) {
      this.favDao.saveFavData(key, JSON.stringify(projectModel.item));
    } else {
      this.favDao.removeFavData(key);
    }
    callBack(isFav);
  }

  renderRightButton() {
    return (<View style={{ flexDirection: 'row' }}>
      <TouchableOpacity
        onPress={() => this.onFavoriteButtonClick()}>
        <FontAwesome
          name={this.state.isFav ? 'star' : 'star-o'}
          // name={'star-o'}
          size={20}
          style={{ color: 'white', marginRight: 10 }}
        />
      </TouchableOpacity>
      {
        ViewUtil.getShareButton()
      }
      {/* {ViewUtil.getShareButton(() => {
                let shareApp = share.share_app;
                ShareUtil.shareboard(shareApp.content, shareApp.imgUrl, this.url, shareApp.title, [0, 1, 2, 3, 4, 5, 6], (code, message) => {
                    console.log("result:" + code + message);
                });
            })} */}
    </View>
    )
  }

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack,
      url: navState.url,
    })
  }

  onBackPress() {
    this.onBack();
    return true;
  }

  onBack() {
    if (this.state.canGoBack) {
      this.webView.goBack();
    } else {
      NavigationUtil.goBack(this.props);
    }
  }

  render() {
    const titleLayoutStyle = this.state.title.length > 20 ? { paddingRight: 30 } : null;
    const statusBar = {
      backgroundColor: 'red'
    }
    const navigationBar = <NavigationBar
      leftBtn={ViewUtil.getLeftBackButtonView(() => this.onBack())}
      rightBtn={this.renderRightButton()}
      title={this.state.title}
      titleLayoutStyle={titleLayoutStyle}
      statusBar={
        statusBar
      }
    />

    return (
      <View style={styles.container}>
        <View>
          {navigationBar}
        </View>
        <WebView
          ref={webView => this.webView = webView}
          startInLoadingState={true}
          onNavigationStateChange={(e) => this.onNavigationStateChange(e)}
          source={{ uri: this.state.url }}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  // welcome: {
  //   fontSize: 20,
  //   textAlign: 'center',
  //   margin: 10,
  // },
  // instructions: {
  //   textAlign: 'center',
  //   color: '#333333',
  //   marginBottom: 5,
  // },
});
