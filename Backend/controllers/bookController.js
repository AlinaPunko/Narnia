const express = require('express');
const bookRepository = require('../api/book')
const authorRepository = require('../api/author')
const categoryRepository = require('../api/category')
const bookToAuthorRepository = require('../api/bookToAuthor')
const bookToCategoryRepository = require('../api/bookToCategory')
const commentRepository = require('../api/comment')
const userRepository = require('../api/user');
const booksRoute = express.Router();
const middleware = require('../middlewares/checkJwt');

booksRoute.get('/', async (request, response) => {
    const books = await bookRepository.getAll();
    const booksToAuthors = await bookToAuthorRepository.getAll();
    const booksToCategories = await bookToCategoryRepository.getAll();

    const booksViewModel = [];
    for (const book of books) {
        const bookAuthors = booksToAuthors.filter(bookToAuthor => bookToAuthor.bookId == book.id);
        const bookCategories = booksToCategories.filter(bookToCategory => bookToCategory.bookId == book.id)
        let theAuthors = [];
        let theCategories = [];
        let bookViewModel;

        for (const element of bookAuthors) {
            const author = await authorRepository.getById(element.authorId)
            theAuthors.push(author[0].name)
        }

        for (const element of bookCategories) {
            const category = await categoryRepository.getById(element.categoryId)
            theCategories.push(category[0].category)
        }

        bookViewModel = book;
        bookViewModel.authors = theAuthors;
        bookViewModel.categories = theCategories;
        booksViewModel.push(bookViewModel);
    }
    response.json(booksViewModel);
});

booksRoute.get('/Get', async (request, response) => {
    const book = await bookRepository.getById(request.query.id);
    const booksToAuthors = await bookToAuthorRepository.getAll();
    const booksToCategories = await bookToCategoryRepository.getAll();

    const bookAuthors = booksToAuthors.filter(bookToAuthor => bookToAuthor.bookId == book[0].id);
    const bookCategories = booksToCategories.filter(bookToCategory => bookToCategory.bookId == book[0].id)
    let theAuthors = [];
    let theCategories = [];
    let bookViewModel;

    for (const element of bookAuthors) {
        const author = await authorRepository.getById(element.authorId)
        theAuthors.push(author[0].name)
    }

    for (const element of bookCategories) {
        const category = await categoryRepository.getById(element.categoryId)
        theCategories.push(category[0].category)
    }

    bookViewModel = book[0];
    bookViewModel.authors = theAuthors;
    bookViewModel.categories = theCategories;
    response.json(bookViewModel);
})

booksRoute.get('/Comments', async (request, response) => {
    const comments = await commentRepository.getByBookId(request.query.id);
    const commentsInfo = []
    for (const comment of comments) {
        const user = await userRepository.getById(comment.authorId);
        const commentInfo = {
            id: comment.id,
            text: comment.text,
            userName: user[0].name,
            userPhoto: user[0].photo
        };
        commentsInfo.push(commentInfo);
    }

    response.statusCode = 200;
    response.setHeader('content-type', 'application/json');
    response.json(commentsInfo);
})

booksRoute.post('/Add', middleware.checkToken, express.json({ type: '*/*' }), async (request, response) => {
    try {
        const book = request.body;
        const bookInfo = {
            name: book.title,
            description: book.description,
            image: book.image,
            pagesNumber: book.pages,
            publishYear: book.publishYear,
            price: book.price
        }
        const newBook = await bookRepository.add(bookInfo);

        for (const category of book.categories) {
            const theCategory = await categoryRepository.getByCategory(category);
            bookToCategoryRepository.add({
                bookId: newBook.id,
                categoryId: theCategory[0].id
            })
        }

        for (const author of book.authors) {
            console.log(author);
            const theAuthor = await authorRepository.getByName(author);
            console.log(theAuthor);
            bookToAuthorRepository.add({
                bookId: newBook.id,
                authorId: theAuthor[0].id
            })
        }

        response.statusCode = 200;
        response.setHeader('content-type', 'application/json');
        response.json('Ok')
    }
    catch (e) {
        console.log(e);
        response.statusCode = 400;
        response.setHeader('content-type', 'application/json');
        response.json({ message: 'Incorrect book data' });
    }
});

booksRoute.put('/Update', middleware.checkToken, express.json({ type: '*/*' }), (request, response) => {
    try {
        const book = request.body;
        const bookInfo = {
            id: book.id,
            name: book.title,
            description: book.description,
            image: book.image,
            pagesNumber: book.pages,
            publishYear: book.publishYear,
            price: book.price
        }

        const result = bookRepository.update(bookInfo);
        if (result) {
            response.statusCode = 400;
            response.setHeader('content-type', 'application/json');
            response.json({ message: 'Incorrect book data' });
        }
        else {
            response.statusCode = 200;
            response.setHeader('content-type', 'application/json');
            response.json('Ok')
        }
    }
    catch{
        response.statusCode = 400;
        response.setHeader('content-type', 'application/json');
        response.json({ message: 'Incorrect book data' });
    }
});

booksRoute.delete('/delete', (request, response) => {
    const book = request.body;
    booksRepository.delete(book);
    response.send("Ok");
});

module.exports = booksRoute;