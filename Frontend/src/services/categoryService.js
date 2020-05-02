import api from 'helpers/requestHelper';
import serviceUrls from 'constants/serviceUrls';

async function get() {
    const categories = await api.get(serviceUrls.categoryUrls.get);
    return categories;
}

export default {
    get
};
