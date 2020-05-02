import React from 'react';
import PropTypes from 'prop-types';

import bookService from 'services/bookService';
import serviceWrapper from 'helpers/serviceWrapper';
import { UserContext } from 'store/context/userContext';
import CommentListItem from 'components/bookPage/CommentsListItem/commentsListItem';

import './commentsSection.scss';

export default class CommentsSection extends React.PureComponent {
    static propTypes = {
        bookId: PropTypes.number.isRequired
    }

    static contextType = UserContext;

    constructor(props) {
        super(props);

        const connection = new WebSocket('ws://localhost:4000');

        this.state = {
            text: '',
            currentComments: [],
            connection,
            getNewComments: false,
            newComment: null
        };
    }

    componentDidMount = () => {
        this.loadComments();


        this.state.connection.addEventListener('message', (event) => {
            console.log('Message from server ', event.data);
            const data = JSON.parse(event.data);
            if (data.bookId === this.props.bookId) {
                const comment = {
                    id: data.id,
                    userImage: data.userPhoto,
                    userName: data.userName,
                    text: data.text
                };
                debugger;

                this.setState({
                    getNewComments: true,
                    newComment: comment
                });
                debugger;
            }
        });

        this.state.connection.onopen = () => { };
    }

    loadNewComment = () => {
        this.setState(
            {
                currentComments: this.state.currentComments.concat(this.state.newComment),
                newComment: null,
                getNewComments: false
            }
        );
        debugger;
        this.renderComments();
    }

    addComment = async () => {
        const comment = {
            bookId: this.props.bookId,
            authorId: this.context.userId,
            text: this.state.message
        };

        this.state.connection.send(JSON.stringify(comment));
    }

    changeComment = (e) => {
        this.setState({ message: e.target.value });
    }

    loadComments = async () => {
        const result = await serviceWrapper.callService(bookService.getComments, this.props.bookId, null);

        if (result) {
            this.setState({ currentComments: result });
        }
    }

    renderComments = () => {
        return this.state.currentComments.map((comment, index) => { return <CommentListItem key={index} comment={comment} />; });
    }

    render() {
        return (
            <section className="comments-section">
                <h2 className="comments-section__title">Comments</h2>
                <textarea
                    onChange={this.changeComment}
                    value={this.state.message}
                    placeholder="Enter your opinion here"
                    className="comments-section__comment"
                />
                <div className="comments-section__buttons">
                    <button type="button" className="comments-section__button" onClick={this.addComment}>Add</button>
                    {
                        this.state.getNewComments && (
                            <button type="button" className="comments-section__button" onClick={this.loadNewComment}>Load new comments</button>
                        )
                    }
                </div>
                <ul>
                    {this.renderComments()}
                </ul>
            </section>
        );
    }
}
