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
    case Types.POP_REFRESH:
      return {
        ...state,//复制原来的state
        [action.storeName]: {
          ...state[action.storeName],
          hideLoadingMore: true,
          isLoading: true
        }
      };
    case Types.POP_LOAD_SUCCESS:
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
    case Types.POP_LOAD_FAIL:
      return {
        ...state,//复制原来的state
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: false
        }
      };
    case Types.POP_LOAD_MORE_SUCCESS:
      return {
        ...state,//复制原来的state
        [action.storeName]: {
          ...state[action.storeName],
          originalData: action.originalData,
          hideLoadingMore: false,
          pageIndex: action.pageIndex
        }
      };
    case Types.POP_LOAD_MORE_FAIL:
      return {
        ...state,//复制原来的state
        [action.storeName]: {
          ...state[action.storeName],
          hideLoadingMore: true,
          pageIndex: action.pageIndex
        }
      };
    case Types.POP_REF_FAV:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          originalData: action.originalData,
        }
      }

    default:
      return state;
  }
}