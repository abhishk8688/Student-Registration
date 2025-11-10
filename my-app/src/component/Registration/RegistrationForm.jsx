import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import Button from '../shared/ReusableButton';
import { SimpleInput, SimpleSelect } from '../shared/FormInputs';

const RegistrationForm = ({ allOfferings }) => {
    const { state, dispatch } = useApp();
    const [studentName, setStudentName] = useState('');
    const [filterTypeId, setFilterTypeId] = useState('');
    const [selectedOfferingId, setSelectedOfferingId] = useState('');

    const filteredOfferings = useMemo(() => {
        if (!filterTypeId) {
            return allOfferings;
        }
        return allOfferings.filter(o => o.courseTypeId === filterTypeId);
    }, [allOfferings, filterTypeId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!studentName.trim() || !selectedOfferingId) return;

        dispatch({ 
            type: 'REGISTER_STUDENT', 
            payload: { 
                studentName: studentName.trim(), 
                courseOfferingId: selectedOfferingId 
            } 
        });
        
        setStudentName('');
        setSelectedOfferingId('');
    };
    
    return (
        <div className="p-5 bg-green-50 rounded-lg border border-green-200">
            <h4 className="text-xl font-semibold text-green-800 mb-4">Enroll a Student</h4>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <SimpleInput
                    label="Student Name"
                    placeholder="E.g., Priya Sharma"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    required
                    className="md:col-span-1 mb-0"
                />
                
                <SimpleSelect
                    label="Filter by Type"
                    value={filterTypeId}
                    onChange={(e) => {
                        setFilterTypeId(e.target.value);
                        setSelectedOfferingId(''); 
                    }}
                    className="md:col-span-1 mb-0"
                >
                    <option value="">All Course Types</option>
                    {state.courseTypes.map(ct => <option key={ct.id} value={ct.id}>{ct.name}</option>)}
                </SimpleSelect>
                
                <SimpleSelect
                    label="Available Offering"
                    value={selectedOfferingId}
                    onChange={(e) => setSelectedOfferingId(e.target.value)}
                    required
                    className="md:col-span-1 mb-0"
                >
                    <option value="">Select Offering...</option>
                    {filteredOfferings.map(o => <option key={o.id} value={o.id}>{o.displayName}</option>)}
                </SimpleSelect>
                
                <Button 
                    type="submit" 
                    style="primary" 
                    className="md:col-span-1 h-[42px]"
                    disabled={!studentName.trim() || !selectedOfferingId}
                >
                    Register Now
                </Button>
            </form>
        </div>
    );
};

export default RegistrationForm;