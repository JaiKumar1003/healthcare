import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Doctor, Appointment } from '../types';
import { mockDoctors } from '../data/mockDoctors';

interface AppState {
  doctors: Doctor[];
  appointments: Appointment[];
  selectedDoctor: Doctor | null;
  searchQuery: string;
  selectedSpecialization: string;
}

type AppAction =
  | { type: 'SET_DOCTORS'; payload: Doctor[] }
  | { type: 'ADD_APPOINTMENT'; payload: Appointment }
  | { type: 'SET_SELECTED_DOCTOR'; payload: Doctor | null }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_SELECTED_SPECIALIZATION'; payload: string };

const initialState: AppState = {
  doctors: mockDoctors,
  appointments: [],
  selectedDoctor: null,
  searchQuery: '',
  selectedSpecialization: '',
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_DOCTORS':
      return { ...state, doctors: action.payload };
    case 'ADD_APPOINTMENT':
      return { ...state, appointments: [...state.appointments, action.payload] };
    case 'SET_SELECTED_DOCTOR':
      return { ...state, selectedDoctor: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_SELECTED_SPECIALIZATION':
      return { ...state, selectedSpecialization: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}