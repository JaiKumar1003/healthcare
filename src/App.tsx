import React, { useMemo } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { DoctorCard } from './components/DoctorCard';
import { DoctorProfile } from './components/DoctorProfile';

function AppContent() {
  const { state, dispatch } = useApp();
  const { doctors, searchQuery, selectedSpecialization, selectedDoctor } = state;

  const specializations = useMemo(() => {
    return Array.from(new Set(doctors.map(doctor => doctor.specialization))).sort();
  }, [doctors]);

  const filteredDoctors = useMemo(() => {
    return doctors.filter(doctor => {
      const matchesSearch = searchQuery === '' || 
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSpecialization = selectedSpecialization === '' || 
        doctor.specialization === selectedSpecialization;

      return matchesSearch && matchesSpecialization;
    });
  }, [doctors, searchQuery, selectedSpecialization]);

  const handleDoctorSelect = (doctor: any) => {
    dispatch({ type: 'SET_SELECTED_DOCTOR', payload: doctor });
  };

  const handleBackToList = () => {
    dispatch({ type: 'SET_SELECTED_DOCTOR', payload: null });
  };

  const handleSearchChange = (query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  const handleSpecializationChange = (specialization: string) => {
    dispatch({ type: 'SET_SELECTED_SPECIALIZATION', payload: specialization });
  };

  if (selectedDoctor) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          selectedSpecialization={selectedSpecialization}
          onSpecializationChange={handleSpecializationChange}
          specializations={specializations}
        />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <DoctorProfile doctor={selectedDoctor} onBack={handleBackToList} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedSpecialization={selectedSpecialization}
        onSpecializationChange={handleSpecializationChange}
        specializations={specializations}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Find Your Doctor</h2>
          <p className="text-sm sm:text-base text-gray-600">
            {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} available
            {searchQuery && ` for "${searchQuery}"`}
            {selectedSpecialization && ` in ${selectedSpecialization}`}
          </p>
        </div>

        {filteredDoctors.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 max-w-md mx-auto">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No doctors found</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                Try adjusting your search terms or filters to find more doctors.
              </p>
              <button
                onClick={() => {
                  dispatch({ type: 'SET_SEARCH_QUERY', payload: '' });
                  dispatch({ type: 'SET_SELECTED_SPECIALIZATION', payload: '' });
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm sm:text-base hover:bg-blue-700 transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onSelect={handleDoctorSelect}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center text-gray-600">
            <p className="text-sm sm:text-base">&copy; 2025 HealthCare+. All rights reserved.</p>
            <p className="mt-2 text-xs sm:text-sm">Your trusted healthcare partner</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;