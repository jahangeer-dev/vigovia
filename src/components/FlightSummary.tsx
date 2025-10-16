import React from 'react';

const FlightSummary: React.FC = () => {
  return (
    <div className="card mb-4">
      <div className="card-header">
        <h2>Flight Summary</h2>
      </div>
      <div className="card-body">
        <div className="row align-items-end mb-3">
          <div className="col-md-3">
            <label className="form-label">Date</label>
            <input type="date" className="form-control" />
          </div>
          <div className="col-md-8">
            <label className="form-label">Flight Details</label>
            <input type="text" className="form-control" placeholder="e.g., Fly Air India (AX-123) From Delhi (DEL) To Singapore (SIN)" />
          </div>
          <div className="col-md-1">
            <button className="btn btn-sm btn-danger">X</button>
          </div>
        </div>
        <button className="btn btn-primary">Add Flight</button>
        <div className="form-text mt-3">Note: All Flights Include Meals, Seat Choice (Excluding XL), And 20kg/25Kg Checked Baggage.</div>
      </div>
    </div>
  );
};

export default FlightSummary;
