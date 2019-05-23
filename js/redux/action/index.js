import { onThemeChange } from './theme'
import { onLoadPopData, onLoadMorePopData,refPopFav } from './pop'
import { onLoadTrdData, onLoadMoreTrdData,onRefTrdFav } from './trd'
import { onFavLoad } from './fav'
/**
 * 在各个使用redux的界面使用
 */
export default {
  onThemeChange,
  onLoadPopData,
  onLoadMorePopData,
  onLoadTrdData,
  onLoadMoreTrdData,
  onFavLoad,
  refPopFav,
  onRefTrdFav,
}