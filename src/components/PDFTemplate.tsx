import React from 'react';
import type { 
  TourOverviewData, 
  DayItinerary, 
  Hotel, 
  PaymentPlanData, 
  InclusionsExclusionsData 
} from '../store/itineraryStore';

interface PDFTemplateProps {
  tourOverview: TourOverviewData;
  dailyItinerary: DayItinerary[];
  hotels: Hotel[];
  paymentPlan: PaymentPlanData;
  inclusionsExclusions: InclusionsExclusionsData;
}

const PDFTemplate: React.FC<PDFTemplateProps> = ({
  tourOverview,
  dailyItinerary,
  hotels,
  paymentPlan,
  inclusionsExclusions
}) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD'
    }).format(amount);
  };

  return (
    <div id="pdf-template" className="w-full max-w-4xl mx-auto bg-white text-black" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div className="flex items-center justify-between border-b-4 border-blue-600 pb-6 mb-8">
        <div className="flex items-center">
          <img 
            src="/logo.png" 
            alt="Vigovia Logo" 
            className="h-16 w-16 mr-4"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div>
            <h1 className="text-3xl font-bold text-blue-600">VIGOVIA</h1>
            <p className="text-gray-600">Travel & Tourism</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Tour Code: {tourOverview.tourCode}</p>
          <p className="text-sm text-gray-600">Generated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Title Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{tourOverview.tripTitle}</h1>
        <div className="flex justify-center items-center gap-8 text-lg text-gray-600">
          <span><strong>Duration:</strong> {tourOverview.duration}</span>
          <span><strong>Travelers:</strong> {tourOverview.numberOfTravellers}</span>
          <span><strong>Type:</strong> {tourOverview.tourType}</span>
        </div>
      </div>

      {/* Trip Overview */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-blue-600 border-b border-gray-300 pb-2 mb-6">TRIP OVERVIEW</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <h3 className="font-semibold text-gray-700 mb-1">Departure From</h3>
              <p className="text-gray-900">{tourOverview.departureFrom}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold text-gray-700 mb-1">Destination</h3>
              <p className="text-gray-900">{tourOverview.destination}</p>
            </div>
          </div>
          <div>
            <div className="mb-4">
              <h3 className="font-semibold text-gray-700 mb-1">Departure Date</h3>
              <p className="text-gray-900">{formatDate(tourOverview.departureDate)}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold text-gray-700 mb-1">Return Date</h3>
              <p className="text-gray-900">{formatDate(tourOverview.arrivalDate)}</p>
            </div>
          </div>
        </div>
        
        {tourOverview.highlights && tourOverview.highlights.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold text-gray-700 mb-3">Tour Highlights</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-900">
              {tourOverview.highlights.map((highlight, index) => 
                highlight && <li key={index}>{highlight}</li>
              )}
            </ul>
          </div>
        )}
      </section>

      {/* Daily Itinerary */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-blue-600 border-b border-gray-300 pb-2 mb-6">DAILY ITINERARY</h2>
        {dailyItinerary.map((day) => (
          <div key={day.id} className="mb-8 border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Day {day.dayNumber}</h3>
              <div className="text-right">
                <p className="text-gray-600">{formatDate(day.date)}</p>
                <p className="text-gray-900 font-semibold">{day.city}</p>
              </div>
            </div>

            {/* Activities */}
            {day.activities && day.activities.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 mb-2">Activities</h4>
                {day.activities.map((activity) => (
                  <div key={activity.id} className="mb-3 pl-4 border-l-2 border-blue-200">
                    <div className="flex justify-between items-start mb-1">
                      <h5 className="font-medium text-gray-900">{activity.title}</h5>
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {activity.time} - {activity.type}
                      </span>
                    </div>
                    {activity.description && (
                      <p className="text-gray-600 text-sm mb-1">{activity.description}</p>
                    )}
                    {activity.location && (
                      <p className="text-gray-500 text-sm">📍 {activity.location}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Transportation */}
            {day.transportation && day.transportation.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 mb-2">Transportation</h4>
                {day.transportation.map((transport) => (
                  <div key={transport.id} className="mb-2 text-sm">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded mr-2">
                      {transport.type}
                    </span>
                    <span>{transport.from} → {transport.to}</span>
                    <span className="text-gray-500 ml-2">{transport.time}</span>
                    {transport.details && (
                      <p className="text-gray-600 mt-1 ml-2">{transport.details}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Meals */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              {day.meals.breakfast && (
                <div>
                  <h5 className="font-medium text-gray-700">🍽️ Breakfast</h5>
                  <p className="text-sm text-gray-900">{day.meals.breakfast}</p>
                </div>
              )}
              {day.meals.lunch && (
                <div>
                  <h5 className="font-medium text-gray-700">🥗 Lunch</h5>
                  <p className="text-sm text-gray-900">{day.meals.lunch}</p>
                </div>
              )}
              {day.meals.dinner && (
                <div>
                  <h5 className="font-medium text-gray-700">🍽️ Dinner</h5>
                  <p className="text-sm text-gray-900">{day.meals.dinner}</p>
                </div>
              )}
            </div>

            {/* Accommodation */}
            {day.accommodation && (
              <div>
                <h5 className="font-medium text-gray-700">🏨 Accommodation</h5>
                <p className="text-sm text-gray-900">{day.accommodation}</p>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Hotel Details */}
      {hotels && hotels.length > 0 && hotels[0]?.name && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-blue-600 border-b border-gray-300 pb-2 mb-6">HOTEL DETAILS</h2>
          {hotels.map((hotel) => hotel.name && (
            <div key={hotel.id} className="mb-6 border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{hotel.name}</h3>
                  <p className="text-gray-600">{hotel.address}, {hotel.city}</p>
                  <div className="flex items-center mt-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < hotel.rating ? 'text-yellow-400' : 'text-gray-300'}>
                          ⭐
                        </span>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">({hotel.rating} Star)</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Check-in: {formatDate(hotel.checkInDate)}</p>
                  <p className="text-sm text-gray-600">Check-out: {formatDate(hotel.checkOutDate)}</p>
                  <p className="font-semibold">{hotel.numberOfNights} nights</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-semibold text-gray-700">Room Details</h4>
                  <p className="text-sm">Type: {hotel.roomType}</p>
                  <p className="text-sm">Rooms: {hotel.numberOfRooms}</p>
                  {hotel.pricePerNight > 0 && (
                    <p className="text-sm">Rate: {formatCurrency(hotel.pricePerNight, hotel.currency)}/night</p>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700">Contact</h4>
                  {hotel.contactNumber && <p className="text-sm">📞 {hotel.contactNumber}</p>}
                  {hotel.email && <p className="text-sm">📧 {hotel.email}</p>}
                  {hotel.bookingReference && <p className="text-sm">Ref: {hotel.bookingReference}</p>}
                </div>
              </div>

              {hotel.amenities && hotel.amenities.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Amenities</h4>
                  <div className="flex flex-wrap gap-2">
                    {hotel.amenities.map((amenity, index) => (
                      <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {hotel.notes && (
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Notes</h4>
                  <p className="text-sm text-gray-600">{hotel.notes}</p>
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Inclusions & Exclusions */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-blue-600 border-b border-gray-300 pb-2 mb-6">INCLUSIONS & EXCLUSIONS</h2>
        
        <div className="grid grid-cols-2 gap-8">
          {/* Inclusions */}
          <div>
            <h3 className="text-xl font-semibold text-green-600 mb-4">✅ INCLUSIONS</h3>
            {inclusionsExclusions.inclusions && inclusionsExclusions.inclusions.length > 0 ? (
              <ul className="space-y-2">
                {inclusionsExclusions.inclusions.map((inclusion) => inclusion.details && (
                  <li key={inclusion.id} className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <div>
                      {inclusion.category && (
                        <span className="font-medium text-gray-700">{inclusion.category}: </span>
                      )}
                      <span className="text-gray-900">{inclusion.details}</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No inclusions specified</p>
            )}
          </div>

          {/* Exclusions */}
          <div>
            <h3 className="text-xl font-semibold text-red-600 mb-4">❌ EXCLUSIONS</h3>
            {inclusionsExclusions.exclusions && inclusionsExclusions.exclusions.length > 0 ? (
              <ul className="space-y-2">
                {inclusionsExclusions.exclusions.map((exclusion) => exclusion.details && (
                  <li key={exclusion.id} className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">✗</span>
                    <div>
                      {exclusion.category && (
                        <span className="font-medium text-gray-700">{exclusion.category}: </span>
                      )}
                      <span className="text-gray-900">{exclusion.details}</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No exclusions specified</p>
            )}
          </div>
        </div>

        {/* Important Notes */}
        {inclusionsExclusions.importantNotes && inclusionsExclusions.importantNotes.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-orange-600 mb-4">⚠️ IMPORTANT NOTES</h3>
            <div className="space-y-3">
              {inclusionsExclusions.importantNotes.map((note) => (
                <div key={note.id} className={`p-4 rounded-lg border-l-4 ${
                  note.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                  note.type === 'important' ? 'bg-red-50 border-red-400' :
                  'bg-blue-50 border-blue-400'
                }`}>
                  <h4 className="font-semibold text-gray-800">{note.title}</h4>
                  <p className="text-gray-700 text-sm mt-1">{note.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Payment Plan */}
      {paymentPlan.totalAmount > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-blue-600 border-b border-gray-300 pb-2 mb-6">PAYMENT PLAN</h2>
          
          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <h3 className="text-2xl font-bold text-blue-600">
                  {formatCurrency(paymentPlan.totalAmount, paymentPlan.currency)}
                </h3>
                <p className="text-gray-600">Total Amount</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-blue-600">{paymentPlan.numberOfInstallments}</h3>
                <p className="text-gray-600">Installments</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-blue-600">
                  {paymentPlan.installments.length > 0 ? 
                    formatCurrency(paymentPlan.totalAmount / paymentPlan.numberOfInstallments, paymentPlan.currency) : 
                    formatCurrency(0, paymentPlan.currency)
                  }
                </h3>
                <p className="text-gray-600">Avg. Installment</p>
              </div>
            </div>
          </div>

          {/* Installments Table */}
          {paymentPlan.installments && paymentPlan.installments.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Payment Schedule</h3>
              <div className="overflow-hidden border border-gray-200 rounded-lg">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Installment</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Due Date</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-700">Amount</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentPlan.installments.map((installment, index) => (
                      <tr key={installment.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 text-gray-900">{installment.description}</td>
                        <td className="px-4 py-3 text-gray-900">{formatDate(installment.dueDate)}</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-900">
                          {formatCurrency(installment.amount, paymentPlan.currency)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            installment.status === 'Paid' ? 'bg-green-100 text-green-800' :
                            installment.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {installment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Additional Fees */}
          {paymentPlan.additionalFees && paymentPlan.additionalFees.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Additional Fees</h3>
              <div className="space-y-2">
                {paymentPlan.additionalFees.map((fee, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <span className="font-medium text-gray-900">{fee.name}</span>
                      {fee.description && (
                        <p className="text-sm text-gray-600">{fee.description}</p>
                      )}
                    </div>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(fee.amount, paymentPlan.currency)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Terms and Conditions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {paymentPlan.paymentTerms && (
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Payment Terms</h4>
                <p className="text-gray-600">{paymentPlan.paymentTerms}</p>
              </div>
            )}
            {paymentPlan.refundPolicy && (
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Refund Policy</h4>
                <p className="text-gray-600">{paymentPlan.refundPolicy}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t-2 border-blue-600 pt-6 mt-10">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-gray-800 mb-2">VIGOVIA Travel & Tourism</h3>
            <p className="text-sm text-gray-600 mb-1">Creating Unforgettable Travel Experiences</p>
            <p className="text-sm text-gray-600">📧 info@vigovia.com</p>
            <p className="text-sm text-gray-600">📞 +1 (555) 123-4567</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 mb-1">Generated on: {new Date().toLocaleString()}</p>
            <p className="text-sm text-gray-600">Document ID: {tourOverview.tourCode || 'VGV-' + Date.now()}</p>
            <p className="text-xs text-gray-500 mt-2">
              This itinerary is subject to change based on availability and weather conditions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PDFTemplate;
