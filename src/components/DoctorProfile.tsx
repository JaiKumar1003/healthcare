import React, { useState } from 'react';
import { ArrowLeft, Star, Clock, GraduationCap, DollarSign, Calendar, MapPin } from 'lucide-react';
import { Doctor } from '../types';
import { AppointmentForm } from './AppointmentForm';

interface DoctorProfileProps {
  doctor: Doctor;
  onBack: () => void;
}

export function DoctorProfile({ doctor, onBack }: DoctorProfileProps) {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedDay, setSelectedDay] = useState(doctor.schedule[0]?.day || '');

  const selectedSchedule = doctor.schedule.find(s => s.day === selectedDay);
  const availableSlots = selectedSchedule?.slots.filter(slot => slot.available) || [];

  if (showBookingForm) {
    return (
      <AppointmentForm
        doctor={doctor}
        onBack={() => setShowBookingForm(false)}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-0">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors duration-200"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Doctors</span>
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 sm:p-6 lg:p-8 text-white">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <img
              src={doctor.profileImage}
              alt={doctor.name}
              className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-center sm:text-left">{doctor.name}</h1>
              <p className="text-lg sm:text-xl text-blue-100 mb-4 text-center sm:text-left">{doctor.specialization}</p>
              
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-6 text-blue-100">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-300 fill-current" />
                  <span className="font-medium text-sm sm:text-base">{doctor.rating} Rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span className="text-sm sm:text-base">{doctor.experience} Years Experience</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5" />
                  <span className="text-sm sm:text-base">${doctor.consultationFee} Consultation</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - About & Education */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">About Dr. {doctor.name.split(' ')[1]}</h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{doctor.about}</p>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                  <GraduationCap className="h-6 w-6 text-blue-600" />
                  <span>Education</span>
                </h3>
                <p className="text-sm sm:text-base text-gray-600">{doctor.education}</p>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                  <MapPin className="h-6 w-6 text-blue-600" />
                  <span>Practice Information</span>
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm sm:text-base text-gray-600 mb-2">
                    <strong>Specialization:</strong> {doctor.specialization}
                  </p>
                  <p className="text-sm sm:text-base text-gray-600 mb-2">
                    <strong>Experience:</strong> {doctor.experience} years in practice
                  </p>
                  <p className="text-sm sm:text-base text-gray-600">
                    <strong>Consultation Fee:</strong> ${doctor.consultationFee}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Availability & Booking */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Calendar className="h-6 w-6 text-blue-600" />
                  <span>Availability</span>
                </h3>

                {doctor.availability === 'On Leave' ? (
                  <div className="text-center py-8">
                    <p className="text-sm sm:text-base text-gray-600 mb-4">Dr. {doctor.name.split(' ')[1]} is currently on leave.</p>
                    <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg inline-block">
                      On Leave
                    </div>
                  </div>
                ) : doctor.schedule.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-sm sm:text-base text-gray-600">No schedule available at the moment.</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 mb-4">
                      {doctor.schedule.map((daySchedule) => (
                        <button
                          key={daySchedule.day}
                          onClick={() => setSelectedDay(daySchedule.day)}
                          className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                            selectedDay === daySchedule.day
                              ? 'bg-blue-600 text-white'
                              : 'bg-white hover:bg-gray-100 border border-gray-200'
                          }`}
                        >
                          <div className="font-medium text-sm sm:text-base">{daySchedule.day}</div>
                          <div className="text-sm opacity-75">
                            {daySchedule.slots.filter(slot => slot.available).length} slots available
                          </div>
                        </button>
                      ))}
                    </div>

                    {selectedSchedule && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3 text-sm sm:text-base">Available Times - {selectedDay}</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {availableSlots.map((slot) => (
                            <div
                              key={slot.time}
                              className="bg-green-50 text-green-700 px-3 py-2 rounded text-center text-sm font-medium border border-green-200"
                            >
                              {slot.time}
                            </div>
                          ))}
                        </div>
                        {availableSlots.length === 0 && (
                          <p className="text-gray-500 text-center py-4 text-sm">No available slots for {selectedDay}</p>
                        )}
                      </div>
                    )}
                  </>
                )}

                {doctor.availability !== 'On Leave' && doctor.schedule.length > 0 && (
                  <button
                    onClick={() => setShowBookingForm(true)}
                    className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium text-sm sm:text-base hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    Book Appointment
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}