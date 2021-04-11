import { DeleteOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';
import AdminNav from '../../../components/nav/AdminNav'
import { getCategories } from '../../../functions/category';
import { createSub, getSubs, removeSub } from '../../../functions/sub';



const SubCreate = () => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.user);
    const [subs, setSubs] = useState([]);
    const [keyword, setKeyword] = useState('')
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("")

    const loadingSubs = () => {
        getSubs()
            .then(list => setSubs(list.data))
            .catch(err => console.log(err))
    }


    const loadingCategories = () => {
        getCategories()
            .then(list => setCategories(list.data))
            .catch(err => console.log(err))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createSub({ name, parent:category }, user.token)
            .then(res => {
                setLoading(false);
                setName('');
                toast.success(`${res.data.name} is created`);
                loadingSubs();
            })
            .catch(error => {
                setLoading(false);
                toast.error(error.message)
            })
    }

    const handleRemove = (slug, name) => {
        const answer = window.confirm(`Are you sure to delete ${name} sub category?`);
        if (answer) {
            setLoading(true)
            removeSub(slug, user.token)
                .then(res => {
                    toast.success(`${name} deleted`)
                    setLoading(false);
                    loadingSubs();
                })
                .catch(err => {
                    setLoading(false)
                    toast.error(err.message)
                })
        }
    }


    const searched = (keyword) => (cat) => cat.name.toLowerCase().includes(keyword)

    useEffect(() => {
        loadingSubs();
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
                        : <h4>Create Sub Category</h4>}

                    <div className="pb-4">
                        <label>Category</label>
                        <select
                            name="category"
                            className="form-control"
                            onChange={e => setCategory(e.target.value)}
                        >
                            <option>Please select</option>
                            {categories.length > 0 && categories.map(cat =>
                                <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                        </select>
                    </div>
                    <CategoryForm
                        name={name}
                        handleSubmit={handleSubmit}
                        setName={setName}
                    />
                    <LocalSearch
                        keyword={keyword}
                        setKeyword={setKeyword}
                    />
                    <br />
                    <div>
                        {subs.filter(searched(keyword)).map(cat => (
                            <div key={cat._id} className="alert alert-primary flex-column">
                                {cat.name}
                                <span className="btn btn-sm float-right"
                                    onClick={e => handleRemove(cat.slug, cat.name)}>
                                    <DeleteOutlined className=" text-warning" />
                                </span>
                                <span className="btn btn-sm float-right">
                                    <Link to={`/admin/sub/${cat.slug}`}>
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

export default SubCreate
