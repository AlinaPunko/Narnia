import api from 'helpers/requestHelper';
import serviceUrls from 'constants/serviceUrls';


function getUser(id) {
    return api.get(serviceUrls.userUrls.getUser(id));
}

function updateUser(user) {
    return api.put(serviceUrls.userUrls.updateUser, user);
}

function signOut() {
    return api.get(serviceUrls.userUrls.signOut);
}

export default { getUser, updateUser, signOut };
