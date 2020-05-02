import api from 'helpers/requestHelper';
import serviceUrls from 'constants/serviceUrls';

async function get() {
    const authors = await api.get(serviceUrls.authorUrls.get);
    return authors;
}

async function getById(id) {
    const author = await api.get(serviceUrls.authorUrls.getById(id));
    return author;
}

async function add(item) {
    const result = await api.post(serviceUrls.authorUrls.add, item);
    return result;
}

async function update(item) {
    const result = await api.put(serviceUrls.authorUrls.update, item);
    return result;
}

export default {
    get,
    getById,
    add,
    update
};
