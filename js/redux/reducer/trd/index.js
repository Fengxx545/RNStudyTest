import Types from '../../action/types'

const defaultState = {
}
/**
 * 数据结构树
 * pop{
 *   java:{
 *    items:[],
 *    isLoading:false
 *   },
 *   ios:{
 *    items:[],
 *    isLoading:false
 *   },
 *   ...
 * }
 * @param {*} state 
 * @param {*} action 
 */
export default function onAction(state = defaultState, action) {
  switch (action.type) {
    case Types.TRD_REFRESH:
      return {
        ...state,//复制原来的state
        [action.storeName]: {
          ...state[action.storeName],
          hideLoadingMore: true,
          isLoading: true
        }
      };
    case Types.TRD_LOAD_SUCCESS:
      return {
        ...state,//复制原来的state
        [action.storeName]: {
          ...state[action.storeName],
          items: action.items,//哪里来的？？？？？？？？？？？
          originalData: action.originalData,
          isLoading: false,
          hideLoadingMore: false,
          pageIndex: action.pageIndex
        }
      };
    case Types.TRD_LOAD_FAIL:
      return {
        ...state,//复制原来的state
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: false,
          error: action.error
        }
      };
    case Types.TRD_LOAD_MORE_SUCCESS:
      return {
        ...state,//复制原来的state
        [action.storeName]: {
          ...state[action.storeName],
          originalData: action.originalData,
          hideLoadingMore: false,
          pageIndex: action.pageIndex
        }
      };
    case Types.TRD_LOAD_MORE_FAIL:
      return {
        ...state,//复制原来的state
        [action.storeName]: {
          ...state[action.storeName],
          hideLoadingMore: true,
          pageIndex: action.pageIndex
        }
      };
    case Types.TRD_REF_FAV:
      return {
        ...state,//复制原来的state
        [action.storeName]: {
          ...state[action.storeName],
          originalData: action.originalData,
        }
      };

    default:
      return state;
  }
}