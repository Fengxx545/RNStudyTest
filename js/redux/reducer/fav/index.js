import Types from '../../action/types'

const defaultState = {
}
/**
 * 数据结构树
 * fav{
 *   popular:{
 *    originalData:[],
 *    isLoading:false
 *   },
 *   trending:{
 *    originalData:[],
 *    isLoading:false
 *   },
 *   ...
 * }
 * @param {*} state 
 * @param {*} action 
 */
export default function onAction(state = defaultState, action) {
  switch (action.type) {
    case Types.FAV_REFRESH:
      return {
        ...state,//复制原来的state
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: true
        }
      };
    case Types.FAV_LOAD_SUCCESS:
      return {
        ...state,//复制原来的state
        [action.storeName]: {
          ...state[action.storeName],
          originalData: action.originalData,
          isLoading: false,
        }
      };
    case Types.FAV_LOAD_FAIL:
      return {
        ...state,//复制原来的state
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: false
        }
      };
    
    default:
      return state;
  }
}