import React, { Component } from 'react'
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { PropTypes } from 'prop-types';


export default class BaseItem extends Component {
  static propTypes = {
    projectModel: PropTypes.object,
    onSelect: PropTypes.func,
    onFavorite: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      isFav: this.props.projectModel.isFav,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const isFav = nextProps.projectModel.isFav;
    if (prevState.isFav !== isFav) {
      return {
        isFav: isFav,
      }
    }
    return null;
  }

  onItemClick() {
    this.props.onSelect(isFav => {
      this.setFavState(isFav);
    });
  }

  setFavState(isFav) {
    this.props.projectModel.isFav = isFav;
    this.setState({
      isFav: isFav
    })
  }

  onPressFavorite() {
    this.setFavState(!this.state.isFav)
    this.props.onFavorite(this.props.projectModel.item, !this.state.isFav)
  }

  _favoriteIcon() {
    const { theme } = this.props;
    return <TouchableOpacity
      style={{ padding: 6 }}
      underlayColor='transparent'
      onPress={() => this.onPressFavorite()}>
      <FontAwesome
        name={this.state.isFav ? 'star' : 'star-o'}
        size={26}
      // style={{color: theme.themeColor}}
      />
    </TouchableOpacity>
  }

}