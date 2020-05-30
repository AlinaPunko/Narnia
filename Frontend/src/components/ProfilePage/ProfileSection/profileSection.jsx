import React from 'react';
import { withRouter } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import PropTypes from 'prop-types';

import profileValidationConfig from 'validationConfigs/profileValidationConfig';
import userService from 'services/userService';
import serviceWrapper from 'helpers/serviceWrapper';
import { UserContext } from 'store/context/userContext';

import './profileSection.scss';

class ProfileSection extends React.PureComponent {
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
        }).isRequired
    }

    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.errorFieldRef = React.createRef();
        this.state = {
            photo: '',
            name: '',
            email: '',
            birthdate: '',
            address: '',
            phone: ''
        };
    }

    async componentDidMount() {
        const user = await userService.getUser(this.context.userId);
        this.setState({
            id: user.id,
            name: user.name,
            address: user.address,
            phone: user.phone,
            email: user.email,
            photo: user.photo,
            birthdate: user.birthdate ? user.birthdate.slice(0, 10) : ''
        });
    }

    deletePhoto = () => {
        this.setState({ photo: '' });
    }

    onNameChange = (e) => {
        this.setState({ name: e.target.value });
    }

    onEmailChange = (e) => {
        this.setState({ email: e.target.value });
    }

    onBirthdateChange = (e) => {
        this.setState({ birthdate: e.target.value.slice(0, 10) });
    }

    onAddressChange = (e) => {
        this.setState({ address: e.target.value });
    }

    onPhoneChange = (e) => {
        this.setState({ phone: e.target.value });
    }

    addPhoto = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/x-png,image/gif,image/jpeg';
        input.onchange = () => {
            const filesSelected = input.files;

            if (filesSelected.length > 0) {
                const fileToLoad = filesSelected[0];
                const fileReader = new FileReader();
                fileReader.onload = (fileLoadedEvent) => {
                    this.setState({ photo: fileLoadedEvent.target.result });
                };
                fileReader.readAsDataURL(fileToLoad);
            }
        };
        input.click();
    }

    save = async (e) => {
        e.preventDefault();
        if (this.validator.allValid()) {
            const userData = { ...this.state };
            await serviceWrapper.callService(userService.updateUser, userData, this.errorFieldRef);
            alert('The user was updated');
            this.props.history.push('/');
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    close = (e) => {
        e.preventDefault();
        this.props.history.push('/');
    }

    getValidationResult = () => {
        const messages = [
            this.validator.message(profileValidationConfig.email.fieldName, this.state.email, profileValidationConfig.email.rule),
            this.validator.message(profileValidationConfig.name.fieldName, this.state.name, profileValidationConfig.name.rule),
            this.validator.message(profileValidationConfig.phone.fieldName, this.state.phone, profileValidationConfig.phone.rule),
            this.validator.message(profileValidationConfig.address.fieldName, this.state.address, profileValidationConfig.address.rule)
        ];

        return (
            <div className="profile-section__validation-result" ref={this.errorFieldRef}>
                {messages}
            </div>
        );
    }

    render() {
        if (this.context.userId === '') {
            this.props.history.push('/login');
            return null;
        }

        return (
            <section className="profile-section">
                <h1 className="profile-section__title">Your profile</h1>
                <form className="profile-section__form">
                    <div className="profile-section__image-block">
                        <img
                            className="profile-section__user-image"
                            alt=""
                            src={this.state.photo}
                        />
                        <div>
                            <button className="profile-section__add-image-button" type="button" onClick={this.addPhoto}>
                                Add image
                            </button>
                            <button className="profile-section__delete-image-button" type="button" onClick={this.deletePhoto}>
                                Delete image
                            </button>
                        </div>
                    </div>
                    <div className="profile-section__user-info">
                        <div className="profile-section__field">
                            <label className="profile-section__field-title">Name</label>
                            <input
                                name="name"
                                type="text"
                                value={this.state.name}
                                className="profile-section__field-input"
                                onChange={this.onNameChange}
                            />
                        </div>

                        <div className="profile-section__field">
                            <label className="profile-section__field-title">E-mail</label>
                            <input
                                name="email"
                                type="email"
                                value={this.state.email}
                                className="profile-section__field-input"
                                disabled
                            />
                        </div>
                        <div className="profile-section__field">
                            <label className="profile-section__field-title">Birthdate</label>
                            <input
                                name="birthdate"
                                type="date"
                                value={this.state.birthdate}
                                className="profile-section__field-input"
                                onChange={this.onBirthdateChange}
                            />
                        </div>
                        <div className="profile-section__field">
                            <label className="profile-section__field-title">Address</label>
                            <input
                                name="address"
                                type="text"
                                value={this.state.address}
                                className="profile-section__field-input"
                                onChange={this.onAddressChange}
                            />
                        </div>
                        <div className="profile-section__field">
                            <label className="profile-section__field-title">Phone</label>
                            <input
                                name="phone"
                                type="tel"
                                pattern="375[0-9]{2}[0-9]{7}"
                                value={this.state.phone}
                                className="profile-section__field-input"
                                onChange={this.onPhoneChange}
                            />
                        </div>
                        {
                            this.getValidationResult()
                        }
                        <input type="submit" className="profile-section__save-button" onClick={this.save} value="Save" />
                        <input type="reset" className="profile-section__close-button" onClick={this.close} value="Close" />
                    </div>
                </form>
            </section>
        );
    }
}

export default withRouter(ProfileSection);
