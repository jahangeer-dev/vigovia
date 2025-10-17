import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Types for the entire itinerary data structure
export interface TourOverviewData {
  tripTitle: string;
  duration: string;
  departureFrom: string;
  destination: string;
  departureDate: string;
  arrivalDate: string;
  numberOfTravellers: number;
  tourCode: string;
  tourType: string;
  highlights: string[];
}

export interface Activity {
  id: string;
  city: string;
  activity: string;
  type: string; // e.g., "Nature/Sightseeing", "Airlines Standard", etc.
  timeRequired: string; // e.g., "2-3 Hours"
}

export interface TimelineItem {
  id: string;
  period: 'Morning' | 'Afternoon' | 'Evening';
  activities: string[]; // Array of activity descriptions
}

export interface DayItinerary {
  id: string;
  dayNumber: number;
  date: string;
  title: string; // e.g., "Arrival in Singapore & City Exploration"
  city: string;
  timeline: TimelineItem[]; // Morning, Afternoon, Evening activities
}

// Activities data (separate from daily itinerary for the activity table)
export interface ActivitiesData {
  activities: Activity[];
}

// Flight interface
export interface Flight {
  id: string;
  date: string;
  airline: string;
  flightNumber: string;
  originCity: string;
  originCode: string;
  destinationCity: string;
  destinationCode: string;
  notes?: string;
}

// Visa Details interface
export interface VisaDetails {
  visaType: string;
  validity: string;
  processingDate: string;
}

export interface Hotel {
  id: string;
  city: string;
  checkIn: string;
  checkOut: string;
  nights: number; // Auto-calculated
  hotelName: string;
}

export interface PaymentInstallment {
  id: string;
  installmentNumber: number;
  amount: number;
  dueDate: string;
  description: string;
  status: 'Pending' | 'Paid' | 'Overdue';
  paymentMethod: string;
  notes: string;
}

export interface PaymentPlanData {
  totalAmount: number;
  currency: string;
  tcsCollected: boolean;
  numberOfInstallments: number;
  installments: PaymentInstallment[];
  paymentTerms: string;
  refundPolicy: string;
  additionalFees: {
    name: string;
    amount: number;
    description: string;
  }[];
}

export interface Inclusion {
  id: string;
  category: string;
  count: number;
  details: string;
  statusComments: string;
}

export interface InclusionsExclusionsData {
  inclusions: Inclusion[];
  transferPolicy: string;
}

// Main store interface
interface ItineraryStore {
  // Data
  tourOverview: TourOverviewData;
  dailyItinerary: DayItinerary[];
  flights: Flight[];
  hotels: Hotel[];
  paymentPlan: PaymentPlanData;
  inclusionsExclusions: InclusionsExclusionsData;
  activitiesData: ActivitiesData;
  visaDetails: VisaDetails;
  
  // UI State
  activeTab: string;
  isLoading: boolean;
  isSaving: boolean;
  
  // Actions
  setActiveTab: (tab: string) => void;
  setTourOverview: (data: Partial<TourOverviewData>) => void;
  setDailyItinerary: (data: DayItinerary[]) => void;
  addDay: () => void;
  removeDay: (dayId: string) => void;
  updateDay: (dayId: string, data: Partial<DayItinerary>) => void;
  
  // Flight actions
  setFlights: (data: Flight[]) => void;
  addFlight: () => void;
  removeFlight: (flightId: string) => void;
  updateFlight: (flightId: string, data: Partial<Flight>) => void;
  
  setHotels: (data: Hotel[]) => void;
  addHotel: () => void;
  removeHotel: (hotelId: string) => void;
  updateHotel: (hotelId: string, data: Partial<Hotel>) => void;
  setPaymentPlan: (data: Partial<PaymentPlanData>) => void;
  setInclusionsExclusions: (data: Partial<InclusionsExclusionsData>) => void;
  setVisaDetails: (data: Partial<VisaDetails>) => void;
  
  // Activities actions
  setActivitiesData: (data: Partial<ActivitiesData>) => void;
  addActivity: () => void;
  removeActivity: (activityId: string) => void;
  updateActivity: (activityId: string, data: Partial<Activity>) => void;
  
