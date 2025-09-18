import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";

import { addNewDoc, updateDocByDocId } from "../../Helpers/fdbManager";

import Product from "./Product";
import AddNewProduct from "./AddNewProduct";

function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productR.products);
  const carts = useSelector((state) => state.cartR.carts);
  const categories = useSelector((state) => state.categoryR.categories);

  const [boughtByTable, setBoughtByTable] = useState([]);

  useEffect(() => {
    let productsData = [];
    carts.map(cart => {
      const products = cart.products.map(prod => {
        return {
          userName: cart.userId.firstName,
          userId: cart.userId.id,
          id: prod.id,
          quantity: prod.count,
          boughtOn: cart.createdOn.toDate().toLocaleDateString(),
        }
      })
      productsData = [...productsData, ...products];
    });
    setBoughtByTable(productsData);
  }, [carts, products]);

  const addNewProduct = useCallback((newProduct) => {
    if (newProduct && newProduct.title && newProduct.price && newProduct.categoryId) {
      const createInFB = async () => {
        const justCreatedProduct = await addNewDoc("products", newProduct);
        dispatch({ type: "ADD_PRODUCT", payload: justCreatedProduct });
      };

      createInFB();
    }
  }, []);

  const handleSave = useCallback((productId, updatedProduct) => {
    if (updatedProduct && productId) {
      const updateInFB = async () => {
        if (Object.keys(updatedProduct).length > 0) {
          debugger;
          await updateDocByDocId("products", productId, { ...updatedProduct });
          dispatch({ type: "UPDATE_PRODUCT", payload: { id: productId, ...updatedProduct } });
        }
      };

      updateInFB();
    }
  }, []);

  return (
    <div className="products-outer">
      <div className="products-list">
          {products.map(product => (
            <Product
              key={product.id}
              productData={{
                ...product,
                boughtBy: boughtByTable && boughtByTable.length > 0 ? [...boughtByTable.filter(boughtByProd => boughtByProd.id === product.id)] : []
              }}
              categories={categories}
              onSave={handleSave}
            />
          ))}
          <AddNewProduct categories={categories} onAdd={addNewProduct} />
      </div>
    </div>
  );
}

export default Products