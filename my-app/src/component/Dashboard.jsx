import React, { useMemo } from 'react';
import CourseTypeManager from './CourseManagement/CourseTypeManager';
import CourseManager from './CourseManagement/CourseManager'; 
import OfferingCreator from './Offerings/OfferingCreator';
import OfferingsList from './Offerings/OfferingsList';
import RegistrationForm from './Registration/RegistrationForm';
import StudentList from './Registration/StudentList';
import { useApp } from '../context/AppContext';

const Dashboard = () => {
    const { state } = useApp();

    const allOfferingsWithNames = useMemo(() => {
        return state.courseOfferings.map(offering => {
            const course = state.courses.find(c => c.id === offering.courseId);
            const courseType = state.courseTypes.find(ct => ct.id === offering.courseTypeId);
            return {
                ...offering,
                displayName: `${courseType?.name || '??'} - ${course?.name || '??'}`,
                courseTypeName: courseType?.name || '??',
                courseTypeId: offering.courseTypeId 
            };
        });
    }, [state.courseOfferings, state.courses, state.courseTypes]);


    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
            <header className="text-center mb-10 pb-5 border-b border-indigo-200">
                <h1 className="text-4xl font-extrabold text-indigo-700">
                    Student Registration & Management 🎓
                </h1>
                <p className="text-lg text-gray-600 mt-2">Local State (Persisted) Demo</p>
            </header>
            
            <main className="max-w-7xl mx-auto space-y-12">
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <CourseTypeManager />
                    <CourseManager /> 
                </div>

                <section className="p-8 bg-white shadow-2xl rounded-xl border border-gray-100">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
                        🔗 Offerings Management
                    </h2>
                    <OfferingCreator />
                    <OfferingsList />
                </section>
                
                <section className="p-8 bg-white shadow-2xl rounded-xl border border-gray-100">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
                        ✍️ Student Registration & Roster
                    </h2>
                    
                    <RegistrationForm allOfferings={allOfferingsWithNames} />
                    <StudentList allOfferings={allOfferingsWithNames} />
                </section>
                
            </main>
            
          
        </div>
    );
};

export default Dashboard;