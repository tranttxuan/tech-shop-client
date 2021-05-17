import { LoadingOutlined } from '@ant-design/icons';
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import CategoryForm from '../../../components/forms/CategoryForm';
import AdminNav from '../../../components/nav/AdminNav'
import { getCategory, updateCategory } from "../../../functions/category";


const CategoryUpdate = ({ history, match }) => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.user);

    const loadingCategory = useCallback(() => {
        getCategory(match.params.slug)
            .then(cat => setName(cat.data.name))
            .catch(err => console.log(err))
    }, [match.params.slug])

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        updateCategory(match.params.slug, { name }, user.token)
            .then(res => {
                setLoading(false);
                setName('');
                toast.success(`${res.data.name} is updated`);
                history.push("/admin/category");
            })
            .catch(error => {
                setLoading(false);
                toast.error(error.message)
            })
    }


    useEffect(() => {
        loadingCategory();
    }, [loadingCategory])

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

                </div>
            </div>
        </div>
    )
}

export default CategoryUpdate
