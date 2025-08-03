import React from 'react';
import { Star, Clock, GraduationCap, DollarSign } from 'lucide-react';
import { Doctor } from '../types';

interface DoctorCardProps {
  doctor: Doctor;
  onSelect: (doctor: Doctor) => void;
}

export function DoctorCard({ doctor, onSelect }: DoctorCardProps) {
  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'Available Today':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Fully Booked':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'On Leave':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Available Soon':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const isBookable = doctor.availability === 'Available Today' || doctor.availability === 'Available Soon';

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative">
            <img
              src={doctor.profileImage}
              alt={doctor.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-white shadow-md mx-auto sm:mx-0"
            />
            <div className={`absolute -bottom-2 -right-2 px-2 py-1 rounded-full text-xs font-medium border ${getAvailabilityColor(doctor.availability)}`}>
              {doctor.availability === 'Available Today' ? '●' : 
               doctor.availability === 'Available Soon' ? '◐' :
               doctor.availability === 'Fully Booked' ? '◯' : '◉'}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 text-center sm:text-left">{doctor.name}</h3>
            <p className="text-blue-600 font-medium mb-2 text-center sm:text-left">{doctor.specialization}</p>
            
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="font-medium">{doctor.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{doctor.experience} years</span>
              </div>
              <div className="flex items-center space-x-1">
                <DollarSign className="h-4 w-4" />
                <span>${doctor.consultationFee}</span>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start space-x-2 mb-4">
              <GraduationCap className="h-4 w-4 text-gray-400" />
              <span className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">{doctor.education}</span>
            </div>

            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${getAvailabilityColor(doctor.availability)} mx-auto sm:mx-0`}>
              {doctor.availability}
            </div>
          </div>
        </div>

        <div className="mt-4 sm:mt-6 pt-4 border-t border-gray-100">
          <button
            onClick={() => onSelect(doctor)}
            disabled={!isBookable}
            className={`w-full py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
              isBookable
                ? 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105 shadow-md hover:shadow-lg'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isBookable ? 'View Profile & Book' : 'Currently Unavailable'}
          </button>
        </div>
      </div>
    </div>
  );
}