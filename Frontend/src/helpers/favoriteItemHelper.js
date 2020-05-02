function isFavorite(book, favoriteBooks) {
    const isInFavoriteBooks = (element) => element === book.id;
    return favoriteBooks.some(isInFavoriteBooks);
}

export default { isFavorite };
