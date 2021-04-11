import { DeleteOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';
import AdminNav from '../../../components/nav/AdminNav'
import { createCategory, getCategories, removeCategory } from "../../../functions/category";


const CategoryCreate = () => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.user);
    const [categories, setCategories] = useState([]);
    const [keyword, setKeyword] = useState('')

    const loadingCategories = () => {
        getCategories()
            .then(list => {
                console.log(list.data)
                setCategories(list.data)
            })
            .catch(err => console.log(err))
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createCategory({ name }, user.token)
            .then(res => {
                setLoading(false);
                setName('');
                toast.success(`${res.data.name} is created`);
                loadingCategories();
            })
            .catch(error => {
                setLoading(false);
                toast.error(error.message)
            })
    }

    const handleRemove = (slug, name) => {
        const answer = window.confirm(`Are you sure to delete ${name} category?`);
        if (answer) {
            setLoading(true)
            removeCategory(slug, user.token)
                .then(res => {
                    toast.success(`${name} deleted`)
                    setLoading(false);
                    loadingCategories();
                })
                .catch(err => {
                    setLoading(false)
                    toast.error(err.message)
                })
        }
    }


    const searched = (keyword) => (cat) => cat.name.toLowerCase().includes(keyword)

    useEffect(() => {
        loadingCategories();
    }, [])

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading
                        ? <h4 className="text-danger"> <LoadingOutlined />Loading ... </h4>
                        : <h4>Create Category</h4>}
                    <CategoryForm
                        name={name}
                        handleSubmit={handleSubmit}
                        setName={setName}
                    />
                    <LocalSearch
                        keyword={keyword}
                        setKeyword={setKeyword}
                    />
                    <br/>
                    <div>
                        {categories.filter(searched(keyword)).map(cat => (
                            <div key={cat._id} className="alert alert-primary flex-column">
                                {cat.name}
                                <span className="btn btn-sm float-right"
                                    onClick={e => handleRemove(cat.slug, cat.name)}>
                                    <DeleteOutlined className=" text-warning" />
                                </span>
                                <span className="btn btn-sm float-right">
                                    <Link to={`/admin/category/${cat.slug}`}>
                                        <EditOutlined className="text-danger" />
                                    </Link>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryCreate
