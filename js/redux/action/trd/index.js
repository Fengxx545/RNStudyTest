import Types from '../types'
import DataStore, { FLAG_STORE } from '../../../dao/DataStore'
import { handleData, _originaModals } from '../ActionUtil'

/**
 * 异步action，必须要加 import thunk from 'redux-thunk'这个中间件
 * @param {*} storeName 
 * @param {*} url 
 * @param {*} pageSize 
 * 类似于Android MVC的m层
 */
export function onLoadTrdData(storeName, url, pageSize, favDao) {
  return dispatch => {
    dispatch({
      type: Types.TRD_REFRESH,
      storeName: storeName
    });
    let dataStore = new DataStore();
    dataStore.fetchData(url, FLAG_STORE.Flag_trd)
      .then(responseData => {
        if (responseData && responseData.data) {
          if (Array.isArray(responseData.data) && responseData.data.length > 0) {
            handleData(Types.TRD_LOAD_SUCCESS, dispatch, storeName, responseData, pageSize, favDao);
          } else if (Array.isArray(responseData.data.items) && responseData.data.items.length > 0) {
            handleData(Types.TRD_LOAD_SUCCESS, dispatch, storeName, responseData, pageSize, favDao);
          } else {
            dispatch({
              type: Types.TRD_LOAD_FAIL,
              storeName: storeName,
              error: '数据为空'
            })
          }
        } else {
          dispatch({
            type: Types.TRD_LOAD_FAIL,
            storeName: storeName,
            error: '请求失败'
          })
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: Types.TRD_LOAD_FAIL,
          storeName: storeName,
          error: error
        })
      })
  }
}

/**
 * 加载更多
 * @param {*} storeName 
 * @param {*} pageIndex 第几页
 * @param {*} pageSize 每页显示的数据
 * @param {*} dataArray 原始数据
 * @param {*} callBack 
 */
export function onLoadMoreTrdData(storeName, pageIndex, pageSize, dataArray = [], favDao, callBack) {
  return dispatch => {
    setTimeout(() => {
      //判断数据是否加载完
      if ((pageIndex - 1) * pageSize >= dataArray.length) {
        if (typeof callBack === 'function') {
          callBack('没有更多数据了')
        }
        dispatch({
          type: Types.TRD_LOAD_MORE_FAIL,
          storeName: storeName,
          error: '没有更多数据了',
          pageIndex: --pageIndex,
          originalData: dataArray
        })
      } else {
        let max = pageIndex * pageSize > dataArray.length ? dataArray.length : pageIndex * pageSize;
        _originaModals(dataArray.slice(0, max), favDao, originalModel => {
          dispatch({
            type: Types.TRD_LOAD_MORE_SUCCESS,
            storeName: storeName,
            pageIndex: pageIndex,
            originalData: originalModel
          })
        })

      }
    }, 500);
  }

}

export function onRefTrdFav(storeName, pageIndex, pageSize, dataArray = [], favDao) {
  return dispatch => {
    let max = pageIndex * pageSize > dataArray.length ? dataArray.length : pageIndex * pageSize;
    _originaModals(dataArray.slice(0, max), favDao, originalModel => {
      dispatch({
        type: Types.TRD_REF_FAV,
        storeName: storeName,
        pageIndex: pageIndex,
        originalData: originalModel
      })
    })
  }

}


// function handleData(dispatch, storeName, responseData, pageSize) {
//   let firstItems = [];
//   if (responseData && responseData.data && responseData.data.items) {
//     firstItems = responseData.data.items
//   }
//   dispatch({
//     type: Types.POP_LOAD_SUCCESS,
//     storeName: storeName,
//     items: firstItems,
//     originalData: pageSize > firstItems.length ? firstItems : firstItems.slice(0, pageSize),//第一次加载的数据
//     pageIndex: 1,
//   })
// }