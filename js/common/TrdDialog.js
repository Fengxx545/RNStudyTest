import React, { Component } from 'react'
import { Modal, TouchableOpacity, Text, DeviceInfo, StyleSheet, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import TimeModel from '../model/TimeModel'

export const TimeSpans = [new TimeModel('今 天', 'since=daily'),
new TimeModel('本 周', 'since=weekly'), new TimeModel('本 月', 'since=monthly')]

export default class TrdDialog extends Component {


  constructor(props) {
    super(props)
    this.state = {
      isShow: false,
    }
  }

  show() {
    this.setState({
      isShow: true,
    })
  }

  dismiss() {
    this.setState({
      isShow: false
    })
  }

  render() {
    const { onClose, onSelect } = this.props;
    return (<Modal
      animationType='fade'
      transparent={true}
      visible={this.state.isShow}
      onRequestClose={() => onClose}>
      <TouchableOpacity
        style={styles.modalContainer}
        onPress={() => this.dismiss()}
      >
        <MaterialIcons
          name={'arrow-drop-up'}
          size={36}
          style={styles.arrow}
        />
        <View style={styles.content}>
          {TimeSpans.map((result, i, arr) => {
            return <TouchableOpacity
              key={i}
              onPress={() => onSelect(arr[i])}
              underlayColor='transparent'
            >
              <View style={styles.text_container}>
                <Text
                  style={styles.text}
                >{arr[i].showText}</Text>
              </View>
              {
                i !== TimeSpans.length - 1 ? <View
                  style={styles.line}
                /> : null
              }

            </TouchableOpacity>
          })}

        </View>

      </TouchableOpacity>

    </Modal>);

  }

}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    alignItems: 'center',
    paddingTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0
  },
  arrow: {
    marginTop: 30,
    color: 'white',
    padding: 0,
    margin: -18
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 3,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 3,
    paddingTop: 3,
  },
  text_container: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  line: {
    height: 0.3,
    backgroundColor: 'darkgray',
  },
  text: {
    fontSize: 16,
    color: 'black',
    fontWeight: '400',
    padding: 8,
    paddingLeft: 26,
    paddingRight: 26
  }
})