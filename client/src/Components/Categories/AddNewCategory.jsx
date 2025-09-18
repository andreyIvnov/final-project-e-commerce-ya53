
import React, { useState } from "react";

function AddNewCategory({ onAdd }) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    onAdd(input);
    setInput("");
  };

  return (
    <div className="add-category-row">
      <input
        className="add-category-input"
        type="text"
        placeholder="Add new category"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button className="add-category-btn" onClick={handleAdd}>Add</button>
    </div>
  );
}

export default AddNewCategory;