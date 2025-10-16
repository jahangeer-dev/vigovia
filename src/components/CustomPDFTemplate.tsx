import React from 'react';
import type { 
  TourOverviewData, 
  DayItinerary, 
  Hotel, 
  PaymentPlanData, 
  InclusionsExclusionsData 
} from '../store/itineraryStore';

interface CustomPDFTemplateProps {
  tourOverview: TourOverviewData;
  dailyItinerary: DayItinerary[];
  hotels: Hotel[];
  paymentPlan: PaymentPlanData;
  inclusionsExclusions: InclusionsExclusionsData;
}

const CustomPDFTemplate: React.FC<CustomPDFTemplateProps> = ({
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
    <div 
      id="custom-pdf-template" 
      style={{
        fontFamily: 'Arial, sans-serif',
        backgroundColor: 'white',
        color: 'black',
        width: '800px',
        margin: '0 auto',
        padding: '40px',
        lineHeight: '1.4',
        fontSize: '14px'
      }}
    >
      {/* Header Section */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px',
        borderBottom: '4px solid #2563eb',
        paddingBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src="/logo.png" 
            alt="Vigovia Logo" 
            style={{ height: '80px', width: '80px', marginRight: '20px' }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div>
            <h1 style={{ 
              fontSize: '32px', 
              fontWeight: 'bold', 
              color: '#2563eb', 
              margin: '0 0 8px 0' 
            }}>
              VIGOVIA
            </h1>
            <p style={{ 
              fontSize: '16px', 
              color: '#666', 
              margin: '0',
              fontStyle: 'italic'
            }}>
              Creating Unforgettable Travel Experiences
            </p>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ 
            fontSize: '12px', 
            color: '#666', 
            margin: '0 0 4px 0' 
          }}>
            Tour Code: <strong>{tourOverview.tourCode || 'VGV-' + Date.now()}</strong>
          </p>
          <p style={{ 
            fontSize: '12px', 
            color: '#666', 
            margin: '0' 
          }}>
            Generated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Title Section */}
      <div style={{
        textAlign: 'center',
        marginBottom: '50px',
        backgroundColor: '#f8fafc',
        padding: '30px',
        borderRadius: '12px',
        border: '1px solid #e2e8f0'
      }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: 'bold',
          color: '#1a202c',
          margin: '0 0 20px 0',
          lineHeight: '1.2'
        }}>
          {tourOverview.tripTitle}
        </h1>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '30px',
          marginTop: '20px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🗓️</div>
            <p style={{ fontSize: '14px', color: '#666', margin: '0 0 4px 0' }}>Duration</p>
            <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#1a202c', margin: '0' }}>
              {tourOverview.duration}
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>👥</div>
            <p style={{ fontSize: '14px', color: '#666', margin: '0 0 4px 0' }}>Travelers</p>
            <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#1a202c', margin: '0' }}>
              {tourOverview.numberOfTravellers}
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>✈️</div>
            <p style={{ fontSize: '14px', color: '#666', margin: '0 0 4px 0' }}>Tour Type</p>
            <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#1a202c', margin: '0' }}>
              {tourOverview.tourType}
            </p>
          </div>
        </div>
      </div>

      {/* Trip Overview Section */}
      <section style={{ marginBottom: '50px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#2563eb',
          borderBottom: '2px solid #2563eb',
          paddingBottom: '8px',
          marginBottom: '30px'
        }}>
          TRIP OVERVIEW
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          marginBottom: '30px'
        }}>
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ 
                fontSize: '16px', 
                fontWeight: '600', 
                color: '#374151', 
                margin: '0 0 8px 0' 
              }}>
                📍 Departure From
              </h3>
              <p style={{ 
                fontSize: '15px', 
                color: '#1a202c', 
                margin: '0',
                fontWeight: '500' 
              }}>
                {tourOverview.departureFrom}
              </p>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ 
                fontSize: '16px', 
                fontWeight: '600', 
                color: '#374151', 
                margin: '0 0 8px 0' 
              }}>
                🎯 Destination
              </h3>
              <p style={{ 
                fontSize: '15px', 
                color: '#1a202c', 
                margin: '0',
                fontWeight: '500' 
              }}>
                {tourOverview.destination}
              </p>
            </div>
          </div>
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ 
                fontSize: '16px', 
                fontWeight: '600', 
                color: '#374151', 
                margin: '0 0 8px 0' 
              }}>
                🛫 Departure Date
              </h3>
              <p style={{ 
                fontSize: '15px', 
                color: '#1a202c', 
                margin: '0',
                fontWeight: '500' 
              }}>
                {formatDate(tourOverview.departureDate)}
              </p>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ 
                fontSize: '16px', 
                fontWeight: '600', 
                color: '#374151', 
                margin: '0 0 8px 0' 
              }}>
                🛬 Return Date
              </h3>
              <p style={{ 
                fontSize: '15px', 
                color: '#1a202c', 
                margin: '0',
                fontWeight: '500' 
              }}>
                {formatDate(tourOverview.arrivalDate)}
              </p>
            </div>
          </div>
        </div>

        {/* Tour Highlights */}
        {tourOverview.highlights && tourOverview.highlights.length > 0 && tourOverview.highlights.some(h => h) && (
          <div style={{
            backgroundColor: '#f0f9ff',
            padding: '25px',
            borderRadius: '8px',
            border: '1px solid #0ea5e9'
          }}>
            <h3 style={{ 
              fontSize: '18px', 
              fontWeight: '600', 
              color: '#0c4a6e', 
              margin: '0 0 15px 0' 
            }}>
              ✨ Tour Highlights
            </h3>
            <ul style={{ 
              margin: '0', 
              paddingLeft: '20px',
              listStyleType: 'none'
            }}>
              {tourOverview.highlights.filter(h => h).map((highlight, index) => (
                <li key={index} style={{ 
                  color: '#1a202c', 
                  marginBottom: '8px',
                  fontSize: '15px',
                  position: 'relative',
                  paddingLeft: '24px'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: '0',
                    color: '#0ea5e9',
                    fontWeight: 'bold'
                  }}>
                    →
                  </span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Daily Itinerary Section */}
      <section style={{ marginBottom: '50px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#2563eb',
          borderBottom: '2px solid #2563eb',
          paddingBottom: '8px',
          marginBottom: '30px'
        }}>
          DAILY ITINERARY
        </h2>
        
        {dailyItinerary.map((day) => (
          <div key={day.id} style={{
            marginBottom: '40px',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: '#fff'
          }}>
            {/* Day Header */}
            <div style={{
              backgroundColor: '#1e40af',
              color: 'white',
              padding: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold', 
                  margin: '0 0 4px 0' 
                }}>
                  Day {day.dayNumber}
                </h3>
                <p style={{ 
                  fontSize: '16px', 
                  margin: '0',
                  opacity: '0.9'
                }}>
                  {day.city}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ 
                  fontSize: '14px', 
                  margin: '0',
                  opacity: '0.8'
                }}>
                  {formatDate(day.date)}
                </p>
              </div>
            </div>

            <div style={{ padding: '25px' }}>
              {/* Activities */}
              {day.activities && day.activities.length > 0 && (
                <div style={{ marginBottom: '25px' }}>
                  <h4 style={{ 
                    fontSize: '18px', 
                    fontWeight: '600', 
                    color: '#374151', 
                    margin: '0 0 15px 0' 
                  }}>
                    🎯 Activities
                  </h4>
                  {day.activities.map((activity) => (
                    <div key={activity.id} style={{
                      marginBottom: '15px',
                      paddingLeft: '20px',
                      borderLeft: '3px solid #3b82f6',
                      backgroundColor: '#f8fafc',
                      padding: '15px 15px 15px 25px',
                      borderRadius: '0 8px 8px 0'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'start',
                        marginBottom: '8px'
                      }}>
                        <h5 style={{ 
                          fontSize: '16px', 
                          fontWeight: '600', 
                          color: '#1a202c', 
                          margin: '0' 
                        }}>
                          {activity.title}
                        </h5>
                        <span style={{
                          fontSize: '12px',
                          backgroundColor: '#dbeafe',
                          color: '#1e40af',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          whiteSpace: 'nowrap',
                          marginLeft: '15px'
                        }}>
                          {activity.time} • {activity.type}
                        </span>
                      </div>
                      {activity.description && (
                        <p style={{ 
                          fontSize: '14px', 
                          color: '#666', 
                          margin: '0 0 8px 0' 
                        }}>
                          {activity.description}
                        </p>
                      )}
                      {activity.location && (
                        <p style={{ 
                          fontSize: '13px', 
                          color: '#9ca3af', 
                          margin: '0' 
                        }}>
                          📍 {activity.location}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Transportation */}
              {day.transportation && day.transportation.length > 0 && (
                <div style={{ marginBottom: '25px' }}>
                  <h4 style={{ 
                    fontSize: '18px', 
                    fontWeight: '600', 
                    color: '#374151', 
                    margin: '0 0 15px 0' 
                  }}>
                    🚗 Transportation
                  </h4>
                  {day.transportation.map((transport) => (
                    <div key={transport.id} style={{
                      marginBottom: '10px',
                      fontSize: '14px',
                      backgroundColor: '#f0fdf4',
                      padding: '12px',
                      borderRadius: '6px',
                      border: '1px solid #bbf7d0'
                    }}>
                      <span style={{
                        backgroundColor: '#dcfce7',
                        color: '#166534',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '600',
                        marginRight: '10px'
                      }}>
                        {transport.type}
                      </span>
                      <span style={{ fontWeight: '500' }}>
                        {transport.from} → {transport.to}
                      </span>
                      <span style={{ color: '#9ca3af', marginLeft: '10px' }}>
                        {transport.time}
                      </span>
                      {transport.details && (
                        <p style={{ 
                          color: '#666', 
                          margin: '8px 0 0 0', 
                          fontSize: '13px' 
                        }}>
                          {transport.details}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Meals */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '15px',
                marginBottom: '25px'
              }}>
                {day.meals.breakfast && (
                  <div style={{
                    backgroundColor: '#fef3c7',
                    padding: '15px',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>🍳</div>
                    <h5 style={{ 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      color: '#92400e', 
                      margin: '0 0 4px 0' 
                    }}>
                      Breakfast
                    </h5>
                    <p style={{ 
                      fontSize: '13px', 
                      color: '#451a03', 
                      margin: '0' 
                    }}>
                      {day.meals.breakfast}
                    </p>
                  </div>
                )}
                {day.meals.lunch && (
                  <div style={{
                    backgroundColor: '#fed7d7',
                    padding: '15px',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>🥗</div>
                    <h5 style={{ 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      color: '#c53030', 
                      margin: '0 0 4px 0' 
                    }}>
                      Lunch
                    </h5>
                    <p style={{ 
                      fontSize: '13px', 
                      color: '#742a2a', 
                      margin: '0' 
                    }}>
                      {day.meals.lunch}
                    </p>
                  </div>
                )}
                {day.meals.dinner && (
                  <div style={{
                    backgroundColor: '#e0e7ff',
                    padding: '15px',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>🍽️</div>
                    <h5 style={{ 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      color: '#3730a3', 
                      margin: '0 0 4px 0' 
                    }}>
                      Dinner
                    </h5>
                    <p style={{ 
                      fontSize: '13px', 
                      color: '#1e1b4b', 
                      margin: '0' 
                    }}>
                      {day.meals.dinner}
                    </p>
                  </div>
                )}
              </div>

              {/* Accommodation */}
              {day.accommodation && (
                <div style={{
                  backgroundColor: '#f3e8ff',
                  padding: '15px',
                  borderRadius: '8px',
                  border: '1px solid #c084fc'
                }}>
                  <h5 style={{ 
                    fontSize: '16px', 
                    fontWeight: '600', 
                    color: '#6b21a8', 
                    margin: '0 0 8px 0' 
                  }}>
                    🏨 Accommodation
                  </h5>
                  <p style={{ 
                    fontSize: '14px', 
                    color: '#581c87', 
                    margin: '0' 
                  }}>
                    {day.accommodation}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Hotels Section */}
      {hotels && hotels.length > 0 && hotels.some(h => h.name) && (
        <section style={{ marginBottom: '50px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#2563eb',
            borderBottom: '2px solid #2563eb',
            paddingBottom: '8px',
            marginBottom: '30px'
          }}>
            HOTEL DETAILS
          </h2>
          
          {hotels.filter(hotel => hotel.name).map((hotel) => (
            <div key={hotel.id} style={{
              marginBottom: '30px',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '25px',
              backgroundColor: '#fff'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start',
                marginBottom: '20px'
              }}>
                <div>
                  <h3 style={{ 
                    fontSize: '20px', 
                    fontWeight: 'bold', 
                    color: '#1a202c', 
                    margin: '0 0 8px 0' 
                  }}>
                    {hotel.name}
                  </h3>
                  <p style={{ 
                    fontSize: '14px', 
                    color: '#666', 
                    margin: '0 0 10px 0' 
                  }}>
                    📍 {hotel.address}, {hotel.city}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ color: '#fbbf24', marginRight: '8px' }}>
                      {'★'.repeat(hotel.rating)}{'☆'.repeat(5 - hotel.rating)}
                    </div>
                    <span style={{ fontSize: '14px', color: '#666' }}>
                      ({hotel.rating} Star Hotel)
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '14px', color: '#666', margin: '0' }}>
                    Check-in: <strong>{formatDate(hotel.checkInDate)}</strong>
                  </p>
                  <p style={{ fontSize: '14px', color: '#666', margin: '0' }}>
                    Check-out: <strong>{formatDate(hotel.checkOutDate)}</strong>
                  </p>
                  <p style={{ fontSize: '16px', fontWeight: '600', margin: '8px 0 0 0' }}>
                    {hotel.numberOfNights} nights
                  </p>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '25px',
                marginBottom: '20px'
              }}>
                <div>
                  <h4 style={{ 
                    fontSize: '16px', 
                    fontWeight: '600', 
                    color: '#374151', 
                    margin: '0 0 12px 0' 
                  }}>
                    🛏️ Room Details
                  </h4>
                  <p style={{ fontSize: '14px', margin: '0 0 4px 0' }}>
                    <strong>Type:</strong> {hotel.roomType}
                  </p>
                  <p style={{ fontSize: '14px', margin: '0 0 4px 0' }}>
                    <strong>Rooms:</strong> {hotel.numberOfRooms}
                  </p>
                  {hotel.pricePerNight > 0 && (
                    <p style={{ fontSize: '14px', margin: '0' }}>
                      <strong>Rate:</strong> {formatCurrency(hotel.pricePerNight, hotel.currency)}/night
                    </p>
                  )}
                </div>
                <div>
                  <h4 style={{ 
                    fontSize: '16px', 
                    fontWeight: '600', 
                    color: '#374151', 
                    margin: '0 0 12px 0' 
                  }}>
                    📞 Contact Information
                  </h4>
                  {hotel.contactNumber && (
                    <p style={{ fontSize: '14px', margin: '0 0 4px 0' }}>
                      <strong>Phone:</strong> {hotel.contactNumber}
                    </p>
                  )}
                  {hotel.email && (
                    <p style={{ fontSize: '14px', margin: '0 0 4px 0' }}>
                      <strong>Email:</strong> {hotel.email}
                    </p>
                  )}
                  {hotel.bookingReference && (
                    <p style={{ fontSize: '14px', margin: '0' }}>
                      <strong>Booking Ref:</strong> {hotel.bookingReference}
                    </p>
                  )}
                </div>
              </div>

              {hotel.amenities && hotel.amenities.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ 
                    fontSize: '16px', 
                    fontWeight: '600', 
                    color: '#374151', 
                    margin: '0 0 12px 0' 
                  }}>
                    ✨ Amenities
                  </h4>
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '8px' 
                  }}>
                    {hotel.amenities.map((amenity, index) => (
                      <span key={index} style={{
                        backgroundColor: '#eff6ff',
                        color: '#1d4ed8',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        fontSize: '13px',
                        fontWeight: '500'
                      }}>
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {hotel.notes && (
                <div style={{
                  backgroundColor: '#f9fafb',
                  padding: '15px',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb'
                }}>
                  <h4 style={{ 
                    fontSize: '16px', 
                    fontWeight: '600', 
                    color: '#374151', 
                    margin: '0 0 8px 0' 
                  }}>
                    📝 Notes
                  </h4>
                  <p style={{ 
                    fontSize: '14px', 
                    color: '#666', 
                    margin: '0' 
                  }}>
                    {hotel.notes}
                  </p>
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Payment Plan Section */}
      {paymentPlan && (paymentPlan.totalAmount > 0 || paymentPlan.installments.length > 0) && (
        <section style={{ marginBottom: '50px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#2563eb',
            borderBottom: '2px solid #2563eb',
            paddingBottom: '8px',
            marginBottom: '30px'
          }}>
            PAYMENT PLAN
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '30px',
            marginBottom: '30px'
          }}>
            <div style={{
              backgroundColor: '#f0f9ff',
              padding: '25px',
              borderRadius: '12px',
              border: '1px solid #0ea5e9'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#0c4a6e',
                margin: '0 0 15px 0'
              }}>
                💰 Total Amount
              </h3>
              <p style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#1a202c',
                margin: '0'
              }}>
                {formatCurrency(paymentPlan.totalAmount, paymentPlan.currency || 'USD')}
              </p>
              <p style={{
                fontSize: '14px',
                color: '#666',
                margin: '8px 0 0 0'
              }}>
                For {tourOverview.numberOfTravellers} travelers
              </p>
            </div>

            <div style={{
              backgroundColor: '#f0fdf4',
              padding: '25px',
              borderRadius: '12px',
              border: '1px solid #16a34a'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#166534',
                margin: '0 0 15px 0'
              }}>
                📅 Payment Schedule
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#1a202c',
                margin: '0 0 8px 0'
              }}>
                {paymentPlan.installments.length} Installments
              </p>
              <p style={{
                fontSize: '14px',
                color: '#666',
                margin: '0'
              }}>
                Flexible payment options available
              </p>
            </div>
          </div>

          {paymentPlan.installments && paymentPlan.installments.length > 0 && (
            <div style={{
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              overflow: 'hidden'
            }}>
              <div style={{
                backgroundColor: '#f9fafb',
                padding: '20px',
                fontWeight: 'bold',
                fontSize: '16px',
                color: '#374151',
                borderBottom: '1px solid #e5e7eb'
              }}>
                Payment Schedule Details
              </div>
              {paymentPlan.installments.map((installment) => (
                <div key={installment.id} style={{
                  padding: '20px',
                  borderBottom: '1px solid #f3f4f6',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <h4 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#1a202c',
                      margin: '0 0 8px 0'
                    }}>
                      {installment.description}
                    </h4>
                    <p style={{
                      fontSize: '14px',
                      color: '#666',
                      margin: '0'
                    }}>
                      Due: {formatDate(installment.dueDate)}
                    </p>
                    {installment.description && (
                      <p style={{
                        fontSize: '13px',
                        color: '#9ca3af',
                        margin: '4px 0 0 0'
                      }}>
                        {installment.description}
                      </p>
                    )}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: '#1a202c',
                      margin: '0'
                    }}>
                      {formatCurrency(installment.amount, paymentPlan.currency || 'USD')}
                    </p>
                    <p style={{
                      fontSize: '12px',
                      color: '#666',
                      margin: '4px 0 0 0'
                    }}>
                      {((installment.amount / paymentPlan.totalAmount) * 100).toFixed(0)}% of total
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {paymentPlan.paymentTerms && (
            <div style={{
              backgroundColor: '#fef3c7',
              padding: '20px',
              borderRadius: '8px',
              marginTop: '25px'
            }}>
              <h4 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#92400e',
                margin: '0 0 10px 0'
              }}>
                ⚠️ Payment Terms & Conditions
              </h4>
              <p style={{
                fontSize: '14px',
                color: '#451a03',
                margin: '0'
              }}>
                {paymentPlan.paymentTerms}
              </p>
            </div>
          )}
        </section>
      )}

      {/* Inclusions & Exclusions Section */}
      {inclusionsExclusions && (inclusionsExclusions.inclusions.length > 0 || inclusionsExclusions.exclusions.length > 0) && (
        <section style={{ marginBottom: '50px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#2563eb',
            borderBottom: '2px solid #2563eb',
            paddingBottom: '8px',
            marginBottom: '30px'
          }}>
            INCLUSIONS & EXCLUSIONS
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '30px'
          }}>
            {/* Inclusions */}
            {inclusionsExclusions.inclusions.length > 0 && (
              <div style={{
                backgroundColor: '#f0fdf4',
                padding: '25px',
                borderRadius: '12px',
                border: '1px solid #16a34a'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#166534',
                  margin: '0 0 20px 0',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  ✅ What's Included
                </h3>
                <ul style={{
                  margin: '0',
                  paddingLeft: '0',
                  listStyleType: 'none'
                }}>
                  {inclusionsExclusions.inclusions.map((inclusion, index) => (
                    <li key={index} style={{
                      color: '#1a202c',
                      marginBottom: '12px',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'start',
                      paddingLeft: '0'
                    }}>
                      <span style={{
                        color: '#16a34a',
                        marginRight: '12px',
                        fontSize: '16px',
                        lineHeight: '1',
                        marginTop: '2px'
                      }}>
                        ✓
                      </span>
                      <span>{inclusion.details}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Exclusions */}
            {inclusionsExclusions.exclusions.length > 0 && (
              <div style={{
                backgroundColor: '#fef2f2',
                padding: '25px',
                borderRadius: '12px',
                border: '1px solid #ef4444'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#dc2626',
                  margin: '0 0 20px 0',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  ❌ What's Not Included
                </h3>
                <ul style={{
                  margin: '0',
                  paddingLeft: '0',
                  listStyleType: 'none'
                }}>
                  {inclusionsExclusions.exclusions.map((exclusion, index) => (
                    <li key={index} style={{
                      color: '#1a202c',
                      marginBottom: '12px',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'start',
                      paddingLeft: '0'
                    }}>
                      <span style={{
                        color: '#ef4444',
                        marginRight: '12px',
                        fontSize: '16px',
                        lineHeight: '1',
                        marginTop: '2px'
                      }}>
                        ✗
                      </span>
                      <span>{exclusion.details}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Important Notes */}
          {inclusionsExclusions.importantNotes && inclusionsExclusions.importantNotes.length > 0 && (
            <div style={{
              backgroundColor: '#fefbf3',
              padding: '25px',
              borderRadius: '12px',
              border: '1px solid #f59e0b',
              marginTop: '30px'
            }}>
              <h4 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#d97706',
                margin: '0 0 15px 0'
              }}>
                📌 Important Notes
              </h4>
              <div style={{ fontSize: '14px', color: '#78350f', lineHeight: '1.6' }}>
                {inclusionsExclusions.importantNotes.map((note) => (
                  <div key={note.id} style={{ marginBottom: '12px' }}>
                    <h5 style={{
                      fontSize: '15px',
                      fontWeight: '600',
                      color: '#d97706',
                      margin: '0 0 4px 0'
                    }}>
                      {note.title}
                    </h5>
                    <p style={{ margin: '0', fontSize: '14px' }}>
                      {note.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Continue with other sections... */}
      {/* I'll add the rest in the next part to keep it manageable */}
      
      {/* Footer */}
      <footer style={{
        borderTop: '3px solid #2563eb',
        paddingTop: '25px',
        marginTop: '50px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px'
      }}>
        <div>
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: 'bold', 
            color: '#1a202c', 
            margin: '0 0 12px 0' 
          }}>
            VIGOVIA Travel & Tourism
          </h3>
          <p style={{ 
            fontSize: '14px', 
            color: '#666', 
            margin: '0 0 8px 0' 
          }}>
            Creating Unforgettable Travel Experiences
          </p>
          <p style={{ 
            fontSize: '14px', 
            color: '#666', 
            margin: '0 0 4px 0' 
          }}>
            📧 info@vigovia.com
          </p>
          <p style={{ 
            fontSize: '14px', 
            color: '#666', 
            margin: '0' 
          }}>
            📞 +1 (555) 123-4567
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ 
            fontSize: '14px', 
            color: '#666', 
            margin: '0 0 8px 0' 
          }}>
            Generated on: {new Date().toLocaleString()}
          </p>
          <p style={{ 
            fontSize: '14px', 
            color: '#666', 
            margin: '0 0 15px 0' 
          }}>
            Document ID: {tourOverview.tourCode || 'VGV-' + Date.now()}
          </p>
          <p style={{ 
            fontSize: '12px', 
            color: '#9ca3af', 
            margin: '0',
            fontStyle: 'italic' 
          }}>
            This itinerary is subject to change based on availability and weather conditions.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CustomPDFTemplate;
