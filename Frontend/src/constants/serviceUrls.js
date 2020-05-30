export default {
    bookUrls: {
        getAllBooks: '/Books',
        add: '/Books/Add',
        update: '/Books/Update',
        getBookById: (id) => `/Books/Get?id=${id}`,
        getComments: (id) => `/Books/Comments?id=${id}`
    },
    favoriteBookUrls: {
        addFavorite: '/FavoriteBooks/Add',
        getFavoritesByUserId: (userId) => `/FavoriteBooks/Get?userId=${userId}`,
        deleteFavorite: '/FavoriteBooks/Delete'
    },
    authorUrls: {
        get: '/Authors',
        getById: (id) => `/Authors/Get?id=${id}`,
        add: '/Authors/Add',
        update: '/Authors/Update'
    },
    categoryUrls: {
        get: '/Categories'
    },
    userUrls: {
        getUser: (id) => `/Users/Get?id=${id}`,
        updateUser: '/Users/Update',
        signIn: '/Users/Login',
        signUp: '/Users/Register',
        signOut: '/Users/Logout'
    },
    orderUrls: {
        add: '/Orders/Add'
    }
};
