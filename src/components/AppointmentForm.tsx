import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, User, Mail, FileText, CheckCircle } from 'lucide-react';
import { Doctor, BookingFormData, Appointment } from '../types';
import { useApp } from '../context/AppContext';

interface AppointmentFormProps {
  doctor: Doctor;
  onBack: () => void;
}

export function AppointmentForm({ doctor, onBack }: AppointmentFormProps) {
  const { dispatch } = useApp();
  const [formData, setFormData] = useState<BookingFormData>({
    patientName: '',
    email: '',
    date: '',
    time: '',
    notes: ''
  });
  const [errors, setErrors] = useState<Partial<BookingFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedDay, setSelectedDay] = useState(doctor.schedule[0]?.day || '');

  const selectedSchedule = doctor.schedule.find(s => s.day === selectedDay);
  const availableSlots = selectedSchedule?.slots.filter(slot => slot.available) || [];

  const validateForm = (): boolean => {
    const newErrors: Partial<BookingFormData> = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Patient name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }

    if (!formData.time) {
      newErrors.time = 'Please select a time slot';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const appointment: Appointment = {
      id: Date.now().toString(),
      doctorId: doctor.id,
      patientName: formData.patientName,
      email: formData.email,
      date: formData.date,
      time: formData.time,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    dispatch({ type: 'ADD_APPOINTMENT', payload: appointment });
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const getDayFromDate = (dateString: string): string => {
    const date = new Date(dateString);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Appointment Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Your appointment with Dr. {doctor.name} has been successfully booked.
          </p>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-4">Appointment Details</h3>
            <div className="space-y-2 text-gray-600">
              <p><strong>Doctor:</strong> {doctor.name}</p>
              <p><strong>Patient:</strong> {formData.patientName}</p>
              <p><strong>Date:</strong> {formData.date}</p>
              <p><strong>Time:</strong> {formData.time}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              {formData.notes && <p><strong>Notes:</strong> {formData.notes}</p>}
            </div>
          </div>

          <p className="text-sm text-gray-500 mb-6">
            A confirmation email has been sent to {formData.email}
          </p>

          <button
            onClick={onBack}
            className="bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            Back to Doctor Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-0">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors duration-200"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Profile</span>
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 sm:p-6 text-white">
          <h1 className="text-xl sm:text-2xl font-bold mb-2">Book Appointment</h1>
          <p className="text-sm sm:text-base text-blue-100">Schedule your consultation with Dr. {doctor.name}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Patient Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Patient Name</span>
            </label>
            <input
              type="text"
              value={formData.patientName}
              onChange={(e) => handleInputChange('patientName', e.target.value)}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.patientName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
            />
            {errors.patientName && (
              <p className="mt-1 text-sm text-red-600">{errors.patientName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email address"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Preferred Date</span>
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => {
                const selectedDate = e.target.value;
                handleInputChange('date', selectedDate);
                if (selectedDate) {
                  const dayOfWeek = getDayFromDate(selectedDate);
                  setSelectedDay(dayOfWeek);
                  // Reset time when date changes
                  handleInputChange('time', '');
                }
              }}
              min={new Date().toISOString().split('T')[0]}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-600">{errors.date}</p>
            )}
          </div>

          {/* Time Slots */}
          {formData.date && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Available Time Slots</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {availableSlots.length > 0 ? (
                  availableSlots.map((slot) => (
                    <button
                      key={slot.time}
                      type="button"
                      onClick={() => handleInputChange('time', slot.time)}
                      className={`p-2 sm:p-3 border rounded-lg text-center text-sm transition-all duration-200 ${
                        formData.time === slot.time
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))
                ) : (
                  <div className="col-span-2 sm:col-span-3 text-center py-4 text-gray-500 text-sm">
                    No available slots for the selected date
                  </div>
                )}
              </div>
              {errors.time && (
                <p className="mt-1 text-sm text-red-600">{errors.time}</p>
              )}
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Additional Notes (Optional)</span>
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={3}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Any specific concerns or requirements?"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-medium text-sm sm:text-base text-white transition-all duration-200 ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 transform hover:scale-105 shadow-md hover:shadow-lg'
              }`}
            >
              {isSubmitting ? 'Booking Appointment...' : 'Confirm Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}