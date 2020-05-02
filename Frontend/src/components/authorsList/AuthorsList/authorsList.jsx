import React from 'react';

import authorService from 'services/authorService';
import Icon from 'components/common/Icon/icon';
import AuthorsListItem from 'components/authorsList/AuthorsListItem/authorsListItem';

import './authorsList.scss';

export default class AuthorsList extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            authors: []
        };
    }

    componentDidMount = async () => {
        const authors = await authorService.get();
        if (authors) {
            this.setState({ authors });
        }
    }

    renderAuthors() {
        return this.state.authors.map((author) => (<AuthorsListItem author={author} key={author.id} />));
    }

    render() {
        return (
            <>
                <div className="authors-list">
                    <h1 className="authors-list__title">Authors</h1>
                    <div className="authors-list__list">
                        {
                            this.renderAuthors()
                        }
                    </div>
                </div>
                {this.state.isLoading && (
                    <div className="authors-list__preloader">
                        <Icon iconClassName="authors-list__preloader-icon" icon={preloader} />
                    </div>
                )}
            </>
        );
    }
}
