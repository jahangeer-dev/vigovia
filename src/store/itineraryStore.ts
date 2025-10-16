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
  time: string;
  type: 'Morning' | 'Afternoon' | 'Evening';
  title: string;
  description: string;
  location: string;
}

export interface Transportation {
  id: string;
  type: 'Flight' | 'Transfer' | 'Train' | 'Bus' | 'Car';
  from: string;
  to: string;
  time: string;
  details: string;
}

export interface DayItinerary {
  id: string;
  dayNumber: number;
  date: string;
  city: string;
  activities: Activity[];
  transportation: Transportation[];
  meals: {
    breakfast: string;
    lunch: string;
    dinner: string;
  };
  accommodation: string;
}

export interface Hotel {
  id: string;
  name: string;
  address: string;
  city: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfNights: number;
  numberOfRooms: number;
  roomType: string;
  rating: number;
  amenities: string[];
  contactNumber: string;
  email: string;
  pricePerNight: number;
  currency: string;
  bookingReference: string;
  notes: string;
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
  details: string;
  icon?: string;
}

export interface Exclusion {
  id: string;
  details: string;
  category?: string;
}

export interface ImportantNote {
  id: string;
  title: string;
  description: string;
  type: 'info' | 'warning' | 'important';
}

export interface InclusionsExclusionsData {
  inclusions: Inclusion[];
  exclusions: Exclusion[];
  importantNotes: ImportantNote[];
}

// Main store interface
interface ItineraryStore {
  // Data
  tourOverview: TourOverviewData;
  dailyItinerary: DayItinerary[];
  hotels: Hotel[];
  paymentPlan: PaymentPlanData;
  inclusionsExclusions: InclusionsExclusionsData;
  
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
  setHotels: (data: Hotel[]) => void;
  addHotel: () => void;
  removeHotel: (hotelId: string) => void;
  updateHotel: (hotelId: string, data: Partial<Hotel>) => void;
  setPaymentPlan: (data: Partial<PaymentPlanData>) => void;
  setInclusionsExclusions: (data: Partial<InclusionsExclusionsData>) => void;
  
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

// Initial state
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
  highlights: ['']
};

const initialPaymentPlan: PaymentPlanData = {
  totalAmount: 0,
  currency: 'USD',
  numberOfInstallments: 3,
  installments: [],
  paymentTerms: '',
  refundPolicy: '',
  additionalFees: []
};

const initialInclusionsExclusions: InclusionsExclusionsData = {
  inclusions: [{ id: '1', category: '', details: '', icon: '📋' }],
  exclusions: [{ id: '1', details: '', category: '' }],
  importantNotes: []
};

// Create the store
export const useItineraryStore = create<ItineraryStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial data
        tourOverview: initialTourOverview,
        dailyItinerary: [
          {
            id: '1',
            dayNumber: 1,
            date: '',
            city: '',
            activities: [],
            transportation: [],
            meals: {
              breakfast: '',
              lunch: '',
              dinner: ''
            },
            accommodation: ''
          }
        ],
        hotels: [
          {
            id: '1',
            name: '',
            address: '',
            city: '',
            checkInDate: '',
            checkOutDate: '',
            numberOfNights: 1,
            numberOfRooms: 1,
            roomType: '',
            rating: 5,
            amenities: [],
            contactNumber: '',
            email: '',
            pricePerNight: 0,
            currency: 'USD',
            bookingReference: '',
            notes: ''
          }
        ],
        paymentPlan: initialPaymentPlan,
        inclusionsExclusions: initialInclusionsExclusions,
        
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
              city: '',
              activities: [],
              transportation: [],
              meals: { breakfast: '', lunch: '', dinner: '' },
              accommodation: ''
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
        
        setHotels: (data) => set({ hotels: data }),
        
        addHotel: () =>
          set((state) => {
            const newHotel: Hotel = {
              id: Date.now().toString(),
              name: '',
              address: '',
              city: '',
              checkInDate: '',
              checkOutDate: '',
              numberOfNights: 1,
              numberOfRooms: 1,
              roomType: '',
              rating: 5,
              amenities: [],
              contactNumber: '',
              email: '',
              pricePerNight: 0,
              currency: 'USD',
              bookingReference: '',
              notes: ''
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
        
        // Utility actions
        resetStore: () =>
          set({
            tourOverview: initialTourOverview,
            dailyItinerary: [
              {
                id: '1',
                dayNumber: 1,
                date: '',
                city: '',
                activities: [],
                transportation: [],
                meals: { breakfast: '', lunch: '', dinner: '' },
                accommodation: ''
              }
            ],
            hotels: [
              {
                id: '1',
                name: '',
                address: '',
                city: '',
                checkInDate: '',
                checkOutDate: '',
                numberOfNights: 1,
                numberOfRooms: 1,
                roomType: '',
                rating: 5,
                amenities: [],
                contactNumber: '',
                email: '',
                pricePerNight: 0,
                currency: 'USD',
                bookingReference: '',
                notes: ''
              }
            ],
            paymentPlan: initialPaymentPlan,
            inclusionsExclusions: initialInclusionsExclusions,
            activeTab: 'overview'
          }),
        
        exportData: () => {
          const state = get();
          return {
            tourOverview: state.tourOverview,
            dailyItinerary: state.dailyItinerary,
            hotels: state.hotels,
            paymentPlan: state.paymentPlan,
            inclusionsExclusions: state.inclusionsExclusions
          };
        },
        
        importData: (data) =>
          set({
            tourOverview: data.tourOverview || initialTourOverview,
            dailyItinerary: data.dailyItinerary || [],
            hotels: data.hotels || [],
            paymentPlan: data.paymentPlan || initialPaymentPlan,
            inclusionsExclusions: data.inclusionsExclusions || initialInclusionsExclusions
          })
      }),
      {
        name: 'vigovia-itinerary-store',
        partialize: (state) => ({
          tourOverview: state.tourOverview,
          dailyItinerary: state.dailyItinerary,
          hotels: state.hotels,
          paymentPlan: state.paymentPlan,
          inclusionsExclusions: state.inclusionsExclusions
        })
      }
    )
  )
);

// Selector hooks for better performance
export const useTourOverview = () => useItineraryStore((state) => state.tourOverview);
export const useDailyItinerary = () => useItineraryStore((state) => state.dailyItinerary);
export const useHotels = () => useItineraryStore((state) => state.hotels);
export const usePaymentPlan = () => useItineraryStore((state) => state.paymentPlan);
export const useInclusionsExclusions = () => useItineraryStore((state) => state.inclusionsExclusions);
export const useActiveTab = () => useItineraryStore((state) => state.activeTab);
