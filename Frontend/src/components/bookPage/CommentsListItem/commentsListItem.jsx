import React from 'react';
import PropTypes from 'prop-types';

import './commentsListItem.scss';

export default class CommentsListItem extends React.PureComponent {
    static propTypes = {
        comment: PropTypes.shape({
            id: PropTypes.number.isRequired,
            userPhoto: PropTypes.string,
            userName: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired
        }).isRequired,
        key: PropTypes.number.isRequired
    };

    render() {
        const { comment, key } = this.props;

        return (
            <li key={key} className="comments-list-item">
                <div>
                    <div className="comments-list-item__user-name">{comment.userName}</div>
                    <img alt="User_image" className="comments-list-item__image" src={comment.userPhoto} />
                </div>
                <div className="comments-list-item__text">{comment.text}</div>
            </li>
        );
    }
}
