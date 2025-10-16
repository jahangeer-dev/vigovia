import { lazy } from 'react';

// Lazy load components for better performance
const TourOverview = lazy(() => import('../pages/TourOverview'));
const DailyItinerary = lazy(() => import('../pages/DailyItinerary'));
const HotelDetails = lazy(() => import('../pages/HotelDetails'));
const PaymentPlan = lazy(() => import('../pages/PaymentPlan'));
const InclusionsExclusions = lazy(() => import('../pages/InclusionsExclusions'));

export interface TabRoute {
  id: string;
  path: string;
  name: string;
  icon: string;
  description: string;
  gradient: string;
  component: React.ComponentType;
}

export const tabRoutes: TabRoute[] = [
  {
    id: 'overview',
    path: '/',
    name: 'Overview',
    icon: '🌍',
    description: 'Tour details',
    gradient: 'from-blue-500 to-purple-600',
    component: TourOverview,
  },
  {
    id: 'itinerary',
    path: '/itinerary',
    name: 'Itinerary',
    icon: '📅',
    description: 'Daily plan',
    gradient: 'from-green-500 to-teal-600',
    component: DailyItinerary,
  },
  {
    id: 'hotels',
    path: '/hotels',
    name: 'Hotels',
    icon: '🏨',
    description: 'Accommodations',
    gradient: 'from-orange-500 to-red-600',
    component: HotelDetails,
  },
  {
    id: 'payment',
    path: '/payment',
    name: 'Payment',
    icon: '💳',
    description: 'Payment plan',
    gradient: 'from-purple-500 to-pink-600',
    component: PaymentPlan,
  },
  {
    id: 'inclusions',
    path: '/inclusions',
    name: 'Inclusions',
    icon: '✅',
    description: 'What\'s included',
    gradient: 'from-indigo-500 to-blue-600',
    component: InclusionsExclusions,
  },
];
