import React from 'react';
import { withRouter } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import PropTypes from 'prop-types';

import Input from 'components/common/Input/input';
import signInValidationConfig from 'validationConfigs/signInValidationConfig';
import serviceWrapper from 'helpers/serviceWrapper';
import { UserContext } from 'store/context/userContext';
import signInService from 'services/signInService';
import redirectHelper from 'helpers/redirectHelper';
import localStorageHelper from 'helpers/localStorageHelper';

import './signInPage.scss';

class SignInPage extends React.PureComponent {
    static propTypes = {
        history: PropTypes.shape({
            length: PropTypes.number.isRequired,
            action: PropTypes.string.isRequired,
            location: PropTypes.shape({
                pathname: PropTypes.string.isRequired,
                search: PropTypes.string.isRequired,
                hash: PropTypes.string.isRequired
            }),
            push: PropTypes.func.isRequired
        }).isRequired
    }

    static contextType = UserContext;

    constructor(props, context) {
        super(props, context);

        this.validator = new SimpleReactValidator();
        this.errorFieldRef = React.createRef();
        this.state = {
            email: '',
            password: ''
        };
    }

    changePassword = (event) => {
        this.setState({
            password: event.target.value
        });
    }

    changeEmail = (event) => {
        this.setState({
            email: event.target.value
        });
    }

    signIn = async (e) => {
        e.preventDefault();
        if (this.validator.allValid()) {
            const userData = { ...this.state };
            const result = await serviceWrapper.callService(signInService.signIn, userData, this.errorFieldRef);

            if (result) {
                this.context.setUserId(result.id);
                this.context.setRole(result.role);
                localStorageHelper.addToken(result.token);
                redirectHelper.redirectToHomePage(this.props.history);
            }
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    renderValidationResult = () => {
        const messages = [
            this.validator.message(signInValidationConfig.email.fieldName, this.state.email, signInValidationConfig.email.rule),
            this.validator.message(signInValidationConfig.password.fieldName, this.state.password, signInValidationConfig.password.rule)
        ];

        return (
            <div className="sign-in-page__validation-result" ref={this.errorFieldRef}>
                {messages}
            </div>
        );
    }

    render() {
        return (
            <section className="sign-in-page">
                <h1 className="sign-in-page__title">Log In</h1>
                <form className="sign-in-page__form" onSubmit={this.signIn}>
                    <Input name="email" type="email" label="E-mail:" onChange={this.changeEmail} value={this.state.email} />
                    <Input name="password" type="password" label="Password:" onChange={this.changePassword} value={this.state.password} />
                    <button className="sign-in-page__form-button" type="submit">Sign In</button>
                    {
                        this.renderValidationResult()
                    }
                </form>
            </section>
        );
    }
}

export default withRouter(SignInPage);
