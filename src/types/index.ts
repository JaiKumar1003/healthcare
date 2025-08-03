export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  profileImage: string;
  availability: AvailabilityStatus;
  rating: number;
  experience: number;
  education: string;
  about: string;
  schedule: DoctorSchedule[];
  consultationFee: number;
}

export interface DoctorSchedule {
  day: string;
  slots: TimeSlot[];
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientName: string;
  email: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

export type AvailabilityStatus = 'Available Today' | 'Fully Booked' | 'On Leave' | 'Available Soon';

export interface BookingFormData {
  patientName: string;
  email: string;
  date: string;
  time: string;
  notes?: string;
}