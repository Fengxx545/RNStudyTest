import OriginaModel from "../../model/OriginaModel";
import Utils from "../../util/Utils";

export function handleData(type, dispatch, storeName, responseData, pageSize, favDao) {
  let firstItems = [];
  if (responseData && responseData.data) {
    if (Array.isArray(responseData.data)) {
      firstItems = responseData.data
    } else if (Array.isArray(responseData.data.items)) {
      firstItems = responseData.data.items
    }
  }
  let showItems = pageSize > firstItems.length ? firstItems : firstItems.slice(0, pageSize)//第一次加载的数据
  _originaModals(showItems, favDao, originaModels => {
    dispatch({
      type: type,
      storeName: storeName,
      items: firstItems,
      originalData: originaModels,
      pageIndex: 1,
    })
  })
  
}


export async function _originaModals(showItems, favDao, callBack) {
  let keys = [];
  try {
    keys = await favDao.getFavKeys();
  } catch (error) {
    console.log(error);
  }
  let originaModals = [];
  for (let i = 0, len = showItems.length; i < len; i++) {
    originaModals.push(new OriginaModel(showItems[i], Utils.checkFavorite(showItems[i], keys)))
  }

  if (typeof callBack === 'function') {
    callBack(originaModals)
  }
}