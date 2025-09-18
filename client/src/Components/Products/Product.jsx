
import { memo, useEffect, useState } from 'react';
import GenericTable from '../GenericTable';
import '../../Styles/Product.css';

function Product({ categories, productData, onSave }) {
    const [boughtedByTableData, setBoughtedByTableData] = useState([]);
    const [updatedProductData, setUpdatedProductData] = useState({
        title: '',
        price: 0,
        categoryId: '',
        linkToPic: '',
        description: ''
    });

    const columnsToBoughtedByTable = [
        { label: "name", fieldName: "userFirstName" },
        { label: "qty", fieldName: "quantity" },
        { label: "date", fieldName: "boughtOn" },
    ];

    const category = categories.find(cat => cat.id === productData.categoryId);
    
    useEffect(() => {
        setBoughtedByTableData(productData.boughtBy.map(boughtBy => {
            return {
                id: boughtBy.id + boughtBy.userId,
                userFirstName: boughtBy.userName,
                quantity: boughtBy.quantity,
                boughtOn: boughtBy.boughtOn,
            };
        }));
    }, [productData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProductData({...updatedProductData, [name]: value ?  name === 'price' ? +value : value : (name === 'price' ? 0 : '') });

    };

    const saveNewData = () => {
        const newDataToSetOnProduct= {}

        if (updatedProductData.title.trim() !== '' && updatedProductData.title !== productData.title) {
            newDataToSetOnProduct.title = updatedProductData.title;
        }
        if (updatedProductData.price > 0 && updatedProductData.price !== productData.price) {
            newDataToSetOnProduct.price = updatedProductData.price;
        }
        if (updatedProductData.categoryId.trim() !== '' && updatedProductData.categoryId !== category.id) {
            newDataToSetOnProduct.categoryId = updatedProductData.categoryId;
        }
        if (updatedProductData.linkToPic.trim() !== '' && updatedProductData.linkToPic !== productData.linkToPic) {
            newDataToSetOnProduct.linkToPic = updatedProductData.linkToPic;
        }
        if (updatedProductData.description.trim() !== '' && updatedProductData.description !== productData.description) {
            newDataToSetOnProduct.description = updatedProductData.description;
        }
        onSave(productData.id, newDataToSetOnProduct);
    }

    return (
        <div className="product-box">
        <form className="product-fields">
            <div className="product-field">
                <label className="product-label">Title:</label>
                <input className="product-input" type="text" name="title" defaultValue={productData.title} onChange={handleChange} />
            </div>
            <div className="product-field">
                <label className="product-label">Price:</label>
                <input className="product-input" type="number" name="price" defaultValue={productData.price} onChange={handleChange} />
            </div>
            <div className="product-field">
                <label className="product-label">Category:</label>
                <select className="product-select" name='categoryId' value={productData.categoryId.id} onChange={handleChange} >
                    {categories && categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div>
            <div className="product-field">
                <label className="product-label">Link to picture:</label>
                <input className="product-input" type="text" name="linkToPic" defaultValue={productData.linkToPic} onChange={handleChange} />
            </div>
            <div className="product-field" style={{ gridColumn: '1 / span 2' }}>
                <label className="product-label">Description:</label>
                <textarea className="product-textarea" name="description" defaultValue={productData.description} onChange={handleChange} />
            </div>
            <div className="product-field product-table" style={{ gridColumn: '1 / span 2' }}>
                <label className="product-label">Bought By:</label>
                <GenericTable columns={columnsToBoughtedByTable} data={boughtedByTableData} />
            </div>
            <button className="product-save-btn" type="button" onClick={saveNewData}>Save</button>
        </form>
        </div>
    );
}

export default memo(Product);