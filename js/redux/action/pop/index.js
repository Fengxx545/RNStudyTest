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
export function onLoadPopData(storeName, url, pageSize, favDao) {
  return dispatch => {
    dispatch({
      type: Types.POP_REFRESH,
      storeName: storeName
    });
    let dataStore = new DataStore();
    dataStore.fetchData(url, FLAG_STORE.Flag_pop)
      .then(responseData => {

        if (responseData && responseData.data) {
          if (Array.isArray(responseData.data) && responseData.data.length > 0) {
            handleData(Types.POP_LOAD_SUCCESS, dispatch, storeName, responseData, pageSize, favDao);
          } else if (Array.isArray(responseData.data.items) && responseData.data.items.length > 0) {
            handleData(Types.POP_LOAD_SUCCESS, dispatch, storeName, responseData, pageSize, favDao);
          } else {
            dispatch({
              type: Types.POP_LOAD_FAIL,
              storeName: storeName,
              error: '数据为空'
            })
          }
        } else {
          dispatch({
            type: Types.POP_LOAD_FAIL,
            storeName: storeName,
            error: '请求失败'
          })
        }


      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: Types.POP_LOAD_FAIL,
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
export function onLoadMorePopData(storeName, pageIndex, pageSize, dataArray = [], favDao, callBack) {
  return dispatch => {
    setTimeout(() => {
      //判断数据是否加载完
      if ((pageIndex - 1) * pageSize >= dataArray.length) {
        if (typeof callBack === 'function') {
          callBack('没有更多数据了')
        }
        dispatch({
          type: Types.POP_LOAD_MORE_FAIL,
          storeName: storeName,
          error: '没有更多数据了',
          pageIndex: --pageIndex,
        })
      } else {
        let max = pageIndex * pageSize > dataArray.length ? dataArray.length : pageIndex * pageSize;
        _originaModals(dataArray.slice(0, max), favDao, originaModels => {
          dispatch({
            type: Types.POP_LOAD_MORE_SUCCESS,
            storeName: storeName,
            pageIndex: pageIndex,
            originalData: originaModels
          })
        })


      }
    }, 500);
  }

}

export function refPopFav(storeName, pageIndex, pageSize, dataArray = [], favDao) {
  return dispatch => {
    let max = pageIndex * pageSize > dataArray.length ? dataArray.length : pageIndex * pageSize;
    _originaModals(dataArray.slice(0, max), favDao, originaModels => {
      dispatch({
        type: Types.POP_REF_FAV,
        storeName: storeName,
        pageIndex: pageIndex,
        originalData: originaModels
      })
    })
  }

}
