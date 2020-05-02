const SHOPPING_CART = 'shoppingCarts';
const TOKEN = 'token';

function addToken(token) {
    localStorage.setItem(TOKEN, token);
}

function deleteToken() {
    localStorage.setItem(TOKEN, null);
}

function getToken() {
    return localStorage.getItem(TOKEN);
}

function add(item) {
    let existingEntries = JSON.parse(localStorage.getItem(SHOPPING_CART));
    if (!existingEntries || existingEntries.length === 0) {
        existingEntries = [];
    }
    const user = existingEntries.find((entry) => entry.userId === item.userId);
    let newEntry;
    if (!user) {
        newEntry = {
            userId: item.userId,
            books: [
                {
                    bookId: item.bookId,
                    amount: 1
                }
            ]
        };
        existingEntries.unshift(newEntry);
    } else {
        const userBooks = user.books.find((entry) => entry.bookId === item.bookId);
        if (!userBooks) {
            existingEntries.find((entry) => entry.userId === item.userId).books.unshift({
                bookId: item.bookId,
                amount: 1
            });
        } else {
            existingEntries.find((entry) => entry.userId === item.userId)
                .books.find((book) => book.bookId === item.bookId).amount++;
        }
    }

    localStorage.setItem(SHOPPING_CART, JSON.stringify(existingEntries));
}

function getItems() {
    const existingEntries = JSON.parse(localStorage.getItem(SHOPPING_CART));
    if (!existingEntries || existingEntries.length === 0) {
        return [];
    }
    return existingEntries;
}

function getAmount(item) {
    const existingEntries = JSON.parse(localStorage.getItem(SHOPPING_CART));
    if (!existingEntries || existingEntries.length === 0) {
        return 0;
    }
    const userBooks = existingEntries.find((entry) => entry.userId === item.userId);
    if (!userBooks) {
        return 0;
    }

    const bookInfo = existingEntries.find((entry) => entry.userId === item.userId)
        .books.find((book) => book.bookId === item.bookId);
    if (bookInfo) {
        return bookInfo.amount;
    }
    return 0;
}

function getItemsById(id) {
    const existingEntries = JSON.parse(localStorage.getItem(SHOPPING_CART));
    if (!existingEntries || existingEntries.length === 0) {
        return [];
    }
    return existingEntries.filter((item) => item.userId === id);
}

function deleteItem(item) {
    const existingEntries = JSON.parse(localStorage.getItem(SHOPPING_CART));
    if (!existingEntries || existingEntries.length === 0) {
        return;
    }
    const user = existingEntries.find((entry) => entry.userId === item.userId);
    const userBooks = user.books.find((entry) => entry.bookId === item.bookId);
    if (userBooks.amount > 1) {
        existingEntries.find((entry) => entry.userId === item.userId)
            .books.find((book) => book.bookId === item.bookId).amount--;
    } else {
        if (user.books.length > 1) {
            existingEntries.find((entry) => entry.userId === item.userId).books.splice(user.books.indexOf(user.books.find((book) => book.Id == item.bookId)), 1)
        } else {
            existingEntries.splice(existingEntries.indexOf(existingEntries.find((element) => element.userId === item.userId), 1));
        }
    }

    localStorage.setItem(SHOPPING_CART, JSON.stringify(existingEntries));
}

export default {
    add, deleteItem, getItems, getItemsById, getAmount, addToken, deleteToken, getToken
};
