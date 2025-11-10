import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { SimpleSelect } from '../shared/FormInputs';

const StudentList = ({ allOfferings }) => {
    const { state } = useApp();
    const [viewOfferingId, setViewOfferingId] = useState('');

    const studentsForSelectedOffering = useMemo(() => {
        if (!viewOfferingId) return [];
        
        return state.registrations
            .filter(reg => reg.courseOfferingId === viewOfferingId)
            .sort((a, b) => a.studentName.localeCompare(b.studentName));
    }, [state.registrations, viewOfferingId]);
    
    const selectedOfferingName = allOfferings.find(o => o.id === viewOfferingId)?.displayName || '...';

    return (
        <div className="mt-8">
            <h4 className="text-xl font-semibold mb-3">🔍 View Registered Students</h4>
            
            <SimpleSelect
                label="Select Offering to View"
                value={viewOfferingId}
                onChange={(e) => setViewOfferingId(e.target.value)}
                className="max-w-md"
            >
                <option value="">-- Choose an Offering --</option>
                {allOfferings.map(o => <option key={o.id} value={o.id}>{o.displayName}</option>)}
            </SimpleSelect>

            <div className="mt-4 p-4 bg-white border rounded-lg shadow-inner">
                {viewOfferingId && (
                    <h5 className="font-bold text-md mb-3 text-indigo-700">
                        Total Students for {selectedOfferingName}: {studentsForSelectedOffering.length}
                    </h5>
                )}

                <div className="max-h-60 overflow-y-auto scrollbar-thin pr-2">
                    {studentsForSelectedOffering.length === 0 ? (
                        <p className="text-gray-500 italic">
                            {viewOfferingId ? 'No registrations found for this specific offering.' : 'Select an offering above to see the student roster.'}
                        </p>
                    ) : (
                        <ul className="space-y-2">
                            {studentsForSelectedOffering.map((reg) => (
                                <li key={reg.id} className="p-3 bg-gray-100 border-l-4 border-indigo-500 rounded-md flex justify-between items-center text-sm">
                                    <span className="font-medium text-gray-700">{reg.studentName}</span>
                                    <span className="text-gray-500 text-xs">
                                        Registered: {new Date(reg.regDate).toLocaleDateString()}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentList;