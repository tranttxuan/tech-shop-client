import { SearchOutlined } from '@ant-design/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { searchAction } from '../../actions/searchActions';

function Search() {
    const search = useSelector(state => state.search);
    const { text } = search;
    const dispatch = useDispatch();
    const history = useHistory();

    const handleChange = (e) => {
        dispatch(searchAction(e.target.value));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/shop?${text}`);
    }
    return (
        <form action="post" onSubmit={handleSubmit} className='form-inline my-2 my-lg-0' >
            <input
                type="search"
                className='form-control mr-sm-2'
                placeholder='Search'
                value={text}
                onChange={handleChange} />
            <SearchOutlined
                onClick={handleSubmit}
                style={{ cursor: 'pointer' }} />
        </form>
    )
}

export default Search