  // Payment-specific actions
  updatePaymentField: (field: keyof PaymentPlanData, value: any) => void;
  addInstallment: () => void;
  removeInstallment: (installmentId: string) => void;
  updateInstallment: (installmentId: string, field: keyof PaymentInstallment, value: any) => void;
  generateInstallments: () => void;
  addAdditionalFee: () => void;
  removeAdditionalFee: (index: number) => void;
  updateAdditionalFee: (index: number, field: string, value: any) => void;
  
  // Utility actions
  resetStore: () => void;
  exportData: () => object;
  importData: (data: any) => void;
}

// Initial state - completely empty
const initialTourOverview: TourOverviewData = {
  tripTitle: '',
  duration: '',
  departureFrom: '',
  destination: '',
  departureDate: '',
  arrivalDate: '',
  numberOfTravellers: 1,
  tourCode: '',
  tourType: '',
  highlights: []
};

const initialPaymentPlan: PaymentPlanData = {
  totalAmount: 0,
  currency: 'INR',
  tcsCollected: false,
  numberOfInstallments: 1,
  installments: [],
  paymentTerms: '',
  refundPolicy: '',
  additionalFees: []
};

const initialInclusionsExclusions: InclusionsExclusionsData = {
  inclusions: [],
  transferPolicy: 'If Any Transfer Is Delayed Beyond 15 Minutes, Customers May Book An App-Based Or Radio Taxi And Claim A Refund For That Specific Leg.'
};

const initialActivitiesData: ActivitiesData = {
  activities: []
};

const initialVisaDetails: VisaDetails = {
  visaType: '',
  validity: '',
  processingDate: ''
};

