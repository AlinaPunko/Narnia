import api from 'helpers/requestHelper';
import serviceUrls from 'constants/serviceUrls';

function signUp(data) {
    return api.post(serviceUrls.userUrls.signUp, data);
}

export default { signUp };
