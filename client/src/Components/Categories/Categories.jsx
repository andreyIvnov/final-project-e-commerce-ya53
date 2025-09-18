
import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Category from "./Category";
import AddNewCategory from "./AddNewCategory";
import { addNewDoc, deleteDocByDocId, getAllDocsByCollectionName, updateDocByDocId } from "../../Helpers/fdbManager";

import "../../Styles/Categories.css";

function Categories() {
  const [categories, setCategories] = useState([]);
  const categoriesFromReducer = useSelector((state) => state.categoryR.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    if (categoriesFromReducer && categoriesFromReducer.length > 0) {
      setCategories(categoriesFromReducer.filter(c => !c.removed));
    }
  }, [categoriesFromReducer]);

  const handleUpdate = useCallback((id, newName) => {
    if (id && newName.trim()) {
      const updateInFBDB = async () => {
        await updateDocByDocId("categories", id, { name: newName });
      };

      dispatch({ type: "UPDATE_CATEGORY", payload: { id, name: newName } });
      
      updateInFBDB();
    }
  }, []);

  const handleRemove = useCallback((id) => {
    if (!id) return;
    const removeFromFBDB = async() => {
      await deleteDocByDocId("categories", id);
      dispatch({ type: "REMOVE_CATEGORY", payload: id });
    }
    
    removeFromFBDB();
  },[]);

  const handleAdd = useCallback((name) => {
    if (name.trim()) {
      const createInFB = async () => {
        const justCreatedCategory = await addNewDoc("categories", { name });
        dispatch({ type: "ADD_CATEGORY", payload: justCreatedCategory });
      };

      createInFB();
    }
  }, []);

  return (
    <div className="categories-outer">
      <div className="categories-box">
        <div className="categories-title">Categories</div>
        <div className="category-list">
          {categories.map(cat => (
            <Category key={cat.id} categoryData={cat} onUpdate={handleUpdate} onRemove={() => handleRemove(cat.id)} />
          ))}
        </div>
        <AddNewCategory onAdd={handleAdd} />
      </div>
    </div>
  );
}

export default Categories;