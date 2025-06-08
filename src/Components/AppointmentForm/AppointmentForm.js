import React, { useState } from 'react'
import './AppointmentForm.css';


const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [timeslot, setTimeslot] = useState('');
    const [selectedSlot, setSelectedSlot] = useState(null);
  
    const handleSlotSelection = (slot) => {
      setSelectedSlot(slot);
    };
  

    const generateTimeSlots = () => {
        const slots = [];
        for (let hour = 9; hour < 19; hour++) {
        slots.push(`${hour.toString().padStart(2, '0')}:00`);
        slots.push(`${hour.toString().padStart(2, '0')}:30`);
        }
        slots.push("19:00"); // include final slot
        return slots;
    };

  const timeOptions = generateTimeSlots();

    const handleFormSubmit = (e) => {
      e.preventDefault();
      onSubmit({ name, phoneNumber, appointmentDate, timeslot });
      setName('');
      setPhoneNumber('');
      setAppointmentDate('');
      setTimeslot('');
    };
  
    return (
      <form onSubmit={handleFormSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        {/* Additions start here */}
        <div className="form-group">
          <label htmlFor="appointmentDate">Appointment Date:</label>
          <input
            type="date"
            id="appointmentDate"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="timeslot">Book a timeslot:</label>
          <input
            type="time"
            id="timeslot"
            value={timeslot}
            onChange={(e) => setTimeslot(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
        <label htmlFor="timeslot">Book a timeslot:</label>
        <select
          id="timeslot"
          value={timeslot}
          onChange={(e) => setTimeslot(e.target.value)}
          required
        >
          <option value="">-- Select a time --</option>
          {timeOptions.map((slot) => (
            <option key={slot} value={slot}>{slot}</option>
          ))}
        </select>
      </div>

        <button type="submit">Book Now</button>
      </form>
    );
  };

export default AppointmentForm
