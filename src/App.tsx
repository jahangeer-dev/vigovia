import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import MainLayout from './layouts/MainLayout';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import { tabRoutes } from './config/routes';
import './App.css';

function App() {
  const OverviewComponent = tabRoutes[0].component;
  
  return (
    <ErrorBoundary>
      <Router>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="App"
        >
          <Routes>
            <Route path="/" element={<MainLayout />}>
              {tabRoutes.map((route) => {
                const Component = route.component;
                return (
                  <Route
                    key={route.id}
                    path={route.path}
                    element={
                      <ErrorBoundary>
                        <Suspense fallback={<LoadingSpinner />}>
                          <Component />
                        </Suspense>
                      </ErrorBoundary>
                    }
                  />
                );
              })}
              
              {/* Catch all route - redirect to overview */}
              <Route
                path="*"
                element={
                  <ErrorBoundary>
                    <Suspense fallback={<LoadingSpinner />}>
                      <OverviewComponent />
                    </Suspense>
                  </ErrorBoundary>
                }
              />
            </Route>
          </Routes>
        </motion.div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;