import api from 'helpers/requestHelper';
import serviceUrls from 'constants/serviceUrls';

async function add(userId, item) {
    const bookId = item.id;
    const result = await api.post(serviceUrls.favoriteBookUrls.addFavorite, {
        userId, bookId
    });
    return result;
}

async function getItems(userId) {
    const result = await api.get(serviceUrls.favoriteBookUrls.getFavoritesByUserId(userId));
    return result;
}

async function deleteItem(userId, item) {
    const bookId = item.id;
    const result = await api.post(serviceUrls.favoriteBookUrls.deleteFavorite, {
        userId, bookId
    });
    return result;
}

export default {
    add, deleteItem, getItems
};
