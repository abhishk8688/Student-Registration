import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Button from '../shared/ReusableButton';
import { SimpleSelect } from '../shared/FormInputs';

const OfferingCreator = () => {
    const { state, dispatch } = useApp();
    const [courseId, setCourseId] = useState('');
    const [courseTypeId, setCourseTypeId] = useState('');

    const coursesAvailable = state.courses.length > 0;
    const courseTypesAvailable = state.courseTypes.length > 0;
    
    const canCreate = !!courseId && !!courseTypeId;

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({ 
            type: 'ADD_OFFERING', 
            payload: { courseId, courseTypeId } 
        });
        setCourseId('');
        setCourseTypeId('');
    };

    if (!coursesAvailable || !courseTypesAvailable) {
        return (
            <p className="p-4 bg-yellow-100 border border-yellow-300 rounded-lg text-yellow-800">
                 **Prerequisite Missing:** Please create at least one **Course Type** and one **Course** to create an offering.
            </p>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-4 items-end p-4 border rounded-lg bg-gray-50">
            <SimpleSelect
                label="Select Course"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                required
                className="col-span-1 mb-0"
            >
                <option value="">-- Choose Course --</option>
                {state.courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </SimpleSelect>
            <SimpleSelect
                label="Select Course Type"
                value={courseTypeId}
                onChange={(e) => setCourseTypeId(e.target.value)}
                required
                className="col-span-1 mb-0"
            >
                <option value="">-- Choose Type --</option>
                {state.courseTypes.map(ct => <option key={ct.id} value={ct.id}>{ct.name}</option>)}
            </SimpleSelect>
            <Button type="submit" disabled={!canCreate} className="col-span-2 h-[42px]">
                Link & Create Offering
            </Button>
        </form>
    );
};

export default OfferingCreator;