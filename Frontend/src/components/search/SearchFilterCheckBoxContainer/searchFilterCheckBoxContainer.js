import { connect } from 'react-redux';

import { setCategory } from 'store/actions';

import SearchFilterCheckBox from 'components/search/SearchFilterCheckBox/searchFilterCheckBox';

const mapStateToProps = (state) => ({
    shouldInclude: state.isChecked,
    category: state.category
});

const mapDispatchToProps = (dispatch) => ({
    onInput: (shouldInclude, category) => dispatch(setCategory(shouldInclude, category))
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchFilterCheckBox);
