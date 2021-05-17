import { SearchOutlined } from '@ant-design/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Search() {
    const search = useSelector(state => state.search);
    const { text } = search;
    const dispatch = useDispatch();
    const history = useHistory();

    const handleChange = (e) => {

    };

    const handleSubmit = (e) => {
        e.preventDefault();

    }
    return (
        <form action="post" onSubmit={handleSubmit} className='' >
            <input type="search" className='' placeholder='Search' value={text} onChange={handleChange} />
            <SearchOutlined onClick={handleSubmit} style={{cursor:'pointer'}}/>
        </form>
    )
}

export default Search