// Create the store
export const useItineraryStore = create<ItineraryStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial data
        tourOverview: initialTourOverview,
        dailyItinerary: [],
        flights: [],
        hotels: [],
        paymentPlan: initialPaymentPlan,
        inclusionsExclusions: initialInclusionsExclusions,
        activitiesData: initialActivitiesData,
        visaDetails: initialVisaDetails,
        
        // UI State
        activeTab: 'overview',
        isLoading: false,
        isSaving: false,
        
        // Actions
        setActiveTab: (tab) => set({ activeTab: tab }),
        
        setTourOverview: (data) =>
          set((state) => ({
            tourOverview: { ...state.tourOverview, ...data }
          })),
        
        setDailyItinerary: (data) => set({ dailyItinerary: data }),
        
        addDay: () =>
          set((state) => {
            const newDay: DayItinerary = {
              id: Date.now().toString(),
              dayNumber: state.dailyItinerary.length + 1,
              date: '',
              title: '',
              city: '',
              timeline: [
                { id: `${Date.now()}-morning`, period: 'Morning', activities: [] },
                { id: `${Date.now()}-afternoon`, period: 'Afternoon', activities: [] },
                { id: `${Date.now()}-evening`, period: 'Evening', activities: [] }
              ]
            };
            return { dailyItinerary: [...state.dailyItinerary, newDay] };
          }),
        
        removeDay: (dayId) =>
          set((state) => {
            if (state.dailyItinerary.length > 1) {
              const updatedItinerary = state.dailyItinerary
                .filter((day) => day.id !== dayId)
                .map((day, index) => ({ ...day, dayNumber: index + 1 }));
              return { dailyItinerary: updatedItinerary };
            }
            return state;
          }),
        
        updateDay: (dayId, data) =>
          set((state) => ({
            dailyItinerary: state.dailyItinerary.map((day) =>
              day.id === dayId ? { ...day, ...data } : day
            )
          })),
        
        // Flight actions
        setFlights: (data) => set({ flights: data }),
        
        addFlight: () =>
          set((state) => {
            const newFlight: Flight = {
              id: Date.now().toString(),
              date: '',
              airline: '',
              flightNumber: '',
              originCity: '',
              originCode: '',
              destinationCity: '',
              destinationCode: '',
              notes: ''
            };
            return { flights: [...state.flights, newFlight] };
          }),
        
        removeFlight: (flightId) =>
          set((state) => ({
            flights: state.flights.filter((flight) => flight.id !== flightId)
          })),
        
        updateFlight: (flightId, data) =>
          set((state) => ({
            flights: state.flights.map((flight) =>
              flight.id === flightId ? { ...flight, ...data } : flight
            )
          })),
        
        setHotels: (data) => set({ hotels: data }),
        
        addHotel: () =>
          set((state) => {
            const newHotel: Hotel = {
              id: Date.now().toString(),
              city: '',
              checkIn: '',
              checkOut: '',
              nights: 0,
              hotelName: ''
            };
            return { hotels: [...state.hotels, newHotel] };
          }),
        
        removeHotel: (hotelId) =>
          set((state) => {
            if (state.hotels.length > 1) {
              return { hotels: state.hotels.filter((hotel) => hotel.id !== hotelId) };
            }
            return state;
          }),
        
        updateHotel: (hotelId, data) =>
          set((state) => ({
            hotels: state.hotels.map((hotel) =>
              hotel.id === hotelId ? { ...hotel, ...data } : hotel
            )
          })),
        
        setPaymentPlan: (data) =>
          set((state) => ({
            paymentPlan: { ...state.paymentPlan, ...data }
          })),

        // Payment-specific actions
        updatePaymentField: (field: keyof PaymentPlanData, value: any) =>
          set((state) => ({
            paymentPlan: { ...state.paymentPlan, [field]: value }
          })),

        addInstallment: () =>
          set((state) => {
            const newInstallment: PaymentInstallment = {
              id: Date.now().toString(),
              installmentNumber: state.paymentPlan.installments.length + 1,
              amount: 0,
              dueDate: '',
              description: `Installment ${state.paymentPlan.installments.length + 1}`,
              status: 'Pending',
              paymentMethod: '',
              notes: ''
            };
            return {
              paymentPlan: {
                ...state.paymentPlan,
                installments: [...state.paymentPlan.installments, newInstallment],
                numberOfInstallments: state.paymentPlan.installments.length + 1
              }
            };
          }),

        removeInstallment: (installmentId: string) =>
          set((state) => {
            if (state.paymentPlan.installments.length > 1) {
              const updatedInstallments = state.paymentPlan.installments
                .filter((installment) => installment.id !== installmentId)
                .map((installment, index) => ({ ...installment, installmentNumber: index + 1 }));
              return {
                paymentPlan: {
                  ...state.paymentPlan,
                  installments: updatedInstallments,
                  numberOfInstallments: Math.max(1, state.paymentPlan.numberOfInstallments - 1)
                }
              };
            }
            return state;
          }),

        updateInstallment: (installmentId: string, field: keyof PaymentInstallment, value: any) =>
          set((state) => ({
            paymentPlan: {
              ...state.paymentPlan,
              installments: state.paymentPlan.installments.map((installment) =>
                installment.id === installmentId ? { ...installment, [field]: value } : installment
              )
            }
          })),

        generateInstallments: () =>
          set((state) => {
            if (state.paymentPlan.totalAmount <= 0 || state.paymentPlan.numberOfInstallments <= 0) return state;
            
            const installmentAmount = state.paymentPlan.totalAmount / state.paymentPlan.numberOfInstallments;
            const today = new Date();
            
            const newInstallments: PaymentInstallment[] = [];
            
            for (let i = 0; i < state.paymentPlan.numberOfInstallments; i++) {
              const dueDate = new Date(today);
              dueDate.setMonth(today.getMonth() + i);
              
              newInstallments.push({
                id: `${Date.now()}-${i}`,
                installmentNumber: i + 1,
                amount: i === state.paymentPlan.numberOfInstallments - 1 
                  ? state.paymentPlan.totalAmount - (installmentAmount * i)
                  : Math.round(installmentAmount * 100) / 100,
                dueDate: dueDate.toISOString().split('T')[0],
                description: i === 0 ? 'Down Payment' : `Installment ${i + 1}`,
                status: 'Pending',
                paymentMethod: '',
                notes: ''
              });
            }
            
            return {
              paymentPlan: {
                ...state.paymentPlan,
                installments: newInstallments
              }
            };
          }),

        addAdditionalFee: () =>
          set((state) => ({
            paymentPlan: {
              ...state.paymentPlan,
              additionalFees: [...state.paymentPlan.additionalFees, { name: '', amount: 0, description: '' }]
            }
          })),

        removeAdditionalFee: (index: number) =>
          set((state) => ({
            paymentPlan: {
              ...state.paymentPlan,
              additionalFees: state.paymentPlan.additionalFees.filter((_, i) => i !== index)
            }
          })),

        updateAdditionalFee: (index: number, field: string, value: any) =>
          set((state) => ({
            paymentPlan: {
              ...state.paymentPlan,
              additionalFees: state.paymentPlan.additionalFees.map((fee, i) =>
                i === index ? { ...fee, [field]: value } : fee
              )
            }
          })),
        
        setInclusionsExclusions: (data) =>
          set((state) => ({
            inclusionsExclusions: { ...state.inclusionsExclusions, ...data }
          })),
        
        setVisaDetails: (data) =>
          set((state) => ({
            visaDetails: { ...state.visaDetails, ...data }
          })),
        
        // Activities actions
        setActivitiesData: (data) =>
          set((state) => ({
            activitiesData: { ...state.activitiesData, ...data }
          })),
        
        addActivity: () =>
          set((state) => {
            const newActivity: Activity = {
              id: Date.now().toString(),
              city: '',
              activity: '',
              type: '',
              timeRequired: ''
            };
            return {
              activitiesData: {
                ...state.activitiesData,
                activities: [...state.activitiesData.activities, newActivity]
              }
            };
          }),
        
        removeActivity: (activityId) =>
          set((state) => ({
            activitiesData: {
              ...state.activitiesData,
              activities: state.activitiesData.activities.filter((activity) => activity.id !== activityId)
            }
          })),
        
        updateActivity: (activityId, data) =>
          set((state) => ({
            activitiesData: {
              ...state.activitiesData,
              activities: state.activitiesData.activities.map((activity) =>
                activity.id === activityId ? { ...activity, ...data } : activity
              )
            }
          })),
        
        // Utility actions
        resetStore: () =>
          set({
            tourOverview: initialTourOverview,
            dailyItinerary: [],
            flights: [],
            hotels: [],
            paymentPlan: initialPaymentPlan,
            inclusionsExclusions: initialInclusionsExclusions,
            activitiesData: initialActivitiesData,
            visaDetails: initialVisaDetails,
            activeTab: 'overview'
          }),
        
        exportData: () => {
          const state = get();
          return {
            tourOverview: state.tourOverview,
            dailyItinerary: state.dailyItinerary,
            flights: state.flights,
            hotels: state.hotels,
            paymentPlan: state.paymentPlan,
            inclusionsExclusions: state.inclusionsExclusions,
            activitiesData: state.activitiesData,
            visaDetails: state.visaDetails
          };
        },
        
        importData: (data) =>
          set({
            tourOverview: data.tourOverview || initialTourOverview,
            dailyItinerary: data.dailyItinerary || [],
            flights: data.flights || [],
            hotels: data.hotels || [],
            paymentPlan: data.paymentPlan || initialPaymentPlan,
            inclusionsExclusions: data.inclusionsExclusions || initialInclusionsExclusions,
            activitiesData: data.activitiesData || initialActivitiesData,
            visaDetails: data.visaDetails || initialVisaDetails
          })
      }),
      {
        name: 'vigovia-itinerary-store',
        partialize: (state) => ({
          tourOverview: state.tourOverview,
          dailyItinerary: state.dailyItinerary,
          flights: state.flights,
          hotels: state.hotels,
          paymentPlan: state.paymentPlan,
          inclusionsExclusions: state.inclusionsExclusions,
          activitiesData: state.activitiesData,
          visaDetails: state.visaDetails
        })
      }
    )
  )
);

// Selector hooks for better performance
export const useTourOverview = () => useItineraryStore((state) => state.tourOverview);
export const useDailyItinerary = () => useItineraryStore((state) => state.dailyItinerary);
export const useFlights = () => useItineraryStore((state) => state.flights);
export const useHotels = () => useItineraryStore((state) => state.hotels);
export const usePaymentPlan = () => useItineraryStore((state) => state.paymentPlan);
export const useInclusionsExclusions = () => useItineraryStore((state) => state.inclusionsExclusions);
export const useActivitiesData = () => useItineraryStore((state) => state.activitiesData);
export const useVisaDetails = () => useItineraryStore((state) => state.visaDetails);
export const useActiveTab = () => useItineraryStore((state) => state.activeTab);
