import React from 'react';
import PropTypes from 'prop-types';
import SimpleReactValidator from 'simple-react-validator';

import { UserContext } from 'store/context/userContext';
import authorService from 'services/authorService';
import serviceWrapper from 'helpers/serviceWrapper';
import redirectHelper from 'helpers/redirectHelper';
import Input from 'components/common/Input/input';
import authorValidationConfig from 'validationConfigs/authorValidationConfig';
import dateHelper from 'helpers/dateHelper';

import './addAuthorPage.scss';

export default class AddAuthorPage extends React.PureComponent {
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

    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.errorFieldRef = React.createRef();
        this.state = {
            id: 0,
            name: '',
            country: '',
            birthdate: ''
        };
    }

    componentDidMount = async () => {
        if (this.props.match.params.id !== '0') {
            const author = await authorService.getById(this.props.match.params.id);
            if (author) {
                this.setState({
                    id: author.id,
                    name: author.name,
                    country: author.country,
                    birthdate: dateHelper.getDate(author.birthdate)
                });
            }
        }
    }

    changeName = (e) => {
        this.setState(
            { name: e.target.value }
        );
    }

    changeCountry = (e) => {
        this.setState(
            { country: e.target.value }
        );
    }

    changeBirthdate = (e) => {
        this.setState(
            { birthdate: e.target.value }
        );
    }

    save = async (e) => {
        e.preventDefault();
        if (this.validator.allValid()) {
            let result;
            if (this.state.id === 0) {
                result = await serviceWrapper.callService(authorService.add, this.state, this.errorFieldRef);
            }
            else {
                result = await serviceWrapper.callService(authorService.update, this.state, this.errorFieldRef);
            }
            if (result) {
                alert('Author has been successfilly added/updated');
                redirectHelper.redirectToHomePage(this.props.history);
            }
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    renderValidationResult = () => {
        const messages = [
            this.validator.message(authorValidationConfig.name.fieldName, this.state.name, authorValidationConfig.name.rule),
            this.validator.message(authorValidationConfig.country.fieldName, this.state.country, authorValidationConfig.country.rule),
            this.validator.message(authorValidationConfig.birthdate.fieldName, this.state.birthdate, authorValidationConfig.birthdate.rule)
        ];

        return (
            <div className="add-author-page__validation-result" ref={this.errorFieldRef}>
                {messages}
            </div>
        );
    }

    render() {
        if (this.context.role !== 'admin') {
            return <h1 className="add-author-page__title">You don't have permission to do it</h1>;
        }

        return (
            <div className="add-author-page">
                <h1 className="add-author-page__title">Add or update author</h1>
                <form method="post" className="add-author-page__form" onSubmit={this.save}>
                    <Input name="name" type="text" label="Name:" onChange={this.changeName} value={this.state.name} />
                    <Input name="country" type="text" label="Country:" onChange={this.changeCountry} value={this.state.country} />
                    <Input name="pages" type="date" label="Birthdate:" onChange={this.changeBirthdate} value={this.state.birthdate} />
                    <button type="submit" className="add-author-page__form-button" onClick={this.save}>Add author</button>
                    {
                        this.renderValidationResult()
                    }
                </form>
            </div>
        );
    }
}
