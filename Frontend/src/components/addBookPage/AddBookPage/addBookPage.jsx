import React from 'react';
import PropTypes from 'prop-types';
import SimpleReactValidator from 'simple-react-validator';

import { UserContext } from 'store/context/userContext';
import Input from 'components/common/Input/input';
import bookService from 'services/bookService';
import authorService from 'services/authorService';
import categoryService from 'services/categoryService';
import serviceWrapper from 'helpers/serviceWrapper';
import AddAuthorBlock from 'components/addBookPage/AddAuthorBlock/addAuthorBlock';
import AddCategoryBlock from 'components/addBookPage/AddCategoryBlock/addCategoryBlock';
import PhotoSelector from 'components/common/PhotoSelector/photoSelector';
import bookValidationConfig from 'validationConfigs/bookValidationConfig';

import './addBookPage.scss';

export default class AddBookPage extends React.Component {
    static propTypes = {
        history: PropTypes.shape({
            length: PropTypes.number.isRequired,
            action: PropTypes.string.isRequired,
            location: PropTypes.shape({
                pathname: PropTypes.string.isRequired,
                search: PropTypes.string.isRequired,
                hash: PropTypes.string.isRequired,
                key: PropTypes.string.isRequired
            }),
            push: PropTypes.func.isRequired
        }).isRequired,
        match: PropTypes.shape({
            path: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            isExact: PropTypes.bool.isRequired,
            params: PropTypes.shape({
                id: PropTypes.string.isRequired
            }).isRequired
        }).isRequired
    }

    static contextType = UserContext;

    constructor() {
        super();

        this.validator = new SimpleReactValidator();
        this.errorFieldRef = React.createRef();
        this.state = {
            id: 0,
            image: '',
            title: '',
            publishYear: '',
            pages: '',
            price: '',
            description: '',
            categories: [],
            authors: [],
            allAuthors: [],
            allCategories: []
        };
    }

    componentDidMount = async () => {
        this.getAllAuthors();
        this.getAllCategories();

        if (this.props.match.params.id !== '0') {
            const book = await bookService.getById(this.props.match.params.id);
            if (book) {
                this.setState({
                    id: book.id,
                    image: book.image,
                    title: book.name,
                    publishYear: book.publishYear,
                    pages: book.pagesNumber,
                    price: book.price,
                    description: book.description
                });
            }
        }
    }

    getAllAuthors = async () => {
        const result = await serviceWrapper.callService(authorService.get, null, null);
        if (result) {
            this.setState({ allAuthors: result });
        }
    }

    getAllCategories = async () => {
        const result = await serviceWrapper.callService(categoryService.get, null, null);
        if (result) {
            this.setState({ allCategories: result });
        }
    }

    deleteImage = () => {
        this.setState({ image: '' });
    }

    changeTitle = (event) => {
        this.setState({
            title: event.target.value
        });
    }

    changePrice = (event) => {
        this.setState({
            price: event.target.value
        });
    }

    changePages = (event) => {
        this.setState({
            pages: event.target.value
        });
    }

    changeDescription = (event) => {
        this.setState({
            description: event.target.value
        });
    }

    changePublishYear = (event) => {
        this.setState({
            publishYear: event.target.value
        });
    }

    changeImage = (image) => {
        this.setState({ image });
    }

    addAuthor = (author) => {
        const { authors } = this.state;
        authors.push(author);
        this.setState({ authors });
    }

    deleteAuthor = (author) => {
        const { authors } = this.state;
        authors.splice(authors.indexOf(author), 1);
        this.setState({ authors });
    }

    deleteCategory = (category) => {
        const { categories } = this.state;
        categories.splice(categories.indexOf(category), 1);
        this.setState({ categories });
    }

    addCategory = (category) => {
        const { categories } = this.state;
        categories.push(category);
        this.setState({ categories });
    }

    save = async (e) => {
        e.preventDefault();
        if (this.validator.allValid()) {
            const bookData = { ...this.state };
            let result;

            if (this.state.id === 0) {
                result = await serviceWrapper.callService(bookService.add, bookData, this.errorFieldRef);
            } else {
                result = await serviceWrapper.callService(bookService.update, bookData, this.errorFieldRef);
            }
 
            if (result) {
                redirectHelper.redirectToHomePage(this.props.history);
            }
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    renderValidationResult = () => {
        const messages = [
            this.validator.message(bookValidationConfig.title.fieldName, this.state.title, bookValidationConfig.title.rule),
            this.validator.message(bookValidationConfig.price.fieldName, this.state.price, bookValidationConfig.price.rule),
            this.validator.message(bookValidationConfig.image.fieldName, this.state.image, bookValidationConfig.image.rule),
            this.validator.message(bookValidationConfig.publishYear.fieldName, this.state.publishYear, bookValidationConfig.publishYear.rule),
            this.validator.message(bookValidationConfig.description.fieldName, this.state.description, bookValidationConfig.description.rule),
            this.validator.message(bookValidationConfig.pages.fieldName, this.state.pages, bookValidationConfig.pages.rule)
        ];

        return (
            <div className="add-book-page__validation-result" ref={this.errorFieldRef}>
                {messages}
            </div>
        );
    }

    render() {
        if (this.context.role !== 'admin') {
            return <h1 className="add-book-page__title">You don't have permission to do it</h1>;
        }
        return (
            <>
                <h1 className="add-book-page__title">Add or update book</h1>
                <section className="add-book-page">
                    <form className="add-book-page__form" onSubmit={this.save}>
                        <div className="add-book-page__image-block">
                            <img
                                className="add-book-page__book-image"
                                alt="book"
                                src={this.state.image}
                            />
                            <PhotoSelector onChange={this.changeImage} />
                            <button className="add-book-page__form-button" type="button" onClick={this.deleteImage}>
                                Delete photo
                            </button>
                            <Input
                                name="description"
                                type="text"
                                label="Description:"
                                onChange={this.changeDescription}
                                value={this.state.description}
                            />
                        </div>
                        <div>
                            <Input name="title" type="text" label="Title:" onChange={this.changeTitle} value={this.state.title} />
                            <Input name="price" type="text" label="Price:" onChange={this.changePrice} value={this.state.price} />
                            <Input name="pages" type="text" label="Pages:" onChange={this.changePages} value={this.state.pages} />
                            <Input name="publichYear" type="text" label="Publish Year:" onChange={this.changePublishYear} value={this.state.publishYear} />
                            {
                                this.renderValidationResult()
                            }
                        </div>
                        <div className="add-book-page__author-categories">
                            <AddCategoryBlock
                                categories={this.state.categories}
                                allCategories={this.state.allCategories}
                                addCategory={this.addCategory}
                                deleteCategory={this.deleteCategory}
                            />
                            <AddAuthorBlock
                                authors={this.state.authors}
                                allAuthors={this.state.allAuthors}
                                addAuthor={this.addAuthor}
                                deleteAuthor={this.deleteAuthor}
                            />
                        </div>
                        <button type="submit" className="add-book-page__form-button">Add book</button>
                    </form>
                </section>
            </>
        );
    }
}
