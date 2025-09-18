import { useState, memo } from "react";

function Category({ categoryData, onUpdate, onRemove }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(categoryData.name);

  const handleUpdateClick = () => {
    if (editing && name.trim() && name !== categoryData.name) {
      onUpdate(categoryData.id, name);
    }
    setEditing(!editing);
  };

  return (
    <div className="category-item">
      {editing ? (
        <input
          className="add-category-input"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      ) : (
        <span className="category-name">{categoryData.name}</span>
      )}
      <div className="category-actions">
        <button className="category-btn" onClick={handleUpdateClick}>{editing ? "Save" : "Update"}</button>
        <button className="category-btn" onClick={onRemove}>Remove</button>
      </div>
    </div>
  );
}

export default memo(Category);