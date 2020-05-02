import { connect } from 'react-redux';

import { setFilterByAuthor } from 'store/actions';
import SearchAuthorBox from 'components/search/SearchAuthorBox/searchAuthorBox';

const mapStateToProps = (state) => ({
    searchAuthorQuery: state.searchAuthorQuery
});

const mapDispatchToProps = (dispatch) => ({
    onChange: (searchAuthorQuery) => dispatch(setFilterByAuthor(searchAuthorQuery))
});


export default connect(
    mapStateToProps, mapDispatchToProps
)(SearchAuthorBox);
