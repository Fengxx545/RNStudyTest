import Types from '../types'
import DataStore, { FLAG_STORE } from '../../../dao/DataStore'
import { handleData, _originaModals } from '../ActionUtil'
import FavDao from '../../../dao/FavDao';
import OriginaModel from '../../../model/OriginaModel';



export function onFavLoad(flag, isShowLoading) {

  return dispatch => {
    if (isShowLoading) {
      dispatch({ type: Types.FAV_REFRESH, storeName: flag });
    }

    let dataStore = new DataStore();
    new FavDao(flag).getAllFavData()
      .then(items => {
        let resultData = [];
        for (let index = 0; index < items.length; index++) {
          resultData.push(new OriginaModel(items[index], true));
        }
        dispatch({ type: Types.FAV_LOAD_SUCCESS, originalData: resultData, storeName: flag });
      })
      .catch(e => {
        console.log(e)
        dispatch({ type: Types.FAV_LOAD_FAIL, error: e, storeName: flag });

      })
  }

}