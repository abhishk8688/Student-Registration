import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import Button from '../shared/ReusableButton';

const OfferingsList = () => {
    const { state, dispatch } = useApp();

    const offeringsDisplay = useMemo(() => {
        return state.courseOfferings.map(offering => {
            const course = state.courses.find(c => c.id === offering.courseId);
            const courseType = state.courseTypes.find(ct => ct.id === offering.courseTypeId);
            
            return {
                ...offering,
                displayName: `[${courseType?.name || 'Missing Type'}] - ${course?.name || 'Missing Course'}`,
            };
        });
    }, [state.courseOfferings, state.courses, state.courseTypes]);

    const handleDelete = (id) => {
        if (window.confirm('Delete offering? Note: All student registrations tied to this offering will also be removed.')) {
            dispatch({ type: 'DELETE_OFFERING', payload: { id } });
        }
    };

    return (
        <div className="mt-4">
            <h4 className="text-lg font-semibold mb-3">Available Course Offerings ({offeringsDisplay.length})</h4>
            <div className="max-h-80 overflow-y-auto scrollbar-thin pr-2">
                {offeringsDisplay.length === 0 ? (
                    <p className="text-gray-500 italic">No offerings created yet. Use the form above.</p>
                ) : (
                    <ul className="space-y-3">
                        {offeringsDisplay.map((offering) => (
                            <li key={offering.id} className="p-3 border border-indigo-100 rounded-lg flex justify-between items-center bg-indigo-50">
                                <span className="text-gray-800 font-medium">{offering.displayName}</span>
                                <Button style="danger" className="py-1 px-3" onClick={() => handleDelete(offering.id)}>Remove</Button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default OfferingsList;