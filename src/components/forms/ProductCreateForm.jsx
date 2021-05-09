import React from 'react'
import { Select, } from 'antd';

const ProductCreateForm = ({ handleChange, handleSubmit, values, setValues, handleCategoryChange, subOptions, showSub }) => {
    const { title, description, price, categories, category, subs, shipping, quantity, color, colors, brand, brands } = values;

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input
                    name="title"
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Description</label>
                <input
                    name="description"
                    type="text"
                    className="form-control"
                    value={description}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Price</label>
                <input
                    name="price"
                    type="number"
                    className="form-control"
                    value={price}
                    min={0}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Shipping</label>
                <select
                    name="shipping"
                    className="form-control"
                    onChange={handleChange}
                    value={shipping}
                >
                    <option>Please select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>


            <div className="form-group">
                <label>Quantity</label>
                <input
                    name="quantity"
                    type="number"
                    className="form-control"
                    value={quantity}
                    min={0}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Color</label>
                <select
                    name="color"
                    className="form-control"
                    onChange={handleChange}
                    value={color}
                >
                    <option>Please select</option>
                    {colors.map(color => (
                        <option key={color} value={color}>{color}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Brand</label>
                <select
                    name="brand"
                    className="form-control"
                    onChange={handleChange}
                    value={brand}
                >
                    <option>Please select</option>
                    {brands.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Category</label>
                <select
                    name="category"
                    className="form-control"
                    onChange={handleCategoryChange}
                    value={category}
                >
                    <option>Please select</option>
                    {categories.map(cat => (
                        <option value={cat._id} key={cat._id}>{cat.name}</option>
                    ))}
                </select>
            </div>

            { showSub && subOptions.length !==0 && <div className="form-group">
                <label>Sub Category</label>
                <Select
                    mode="multiple"
                    placeholder="Please select"
                    style={{ width: "100%" }}
                    value={subs}
                    name="subs"
                    onChange={value => setValues({ ...values, subs: value })}
                >
                    {subOptions.map(sub => (
                        <Select.Option value={sub._id} key={sub._id}>{sub.name}</Select.Option>
                    ))}
                </Select>
            </div>}
            <button className="btn btn-outline-primary btn-block" >Save</button>
        </form>
    )
}

export default ProductCreateForm;
