
import { AsyncStorage } from 'react-native'

const FAVORITE_KEY_PREFIX = 'favorite_';
export default class FavDao {
  constructor(flag) {
    this.favKey = FAVORITE_KEY_PREFIX + flag
  }


  saveFavData(key, value, callBack) {
    AsyncStorage.setItem(key, value, (error, result) => {
      if (!error) {
        this.updateFavData(key, true);
      }
    });
  }

  updateFavData(key, isAdd) {
    AsyncStorage.getItem(this.favKey, (error, result) => {
      if (!error) {
        let favKeys = [];
        if (result) {
          favKeys = JSON.parse(result);
        }
        let index = favKeys.indexOf(key);
        if (isAdd) { //如果是添加，且key不存在，则添加
          if (index === -1) {
            favKeys.push(key);
          }
        } else {
          if (index !== -1) {
            favKeys.splice(index, 1);
          }
        }
        AsyncStorage.setItem(this.favKey, JSON.stringify(favKeys));//更新后的数据保存
      }
    })
  }

  getFavKeys() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(this.favKey, (error, result) => {

        if (!error) {
          try {
            resolve(JSON.parse(result))
          } catch (e) {
            reject(e)
          }
        } else {
          reject(error)
        }

      })
    });
  }

  removeFavData(key) {
    AsyncStorage.removeItem(key, (error, result) => {
      if (!error) {
        this.updateFavData(key, false);
      }
    })
  }

  getAllFavData() {
    return new Promise((resolve, reject) => {
      this.getFavKeys()
        .then((keys) => {
          let datas = [];
          if (keys) {
            AsyncStorage.multiGet(keys, (error, result) => {
              try {
                result.map((data, i, arr) => {
                  let key = arr[i][0];
                  let value = arr[i][1];
                  if (value) {
                    datas.push(JSON.parse(value));
                  }
                });
                resolve(datas)
              } catch (e) {
                reject(e)
              }
            })
          } else {
            resolve(datas)
          }
        }).catch((e) => {
          reject(e)
        })
    })
  }


}
