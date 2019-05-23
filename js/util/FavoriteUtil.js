import {FLAG_STORE} from '../dao/DataStore'

export default class FavoriteUtil {

    /**
     * favoriteIcon单击回调函数
     * @param favoriteDao
     * @param item
     * @param isFavorite
     * @param flag
     */
    static onFavorite(favoriteDao, item, isFav, flag) {
        const key = flag === FLAG_STORE.Flag_trd ? item.fullName : item.id.toString();
        if (isFav) {
            favoriteDao.saveFavData(key, JSON.stringify(item));
        } else {
            favoriteDao.removeFavData(key);
        }
    }
}