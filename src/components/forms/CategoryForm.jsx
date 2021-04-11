import React from 'react'

const CategoryForm = ({name, handleSubmit,setName }) => {
    return (
        <form onSubmit={handleSubmit} >
            <div className="form-group">
                <label>Name</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={e => setName(e.target.value)}
                    value={name}
                    required
                />
                <button type="submit" className="btn btn-primary" >Save</button>
            </div>
        </form>
    )
}

export default CategoryForm
