import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { UserContext } from 'store/context/userContext';
import routing from 'constants/routing';
import dateHelper from 'helpers/dateHelper';
import urlHelper from 'helpers/urlHelper';
import Icon from 'components/common/Icon/icon';

import edit from 'styles/icons/edit.svg';
import './authorsListItem.scss';

export default class AuthorsListItem extends React.PureComponent {
    static propTypes = {
        author: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            country: PropTypes.string.isRequired,
            birthdate: PropTypes.string.isRequired
        }).isRequired
    }

    static contextType = UserContext;

    render() {
        return (
            <UserContext.Consumer>
                {
                    ({ role }) => (
                        <li className="authors-list-item">
                            <h2 className="authors-list-item__name">{this.props.author.name}</h2>
                            <h3 className="authors-list-item__country">Country: {this.props.author.country}</h3>
                            <h3 className="authors-list-item__birthdate">Birthdate: {dateHelper.getDate(this.props.author.birthdate)}</h3>
                            {role === 'admin'
                                && (
                                    <Link to={urlHelper.getUrlWithParameter(routing.authorPage.url, /:id/, this.props.author.id)}>
                                        <button type="button" className="authors-list-item__button">
                                            <Icon icon={edit} iconClassName="authors-list-item__button-icon" />
                                        </button>
                                    </Link>
                                )}
                        </li>
                    )
                }
            </UserContext.Consumer>
        );
    }
}
