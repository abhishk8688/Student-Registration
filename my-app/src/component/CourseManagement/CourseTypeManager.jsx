import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Button from '../shared/ReusableButton';
import { SimpleInput } from '../shared/FormInputs';

// --- Nested/Helper Components ---

// Component for adding/editing a course type
const TypeForm = ({ initialData, onSubmit, onCancel }) => {
    const [name, setName] = useState(initialData ? initialData.name : '');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        onSubmit(name.trim());
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-3 items-end">
            <SimpleInput
                label={initialData ? "Edit Type Name" : "New Type Name"}
                placeholder="e.g., Individual, Group, Special"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="flex-grow mb-0" 
            />
            <Button type="submit" style="primary">{initialData ? "Save Changes" : "Create Type"}</Button>
            {initialData && <Button type="button" style="secondary" onClick={onCancel}>Cancel</Button>}
        </form>
    );
};

// Component to list and manage types
const CourseTypesList = ({ types, onEdit, onDelete }) => (
    <div className="max-h-64 overflow-y-auto mt-4 scrollbar-thin pr-2">
        {types.length === 0 ? (
            <p className="text-gray-500 italic">No course types defined yet.</p>
        ) : (
            <ul className="space-y-2">
                {types.map((type) => (
                    <li key={type.id} className="p-3 bg-gray-50 rounded-lg flex justify-between items-center border border-gray-200">
                        <span className="font-medium text-gray-700">{type.name}</span>
                        <div className="space-x-2">
                            <Button style="outline" className="py-1 px-3" onClick={() => onEdit(type)}>Edit</Button>
                            <Button style="danger" className="py-1 px-3" onClick={() => onDelete(type.id)}>Delete</Button>
                        </div>
                    </li>
                ))}
            </ul>
        )}
    </div>
);

// --- Main Component ---
const CourseTypeManager = () => {
  const { state, dispatch } = useApp();
  const [editingType, setEditingType] = useState(null); 

  const handleCreate = (name) => {
    dispatch({ type: 'ADD_TYPE', payload: { name } });
  };

  const handleUpdate = (name) => {
    dispatch({ type: 'UPDATE_TYPE', payload: { id: editingType.id, name } });
    setEditingType(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Confirm delete. This cannot be undone if used in an offering.')) {
      dispatch({ type: 'DELETE_TYPE', payload: { id } });
    }
  };

  return (
    <section className="p-6 bg-white shadow-xl rounded-lg border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        ✨ Course Type Manager
      </h3>
      
      <TypeForm 
        initialData={editingType}
        onSubmit={editingType ? handleUpdate : handleCreate}
        onCancel={() => setEditingType(null)}
      />

      <CourseTypesList 
        types={state.courseTypes}
        onEdit={setEditingType}
        onDelete={handleDelete}
      />
    </section>
  );
};

export default CourseTypeManager;