import React, { createContext, useReducer, useEffect, useContext } from 'react';

// Use a simple JSON key for local storage
const STORAGE_KEY = 'studentRegDataV2';

// --- INITIAL STATE & REDUCER ---
const initialState = {
  courseTypes: [],
  courses: [],
  courseOfferings: [],
  registrations: [],
};

// Simple ID generator, classic developer technique
const generateId = () => Math.random().toString(36).substring(2, 9); 

function appReducer(state, action) {
  switch (action.type) {
    
    // --- Course Types ---
    case 'ADD_TYPE':
      if (state.courseTypes.some(ct => ct.name.toLowerCase() === action.payload.name.toLowerCase())) {
          alert('Duplicate type name detected. Please choose another.');
          return state;
      }
      return {
        ...state,
        courseTypes: [...state.courseTypes, { id: generateId(), name: action.payload.name }],
      };
    case 'UPDATE_TYPE':
      return {
        ...state,
        courseTypes: state.courseTypes.map(ct =>
          ct.id === action.payload.id ? { ...ct, name: action.payload.name } : ct
        ),
      };
    case 'DELETE_TYPE':
      if (state.courseOfferings.some(co => co.courseTypeId === action.payload.id)) {
        alert('Cannot delete: This course type is currently offered.');
        return state;
      }
      return {
        ...state,
        courseTypes: state.courseTypes.filter(ct => ct.id !== action.payload.id),
      };

    // --- Courses ---
    case 'ADD_COURSE':
        if (state.courses.some(c => c.name.toLowerCase() === action.payload.name.toLowerCase())) {
            alert('A course with this name already exists.');
            return state;
        }
      return {
        ...state,
        courses: [...state.courses, { id: generateId(), name: action.payload.name }],
      };
    case 'UPDATE_COURSE':
        return {
            ...state,
            courses: state.courses.map(c =>
              c.id === action.payload.id ? { ...c, name: action.payload.name } : c
            ),
        };
    case 'DELETE_COURSE':
      if (state.courseOfferings.some(co => co.courseId === action.payload.id)) {
        alert('Cannot delete: This course is currently offered.');
        return state;
      }
      return {
        ...state,
        courses: state.courses.filter(c => c.id !== action.payload.id),
      };

    // --- Offerings ---
    case 'ADD_OFFERING':
      if (state.courseOfferings.some(co => 
            co.courseId === action.payload.courseId && 
            co.courseTypeId === action.payload.courseTypeId)) {
          alert('This specific course + type offering already exists.');
          return state;
      }
      // Note: No UPDATE_OFFERING case here as it requires complex duplicate checks on association change
      return {
        ...state,
        courseOfferings: [...state.courseOfferings, { id: generateId(), ...action.payload }],
      };
    case 'DELETE_OFFERING':
      return {
        ...state,
        courseOfferings: state.courseOfferings.filter(co => co.id !== action.payload.id),
        // Clean up associated registrations immediately
        registrations: state.registrations.filter(reg => reg.courseOfferingId !== action.payload.id),
      };
      
    // --- Registrations ---
    case 'REGISTER_STUDENT':
      if (state.registrations.some(reg => 
            reg.studentName.toLowerCase() === action.payload.studentName.toLowerCase() && 
            reg.courseOfferingId === action.payload.courseOfferingId)) {
        alert(`${action.payload.studentName} is already enrolled in this offering.`);
        return state;
      }
      
      return {
        ...state,
        registrations: [
          ...state.registrations,
          { id: generateId(), ...action.payload, regDate: new Date().toISOString() }
        ],
      };
      
    default:
      return state;
  }
}

// --- CONTEXT SETUP ---
export const AppContext = createContext({
  state: initialState,
  dispatch: () => null, // Placeholder function
});

// Custom hook to mimic useReducer but persist to Local Storage (The 'usePersistedReducer' hook)
export const usePersistedReducer = (reducer, defaultState, storageKey) => {
    const [state, dispatch] = useReducer(reducer, defaultState, (initial) => {
        try {
            const item = window.localStorage.getItem(storageKey);
            return item ? JSON.parse(item) : initial;
        } catch (error) {
            console.warn(`Could not read storage key "${storageKey}":`, error);
            return defaultState;
        }
    });

    // Sync state to local storage whenever it changes
    useEffect(() => {
        window.localStorage.setItem(storageKey, JSON.stringify(state));
    }, [state, storageKey]);

    return [state, dispatch];
};


// --- PROVIDER COMPONENT ---
export const AppProvider = ({ children }) => {
  const [state, dispatch] = usePersistedReducer(appReducer, initialState, STORAGE_KEY);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom Hook to consume context
export const useApp = () => useContext(AppContext);