import React from 'react';

export const UserContext = React.createContext({
    userId: '',
    favoriteBooks: [],
    role: '',
    setUserId: () => { },
    setFavoriteBooks: () => [],
    setRole: () => { }
});
