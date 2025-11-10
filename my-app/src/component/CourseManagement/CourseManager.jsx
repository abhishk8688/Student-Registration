import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Button from '../shared/ReusableButton';
import { SimpleInput } from '../shared/FormInputs';

// --- Nested/Helper Components ---

// Component for adding/editing a course
const CourseForm = ({ initialData, onSubmit, onCancel }) => {
    const [name, setName] = useState(initialData ? initialData.name : '');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        onSubmit(name.trim());
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-3 items-end">
            <SimpleInput
                label={initialData ? "Edit Course Name" : "New Course Name"}
                placeholder="e.g., Hindi, English, Urdu"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="flex-grow mb-0" 
            />
            <Button type="submit" style="primary">{initialData ? "Save Changes" : "Create Course"}</Button>
            {initialData && <Button type="button" style="secondary" onClick={onCancel}>Cancel</Button>}
        </form>
    );
};

// Component to list and manage courses
const CourseList = ({ courses, onEdit, onDelete }) => (
    <div className="max-h-64 overflow-y-auto mt-4 scrollbar-thin pr-2">
        {courses.length === 0 ? (
            <p className="text-gray-500 italic">No courses defined yet.</p>
        ) : (
            <ul className="space-y-2">
                {courses.map((course) => (
                    <li key={course.id} className="p-3 bg-gray-50 rounded-lg flex justify-between items-center border border-gray-200">
                        <span className="font-medium text-gray-700">{course.name}</span>
                        <div className="space-x-2">
                            <Button style="outline" className="py-1 px-3" onClick={() => onEdit(course)}>Edit</Button>
                            <Button style="danger" className="py-1 px-3" onClick={() => onDelete(course.id)}>Delete</Button>
                        </div>
                    </li>
                ))}
            </ul>
        )}
    </div>
);

// --- Main Component ---
const CourseManager = () => {
  const { state, dispatch } = useApp();
  const [editingCourse, setEditingCourse] = useState(null); 

  const handleCreate = (name) => {
    dispatch({ type: 'ADD_COURSE', payload: { name } });
  };

  const handleUpdate = (name) => {
    dispatch({ type: 'UPDATE_COURSE', payload: { id: editingCourse.id, name } });
    setEditingCourse(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Confirm delete. This course cannot be deleted if it is used in any offerings.')) {
      dispatch({ type: 'DELETE_COURSE', payload: { id } });
    }
  };

  return (
    <section className="p-6 bg-white shadow-xl rounded-lg border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        📚 Course Manager
      </h3>
      
      <CourseForm 
        initialData={editingCourse}
        onSubmit={editingCourse ? handleUpdate : handleCreate}
        onCancel={() => setEditingCourse(null)}
      />

      <CourseList 
        courses={state.courses}
        onEdit={setEditingCourse}
        onDelete={handleDelete}
      />
    </section>
  );
};

export default CourseManager;