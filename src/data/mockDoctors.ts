import { Doctor } from '../types';

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiology',
    profileImage: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400',
    availability: 'Available Today',
    rating: 4.9,
    experience: 12,
    education: 'MD from Harvard Medical School',
    about: 'Dr. Johnson is a board-certified cardiologist with over 12 years of experience treating heart conditions. She specializes in preventive cardiology and advanced cardiac imaging.',
    consultationFee: 150,
    schedule: [
      {
        day: 'Monday',
        slots: [
          { time: '09:00', available: true },
          { time: '10:00', available: false },
          { time: '11:00', available: true },
          { time: '14:00', available: true },
          { time: '15:00', available: true },
          { time: '16:00', available: false }
        ]
      },
      {
        day: 'Tuesday',
        slots: [
          { time: '09:00', available: true },
          { time: '10:00', available: true },
          { time: '11:00', available: false },
          { time: '14:00', available: true },
          { time: '15:00', available: true }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Dermatology',
    profileImage: 'https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg?auto=compress&cs=tinysrgb&w=400',
    availability: 'Available Today',
    rating: 4.8,
    experience: 8,
    education: 'MD from Johns Hopkins University',
    about: 'Dr. Chen is a dermatologist specializing in medical and cosmetic dermatology. He has extensive experience in treating skin conditions and advanced dermatological procedures.',
    consultationFee: 120,
    schedule: [
      {
        day: 'Monday',
        slots: [
          { time: '08:00', available: true },
          { time: '09:00', available: true },
          { time: '10:00', available: true },
          { time: '11:00', available: false },
          { time: '13:00', available: true },
          { time: '14:00', available: true }
        ]
      },
      {
        day: 'Wednesday',
        slots: [
          { time: '09:00', available: true },
          { time: '10:00', available: false },
          { time: '11:00', available: true },
          { time: '15:00', available: true }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialization: 'Pediatrics',
    profileImage: 'https://images.pexels.com/photos/5327584/pexels-photo-5327584.jpeg?auto=compress&cs=tinysrgb&w=400',
    availability: 'Fully Booked',
    rating: 4.9,
    experience: 15,
    education: 'MD from Stanford University',
    about: 'Dr. Rodriguez is a pediatrician with 15 years of experience caring for children from infancy through adolescence. She specializes in developmental pediatrics and preventive care.',
    consultationFee: 130,
    schedule: [
      {
        day: 'Tuesday',
        slots: [
          { time: '08:00', available: false },
          { time: '09:00', available: false },
          { time: '10:00', available: false },
          { time: '11:00', available: false }
        ]
      },
      {
        day: 'Thursday',
        slots: [
          { time: '13:00', available: false },
          { time: '14:00', available: false },
          { time: '15:00', available: false }
        ]
      }
    ]
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialization: 'Orthopedics',
    profileImage: 'https://images.pexels.com/photos/582750/pexels-photo-582750.jpeg?auto=compress&cs=tinysrgb&w=400',
    availability: 'Available Today',
    rating: 4.7,
    experience: 20,
    education: 'MD from Mayo Clinic',
    about: 'Dr. Wilson is an orthopedic surgeon with 20 years of experience specializing in sports medicine and joint replacement surgery. He has worked with professional athletes and weekend warriors alike.',
    consultationFee: 180,
    schedule: [
      {
        day: 'Monday',
        slots: [
          { time: '07:00', available: true },
          { time: '08:00', available: true },
          { time: '09:00', available: false },
          { time: '13:00', available: true },
          { time: '14:00', available: true }
        ]
      },
      {
        day: 'Friday',
        slots: [
          { time: '08:00', available: true },
          { time: '09:00', available: true },
          { time: '10:00', available: true }
        ]
      }
    ]
  },
  {
    id: '5',
    name: 'Dr. Lisa Thompson',
    specialization: 'Neurology',
    profileImage: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=400',
    availability: 'On Leave',
    rating: 4.8,
    experience: 10,
    education: 'MD from UCLA Medical School',
    about: 'Dr. Thompson is a neurologist specializing in movement disorders and epilepsy. She uses cutting-edge diagnostic techniques and treatment approaches to help patients manage neurological conditions.',
    consultationFee: 200,
    schedule: []
  },
  {
    id: '6',
    name: 'Dr. Robert Kim',
    specialization: 'Internal Medicine',
    profileImage: 'https://images.pexels.com/photos/5327653/pexels-photo-5327653.jpeg?auto=compress&cs=tinysrgb&w=400',
    availability: 'Available Soon',
    rating: 4.6,
    experience: 7,
    education: 'MD from University of Chicago',
    about: 'Dr. Kim is an internist focusing on preventive medicine and chronic disease management. He takes a holistic approach to patient care and emphasizes lifestyle medicine.',
    consultationFee: 140,
    schedule: [
      {
        day: 'Wednesday',
        slots: [
          { time: '10:00', available: true },
          { time: '11:00', available: true },
          { time: '14:00', available: true },
          { time: '15:00', available: true }
        ]
      },
      {
        day: 'Thursday',
        slots: [
          { time: '09:00', available: true },
          { time: '10:00', available: true },
          { time: '13:00', available: true }
        ]
      }
    ]
  }
];