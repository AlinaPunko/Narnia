import SearchPage from 'components/search/SearchPage/searchPage';
import FavouritesList from 'components/favoritesPage/FavoritesList/favoritesList';
import BookPage from 'components/bookPage/BookInfoPage/bookInfoPage';
import AddBookPage from 'components/addBookPage/AddBookPage/addBookPage';
import SignInPage from 'components/SignInPage/signInPage';
import SignUpPage from 'components/SignUpPage/signUpPage';
import ProfileSection from 'components/ProfilePage/ProfileSection/profileSection';
import AuthorsList from 'components/authorsList/AuthorsList/authorsList';
import AddAuthorPage from 'components/AddAuthorPage/addAuthorPage';
import OrderPage from 'components/orderPage/OrderPage/orderPage';

export default {
    signInPage: {
        url: '/login',
        component: SignInPage
    },
    signUpPage: {
        url: '/join',
        component: SignUpPage
    },
    addBookPage: {
        url: '/book/:id',
        component: AddBookPage
    },
    favouritesList: {
        url: '/favourites',
        component: FavouritesList
    },
    searchPage: {
        url: '/',
        component: SearchPage
    },
    bookPage: {
        url: '/details/:id',
        component: BookPage
    },
    profilePage: {
        url: '/profile',
        component: ProfileSection
    },
    authorsPage: {
        url: '/authors',
        component: AuthorsList
    },
    authorPage: {
        url: '/author/:id',
        component: AddAuthorPage
    },
    orderPage: {
        url: '/order',
        component: OrderPage
    }
};
