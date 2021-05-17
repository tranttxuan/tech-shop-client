import React, { useState, useEffect, useCallback } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import { updateSub, getSub } from "../../../functions/sub";
import CategoryForm from "../../../components/forms/CategoryForm";


const SubUpdate = ({ match, history }) => {
    const user = useSelector(state => state.user);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [parent, setParent] = useState("");

    const loadCategories = useCallback(() => {
        getCategories()
            .then((cat) => setCategories(cat.data))
            .catch(err => console.log(err))
    }, []);

    const loadSub = useCallback(() => {
        getSub(match.params.slug)
            .then((s) => {
                setName(s.data.sub.name);
                setParent(s.data.parent);
            })
            .catch(err => console.log(err))
    }, [match.params.slug])

    useEffect(() => {
        loadCategories();
        loadSub();
    }, [loadCategories, loadSub]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name);
        setLoading(true);
        updateSub(match.params.slug, { name, parent }, user.token)
            .then((res) => {
                // console.log(res)
                setLoading(false);
                setName("");
                toast.success(`"${res.data.name}" is updated`);
                history.push("/admin/sub");
            })
            .catch((err) => {
                setLoading(false);
                toast.error(err.response.data);
            });
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading ? (
                        <h4 className="text-danger">Loading..</h4>
                    ) : (
                        <h4>Update sub category</h4>
                    )}

                    <div className="form-group">
                        <label>Parent category</label>
                        <select
                            name="category"
                            className="form-control"
                            onChange={(e) => setParent(e.target.value)}
                        >
                            <option>Please select</option>
                            {categories.length > 0 &&
                                categories.map((cat) => (
                                    <option key={cat._id} value={cat._id} selected={cat._id === parent}>
                                        {cat.name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <CategoryForm
                        handleSubmit={handleSubmit}
                        name={name}
                        setName={setName}
                    />
                </div>
            </div>
        </div>
    );
};

export default SubUpdate;
