import api from 'helpers/requestHelper';
import serviceUrls from 'constants/serviceUrls';

function signIn(data) {
    return api.post(serviceUrls.userUrls.signIn, data);
}

export default { signIn };
