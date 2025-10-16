import React from 'react';

const HotelBookings: React.FC = () => {
  return (
    <div className="card mb-4">
      <div className="card-header">
        <h2>Hotel Bookings</h2>
      </div>
      <div className="card-body">
        <div className="row align-items-end mb-3">
          <div className="col-md-2">
            <label className="form-label">City</label>
            <input type="text" className="form-control" placeholder="e.g., Singapore" />
          </div>
          <div className="col-md-2">
            <label className="form-label">Check In</label>
            <input type="date" className="form-control" />
          </div>
          <div className="col-md-2">
            <label className="form-label">Check Out</label>
            <input type="date" className="form-control" />
          </div>
          <div className="col-md-1">
            <label className="form-label">Nights</label>
            <input type="number" className="form-control" placeholder="e.g., 2" />
          </div>
          <div className="col-md-4">
            <label className="form-label">Hotel Name</label>
            <input type="text" className="form-control" placeholder="e.g., Super Townhouse Oak" />
          </div>
          <div className="col-md-1">
            <button className="btn btn-sm btn-danger">X</button>
          </div>
        </div>
        <button className="btn btn-primary">Add Hotel</button>
        <div className="mt-3">
          <h5>Important Notes</h5>
          <textarea className="form-control" rows={4} placeholder="1. All Hotels Are Tentative and Can Be Replaced With Similar.
2. Breakfast Included For All Hotel Stays.
3. All Hotels Will Be 4* And Above Category
4. A maximum occupancy of 2 people/room is allowed in most hotels."></textarea>
        </div>
      </div>
    </div>
  );
};

export default HotelBookings;
