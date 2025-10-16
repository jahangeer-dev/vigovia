// Demonstration data for testing PDF generation
// This file contains sample data that can be used to test the PDF generation functionality

export const sampleItineraryData = {
  tourOverview: {
    tripTitle: "Magical Turkey Discovery Tour",
    duration: "8 Days / 7 Nights",
    departureFrom: "New York City",
    destination: "Istanbul, Cappadocia & Pamukkale",
    departureDate: "2024-11-15",
    arrivalDate: "2024-11-22",
    numberOfTravellers: 4,
    tourCode: "VGV-TUR-001",
    tourType: "Cultural & Historical",
    highlights: [
      "Explore the magnificent Hagia Sophia and Blue Mosque",
      "Experience hot air balloon ride over Cappadocia",
      "Visit the stunning white travertine pools of Pamukkale",
      "Discover underground cities and fairy chimneys",
      "Enjoy Turkish cuisine and cultural experiences",
      "Stay in premium hotels with authentic Turkish hospitality"
    ]
  },

  dailyItinerary: [
    {
      id: "1",
      dayNumber: 1,
      date: "2024-11-15",
      city: "Istanbul",
      activities: [
        {
          id: "1-1",
          time: "09:00",
          type: "Morning",
          title: "Airport Transfer & Hotel Check-in",
          description: "Meet and greet at Istanbul Airport, transfer to hotel",
          location: "Hotel in Sultanahmet District"
        },
        {
          id: "1-2",
          time: "14:00",
          type: "Afternoon",
          title: "Sultanahmet Walking Tour",
          description: "Explore the historic heart of Istanbul including exterior views of major monuments",
          location: "Sultanahmet Square"
        },
        {
          id: "1-3",
          time: "19:00",
          type: "Evening",
          title: "Welcome Dinner",
          description: "Traditional Turkish cuisine with folk show",
          location: "Local Restaurant"
        }
      ],
      transportation: [
        {
          id: "t-1-1",
          type: "Transfer",
          from: "Istanbul Airport",
          to: "Hotel Sultanahmet",
          time: "09:00",
          details: "Private air-conditioned vehicle with English-speaking driver"
        }
      ],
      meals: {
        breakfast: "On board flight",
        lunch: "At leisure",
        dinner: "Welcome dinner at local restaurant"
      },
      accommodation: "Hotel Sultanahmet Palace (4-star)"
    },
    {
      id: "2",
      dayNumber: 2,
      date: "2024-11-16",
      city: "Istanbul",
      activities: [
        {
          id: "2-1",
          time: "09:00",
          type: "Morning",
          title: "Topkapi Palace & Hagia Sophia",
          description: "Guided tour of the former Ottoman palace and the architectural wonder",
          location: "Sultanahmet District"
        },
        {
          id: "2-2",
          time: "14:00",
          type: "Afternoon",
          title: "Blue Mosque & Grand Bazaar",
          description: "Visit the iconic Blue Mosque and experience shopping at the world's oldest covered market",
          location: "Grand Bazaar"
        },
        {
          id: "2-3",
          time: "18:00",
          type: "Evening",
          title: "Bosphorus Sunset Cruise",
          description: "Scenic boat cruise between Europe and Asia",
          location: "Golden Horn"
        }
      ],
      transportation: [],
      meals: {
        breakfast: "Hotel breakfast buffet",
        lunch: "Turkish cuisine at local restaurant",
        dinner: "At leisure"
      },
      accommodation: "Hotel Sultanahmet Palace (4-star)"
    },
    {
      id: "3",
      dayNumber: 3,
      date: "2024-11-17",
      city: "Cappadocia",
      activities: [
        {
          id: "3-1",
          time: "05:30",
          type: "Morning",
          title: "Optional Hot Air Balloon Ride",
          description: "Breathtaking sunrise balloon flight over fairy chimneys (weather permitting)",
          location: "Goreme Valley"
        },
        {
          id: "3-2",
          time: "10:00",
          type: "Morning",
          title: "Flight to Cappadocia",
          description: "Domestic flight from Istanbul to Kayseri",
          location: "Kayseri Airport"
        },
        {
          id: "3-3",
          time: "15:00",
          type: "Afternoon",
          title: "Goreme Open Air Museum",
          description: "Explore rock-cut churches with Byzantine frescoes",
          location: "Goreme National Park"
        }
      ],
      transportation: [
        {
          id: "t-3-1",
          type: "Flight",
          from: "Istanbul (IST)",
          to: "Kayseri (ASR)",
          time: "08:00 - 09:30",
          details: "Turkish Airlines domestic flight with baggage allowance"
        },
        {
          id: "t-3-2",
          type: "Transfer",
          from: "Kayseri Airport",
          to: "Cappadocia Hotel",
          time: "10:30",
          details: "1-hour scenic drive through Cappadocia landscape"
        }
      ],
      meals: {
        breakfast: "Hotel breakfast (early)",
        lunch: "Packed lunch during travel",
        dinner: "Cave restaurant dining experience"
      },
      accommodation: "Cappadocia Cave Suite Hotel (5-star)"
    }
  ],

  hotels: [
    {
      id: "h-1",
      name: "Hotel Sultanahmet Palace",
      address: "Torun Sokak No: 19, Sultanahmet",
      city: "Istanbul",
      checkInDate: "2024-11-15",
      checkOutDate: "2024-11-17",
      numberOfNights: 2,
      numberOfRooms: 2,
      roomType: "Deluxe Double Room with Bosphorus View",
      rating: 4,
      amenities: ["Free WiFi", "Breakfast Included", "Air Conditioning", "24/7 Room Service", "Concierge Service", "Fitness Center"],
      contactNumber: "+90 212 458 0460",
      email: "info@sultanahmetpalace.com",
      pricePerNight: 180,
      currency: "USD",
      bookingReference: "VGV-IST-001",
      notes: "Historic boutique hotel in the heart of Old City, walking distance to major attractions"
    },
    {
      id: "h-2",
      name: "Cappadocia Cave Suite Hotel",
      address: "Gaferli Mah, Mudur Sokak No: 1, Goreme",
      city: "Cappadocia",
      checkInDate: "2024-11-17",
      checkOutDate: "2024-11-22",
      numberOfNights: 5,
      numberOfRooms: 2,
      roomType: "Superior Cave Suite with Terrace",
      rating: 5,
      amenities: ["Cave Architecture", "Heated Floors", "Private Terrace", "Turkish Bath", "Wine Cellar", "Balloon View", "Airport Transfer"],
      contactNumber: "+90 384 271 2800",
      email: "reservations@cavesuite.com",
      pricePerNight: 320,
      currency: "USD",
      bookingReference: "VGV-CAP-001",
      notes: "Unique cave hotel experience with panoramic views of fairy chimneys and balloon flights"
    }
  ],

  paymentPlan: {
    totalAmount: 4850,
    currency: "USD",
    numberOfInstallments: 3,
    installments: [
      {
        id: "p-1",
        installmentNumber: 1,
        amount: 1500,
        dueDate: "2024-10-01",
        description: "Down Payment",
        status: "Paid",
        paymentMethod: "Credit Card",
        notes: "Initial booking confirmation payment"
      },
      {
        id: "p-2",
        installmentNumber: 2,
        amount: 1675,
        dueDate: "2024-10-20",
        description: "Second Installment",
        status: "Pending",
        paymentMethod: "Bank Transfer",
        notes: "Due 25 days before departure"
      },
      {
        id: "p-3",
        installmentNumber: 3,
        amount: 1675,
        dueDate: "2024-11-10",
        description: "Final Payment",
        status: "Pending",
        paymentMethod: "Credit Card",
        notes: "Final payment due 5 days before departure"
      }
    ],
    paymentTerms: "Payment schedule must be strictly followed. Late payments may result in booking cancellation. All payments are non-refundable 30 days before departure date.",
    refundPolicy: "Full refund if cancelled 60+ days before departure. 50% refund if cancelled 30-59 days before. No refund for cancellations within 30 days of departure.",
    additionalFees: [
      {
        name: "Travel Insurance",
        amount: 125,
        description: "Comprehensive travel insurance covering medical, trip cancellation, and baggage"
      },
      {
        name: "City Tax",
        amount: 45,
        description: "Municipal tourism tax payable directly to hotels"
      },
      {
        name: "Optional Hot Air Balloon",
        amount: 180,
        description: "Per person supplement for hot air balloon ride (weather dependent)"
      }
    ]
  },

  inclusionsExclusions: {
    inclusions: [
      {
        id: "inc-1",
        category: "Accommodation",
        details: "7 nights in 4-5 star hotels with daily breakfast",
        icon: "🏨"
      },
      {
        id: "inc-2",
        category: "Transportation",
        details: "Airport transfers, domestic flight Istanbul-Kayseri, private air-conditioned vehicles",
        icon: "🚐"
      },
      {
        id: "inc-3",
        category: "Meals",
        details: "7 breakfasts, 4 lunches, 3 dinners including welcome and farewell dinners",
        icon: "🍽️"
      },
      {
        id: "inc-4",
        category: "Tours & Activities",
        details: "All guided tours with professional English-speaking guides, entrance fees to monuments",
        icon: "🎯"
      },
      {
        id: "inc-5",
        category: "Services",
        details: "24/7 local support, travel consultation, detailed itinerary booklet",
        icon: "🤝"
      }
    ],
    exclusions: [
      {
        id: "exc-1",
        details: "International flights to/from Istanbul",
        category: "Transportation"
      },
      {
        id: "exc-2",
        details: "Personal expenses, souvenirs, and shopping",
        category: "Personal"
      },
      {
        id: "exc-3",
        details: "Travel insurance (available as optional add-on)",
        category: "Insurance"
      },
      {
        id: "exc-4",
        details: "Drinks with meals (except welcome dinner)",
        category: "Meals"
      },
      {
        id: "exc-5",
        details: "Tips for guides and drivers (recommended $5-10 per day)",
        category: "Gratuities"
      },
      {
        id: "exc-6",
        details: "Hot air balloon ride (available as optional activity)",
        category: "Optional Activities"
      }
    ],
    importantNotes: [
      {
        id: "note-1",
        title: "Passport Requirements",
        description: "Valid passport required with at least 6 months validity. US citizens can obtain e-visa online.",
        type: "important"
      },
      {
        id: "note-2",
        title: "Weather Considerations",
        description: "Hot air balloon flights are weather dependent and may be cancelled for safety reasons. Alternative activities will be provided.",
        type: "warning"
      },
      {
        id: "note-3",
        title: "Dress Code",
        description: "Modest dress required for mosque visits. Comfortable walking shoes recommended for all tours.",
        type: "info"
      },
      {
        id: "note-4",
        title: "Health & Safety",
        description: "No special vaccinations required. Travel insurance strongly recommended. Emergency contact details provided upon booking.",
        type: "info"
      }
    ]
  }
};

// Function to load sample data into the store
export const loadSampleData = (store: any) => {
  store.setTourOverview(sampleItineraryData.tourOverview);
  store.setDailyItinerary(sampleItineraryData.dailyItinerary);
  store.setHotels(sampleItineraryData.hotels);
  store.setPaymentPlan(sampleItineraryData.paymentPlan);
  store.setInclusionsExclusions(sampleItineraryData.inclusionsExclusions);
};
