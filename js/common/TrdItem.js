import React, { Component } from 'react'
import { TouchableOpacity, View, Text, Image, StyleSheet,Dimensions } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import HTMLView from 'react-native-htmlview';
import BaseItem from './BaseItem';

//style
const win = Dimensions.get('window');


export default class TrdItem extends BaseItem {


  render() {
    const { projectModel } = this.props;
    const { item } = projectModel;
    if (!item) {
      return null;
    }
    let description = '<p>' + item.description + '</p>';
    return (
      <TouchableOpacity
        onPress={() => this.onItemClick()}//回调出去
      >
        <View style={styles.container}>
          <Text style={styles.title} >
            {item.fullName}
          </Text>
          <HTMLView
            value={description}
            onLinkPress={(url) => {
            }}
            stylesheet={{
              p: styles.description,
              a: styles.description,
            }}
          />

          <Text style={styles.description}>
            {item.meta}
          </Text>
          <View style={styles.bottom_container}>
            <View style={styles.row}>
              <Text>
                Author:
              </Text>
              {item.contributors.map((result, i, arr) => {
                return <Image
                  key={i}
                  style={{ width: 20, height: 20, marginLeft: 2, }}
                  source={{ uri: arr[i] }}
                />
              })}

            </View>
            <View style={styles.row}>
              <Text>
                Stars:
              </Text>
              <Text>
                {item.starCount}
              </Text>
            </View>
            {/* <TouchableOpacity
              style={{ padding: 3 }}
              onPress={() => {

              }}
            >
              <AntDesign
                name="staro"
                size={20}
                color='#fa3e'
              />

            </TouchableOpacity> */}
            {this._favoriteIcon()}
          </View>
        </View>

      </TouchableOpacity>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:win.width,//如果只有一个，且宽度不够，就不能够铺满屏幕
    backgroundColor: '#f2f2f2',
    marginBottom: 3,
    marginTop: 3,
    marginLeft: 7,
    marginRight: 7,
    borderWidth: 0.5,
    borderRadius: 2,
    padding: 4,
    shadowColor: 'gray',
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 2

  },
  title: {
    fontSize: 14,
    marginBottom: 3,
    color: 'red'
  },
  description: {
    fontSize: 12,
    marginBottom: 3,
    color: 'green'
  },
  bottom_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})