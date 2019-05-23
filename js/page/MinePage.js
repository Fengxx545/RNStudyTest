

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil'
import actions from '../redux/action'
import { connect } from 'react-redux'
import NavigationBar from '../common/NavigationBar'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { MORE_MENU } from '../common/Menu';
import GlobalStyles from '../res/GlobalStyles'
import ViewUtil from '../util/ViewUtil'


export default class MinePage extends Component {

  onClick(menu) {

  }
  getItem(menu) {
    return ViewUtil.getMenuItem(() => this.onClick(menu), menu, "#678");
  }


  render() {

    let statusBar = {
      backgroundColor: "#678",
      barStyle: 'light-content',
    };

    const navigationBar = <NavigationBar
      title='我的'
      statusBar={
        statusBar
      }
    />

    return (

      <View style={styles.container}>
        {navigationBar}
        <ScrollView>
          <TouchableOpacity
            style={styles.item}
            onPress={() => this.onClick(MORE_MENU.About)}>
            <View style={styles.about_left}>
              <Ionicons
                name={MORE_MENU.About.icon}
                size={40}
                style={{
                  marginRight: 10,
                  color: "#789",
                }}
              />
              <Text>GitHub Popular</Text>
            </View>
            <Ionicons
              name={'ios-arrow-forward'}
              size={16}
              style={{
                marginRight: 10,
                alignSelf: 'center',
                color: "red",
              }} />

          </TouchableOpacity>
          <View style={GlobalStyles.line} />
          {this.getItem(MORE_MENU.Tutorial)}
          <View style={GlobalStyles.line} />
          {/*趋势管理*/}
          <Text style={styles.groupTitle}>趋势管理</Text>
          {/*自定义语言*/}
          {this.getItem(MORE_MENU.Custom_Language)}
          {/*语言排序*/}
          <View style={GlobalStyles.line} />
          {this.getItem(MORE_MENU.Sort_Language)}
          <View style={GlobalStyles.line} />

          {/*最热管理*/}
          <Text style={styles.groupTitle}>最热管理</Text>
          {/*自定义标签*/}
          {this.getItem(MORE_MENU.Custom_Key)}
          {/*标签排序*/}
          <View style={GlobalStyles.line} />
          {this.getItem(MORE_MENU.Sort_Key)}
          {/*标签移除*/}
          <View style={GlobalStyles.line} />
          {this.getItem(MORE_MENU.Remove_Key)}
          <View style={GlobalStyles.line} />

          {/*设置*/}
          <Text style={styles.groupTitle}>设置</Text>
          {/*自定义主题*/}
          {this.getItem(MORE_MENU.Custom_Theme)}
          {/*关于作者*/}
          <View style={GlobalStyles.line} />
          {this.getItem(MORE_MENU.About_Author)}
          <View style={GlobalStyles.line} />
          {/*反馈*/}
          {this.getItem(MORE_MENU.Feedback)}
          <View style={GlobalStyles.line} />
          {this.getItem(MORE_MENU.CodePush)}


        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  about_left: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  item: {
    backgroundColor: 'white',
    padding: 10,
    height: 90,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  groupTitle: {
    flex:1,
    backgroundColor:'#9ab',
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 5,
    fontSize: 12,
    color: 'green'
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

// export default connect(mapStateToProps, mapDispatchToProps)(MinePage)