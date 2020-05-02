import localStorageHelper from 'helpers/localStorageHelper';

function get(url) {
    return fetch(url, {
        method: 'GET',
        accept: 'application/json',
        credentials: 'include',
        headers: new Headers({
            'x-access-token': localStorageHelper.getToken()
        })
    })
        .then(async (response) => {
            if (response.status !== 200) {
                const error = new Error(response.statusText);
                error.code = response.status;
                error.message = await response.json();
                return error;
            }
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return response.json();
            }
            return response.text();
        })
        .catch((error) => new Error(`Network Error!${error}`));
}

function post(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'x-access-token': localStorageHelper.getToken()
        }),
        accept: 'application/json',
        credentials: 'include',
        body: JSON.stringify(data)
    })
        .then(async (response) => {
            if (response.status !== 200) {
                const error = new Error(response.statusText);
                error.code = response.status;
                error.message = await response.json();
                return error;
            }

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return response.json();
            }
            return response.text();
        })
        .catch((error) => new Error(`Network Error!${error}`));
}

function put(url, data) {
    return fetch(url, {
        method: 'PUT',
        headers: new Headers({
            'Content-Type': 'application/json',
            'x-access-token': localStorageHelper.getToken()
        }),
        accept: 'application/json',
        credentials: 'include',
        body: JSON.stringify(data)
    })
        .then(async (response) => {
            if (response.status !== 200) {
                const error = new Error(response.statusText);
                error.code = response.status;
                error.message = await response.json();
                return error;
            }
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return response.json();
            }
            return response.text();
        })
        .catch((error) => new Error(`Network Error!${error}`));
}

function deleteRequest(url, data) {
    return fetch(url, {
        method: 'DELETE',
        headers: new Headers({
            'Content-Type': 'application/json',
            'x-access-token': localStorageHelper.getToken()
        }),
        accept: 'application/json',
        credentials: 'include',
        body: JSON.stringify(data)
    })
        .then(async (response) => {
            if (response.status !== 200) {
                const error = new Error(response.statusText);
                error.code = response.status;
                error.message = await response.json();
                return error;
            }
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return response.json();
            }
            return response.text();
        })
        .catch((error) => new Error(`Network Error!${error}`));
}

export default {
    get, post, put, deleteRequest
};
