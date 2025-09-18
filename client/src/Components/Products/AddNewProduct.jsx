
import { memo, useState } from 'react';
import '../../Styles/AddNewProduct.css';

function AddNewProduct({ onAdd, categories }) {
    const [newProductData, setNewProductData] = useState({
        title: '',
        price: 0,
        categoryId: '',
        linkToPic: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProductData({...newProductData, [name]: value ?  name === 'price' ? +value : value : (name === 'price' ? 0 : '') });
    }
	
    return (
		<form className="add-new-product-fields">
			<div className="add-new-product-field">
				<label className="add-new-product-label">Title:</label>
				<input className="add-new-product-input" type="text" onChange={handleChange} name="title" />
			</div>
			<div className="add-new-product-field">
				<label className="add-new-product-label">Price:</label>
				<input className="add-new-product-input" type="number" onChange={handleChange} name="price" />
			</div>
			<div className="add-new-product-field">
				<label className="add-new-product-label">Category:</label>
				<select className="add-new-product-select" onChange={handleChange} name="categoryId">
                    <option value=""></option>
                    {categories && categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
				</select>
			</div>
			<div className="add-new-product-field">
				<label className="add-new-product-label">Link to picture:</label>
				<input className="add-new-product-input" type="text" onChange={handleChange} name="linkToPic" />
			</div>
			<div className="add-new-product-field" style={{ gridColumn: '1 / span 2' }}>
				<label className="add-new-product-label">Description:</label>
				<textarea className="add-new-product-textarea" onChange={handleChange} name="description" />
			</div>
			<button className="add-new-btn" type="button" onClick={() => onAdd(newProductData)}>Add New</button>
		</form>
	);
}

export default memo(AddNewProduct);
