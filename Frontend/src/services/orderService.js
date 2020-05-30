import api from 'helpers/requestHelper';
import serviceUrls from 'constants/serviceUrls';

async function add(order) {
    const result = await api.post(serviceUrls.orderUrls.add, order);
    return result;
}

export default { add };
