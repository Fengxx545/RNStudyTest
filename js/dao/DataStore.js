import { AsyncStorage } from 'react-native'
import GitHubTrending from 'GitHubTrending'


export const FLAG_STORE = { Flag_pop: 'Flag_pop', Flag_trd: 'Flag_trd' }

export default class DataStore {


  fetchData(url, flag) {
    return new Promise((resolve, reject) => {//先从本地获取，本地没有或者过期从服务器获取
      this.fetchLocalData(url)
        .then(wrapData => {
          if (wrapData && DataStore.checkTimestampValid(wrapData.timestamp)) {
            resolve(wrapData);
          } else {
            this.fetchNetData(url, flag)
              .then((data) => {
                resolve(this._wrapData(data))
              })
              .catch(error => {
                reject(error)
              })
          }
        })
        .catch(error => {
          this.fetchNetData(url, flag).then((data) => {
            resolve(this._wrapData(data));
          }).catch((error => {
            reject(error);
          }))
        })
    })
  }


  /**
   * 获取本地数据
   * @param url
   * @returns {Promise}
   */
  fetchLocalData(url) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(url, (error, result) => {
        if (!error) {
          try {
            resolve(JSON.parse(result));
          } catch (e) {
            reject(e);
            console.error(e);
          }
        } else {
          reject(error);
          console.error(error);
        }
      });
    });
  }

  /**
       * 获取网络数据
       * @param url
       * @returns {Promise}
       */
  fetchNetData(url, flag) {
    return new Promise((resolve, reject) => {
      if (flag !== FLAG_STORE.Flag_trd) {
        fetch(url)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Network response was not ok.');
          })
          .then((responseData) => {
            this.saveData(url, responseData)
            resolve(responseData);
          })
          .catch((error) => {
            reject(error);
          })
      } else {
        new GitHubTrending().fetchTrending(url)
          .then((data) => {
            if (!data) {
              throw new error("网络请求没有数据");
            }
            this.saveData(url, data)
            resolve(data);
          }).catch((error) => {
            reject(error);
          });
      }

    })

  }

  /**
     * 保存数据
     * @param url
     * @param data
     * @param callback
     */
  saveData(url, data, callback) {
    if (!url || !data) {
      return;
    }
    AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)), callback);
  }

  /**
   * 组装带有时间戳数据
   * @param {*} data 
   */
  _wrapData(data) {
    return { data: data, timestamp: new Date().getTime() };
  }

  /**
     * 检查timestamp是否在有效期内
     * @param timestamp 项目更新时间
     * @return {boolean} true 不需要更新,false需要更新
     */
  static checkTimestampValid(timestamp) {
    const currentDate = new Date();
    const targetDate = new Date();
    targetDate.setTime(timestamp);
    if (currentDate.getFullYear() !== targetDate.getFullYear()) return false;
    if (currentDate.getMonth() !== targetDate.getMonth()) return false;
    if (currentDate.getDate() !== targetDate.getDate()) return false;
    if (currentDate.getHours() !== targetDate.getHours()) return false;//有效期4个小时
    if (currentDate.getMinutes() - targetDate.getMinutes() > 2) return false;//有效期2分钟
    // if (currentDate.getMinutes() - targetDate.getMinutes() > 1)return false;
    return true;
  }
}