import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { ViewPropTypes, View, StatusBar, Text, StyleSheet, Platform, DeviceInfo } from 'react-native'



const NAV_BAR_HEIGHT_IOS = 44;//导航栏在iOS中的高度
const NAV_BAR_HEIGHT_ANDROID = 50;//导航栏在Android中的高度
const STATUS_BAR_HEIGHT = DeviceInfo.isIPhoneX_deprecated ? 0 : 20;//状态栏的高度

const StatusBarShape = {
  barStyle: PropTypes.oneOf(['ligth-content', 'default']),
  hidden: PropTypes.bool,
  backgroundColor: PropTypes.string,
}

export default class NavigationBar extends Component {

  //属性检查
  static propTypes = {
    style: ViewPropTypes.style,
    title: PropTypes.string,
    titleView: PropTypes.element,
    titleLayoutStyle: ViewPropTypes.style,
    hide: PropTypes.bool,
    statusBar: PropTypes.shape(StatusBarShape),
    rightBtn: PropTypes.element,
    leftBtn: PropTypes.element,
  }

  //设置默认属性
  static defaultProps = {
    statusBar: {
      barStyle: 'light-content',
      hidden: false,
    }
  };

  getButtonElement(data) {
    return (
      <View style={styles.navBarButton}>
        {data ? data : null}
      </View>
    )

  }

  render() {
    let statusBar = !this.props.statusBar.hidden ?
      <View style={styles.statusBar}>
        <StatusBar {...this.props.statusBar} />
      </View> : null;
    let titleView = this.props.titleView ? this.props.titleView :
      <Text ellipsizeMode='clip' numberOfLines={1} style={styles.title}>{this.props.title ? this.props.title : ''}</Text>;
    let content = this.props.hide ? null :
      <View style={styles.navBar}>
        {this.getButtonElement(this.props.leftBtn)}
        <View style={[styles.navBarTitleContainer, this.props.titleLayoutStyle]}>
          {titleView}
        </View>
        {this.getButtonElement(this.props.rightBtn)}
      </View>;
    return (
      <View style={[styles.container, this.props.style]}>
        {statusBar}
        {content}
      </View>
    )
  }

}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2196f3'
  },
  statusBar: {
    height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0,
  },
  title: {
    fontSize: 18,
    color: '#fa7',
  },
  navBarButton: {
    alignItems: 'center',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,

  },
  navBarTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 40,
    right: 40,
    // paddingRight:50,
    top: 0,
    bottom: 0
  }
})