import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Companies from './pages/Companies';
import About from './pages/About';
import Careers from './pages/Careers';
import Press from './pages/Press';
import Blog from './pages/Blog';
import Help from './pages/Help';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Login from './pages/auth/Login';
import EmployerLogin from './pages/auth/EmployerLogin';
import Register from './pages/auth/Register';
import CandidateDashboard from './pages/dashboard/CandidateDashboard';
import EmployerDashboard from './pages/dashboard/EmployerDashboard';
import AdminPanel from './components/admin/AdminPanel';
import AdminLogin from './components/admin/AdminLogin';
import PublicJobBoard from './pages/PublicJobBoard';
import { useSelector } from 'react-redux';
import { RootState } from './store';

// Protected route component
const ProtectedRoute = ({ children, requiredRole }: { children: JSX.Element, requiredRole?: string }) => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && user.role !== requiredRole) {
    // Redirect based on role
    if (user.role === 'candidate') {
      return <Navigate to="/dashboard/candidate" replace />;
    } else if (user.role === 'employer') {
      return <Navigate to="/dashboard/employer" replace />;
    } else if (user.role === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/employer-login" element={<EmployerLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/register" element={<Register />} />
          
          {/* Dashboard Routes */}
          <Route 
            path="/dashboard/candidate" 
            element={
              <ProtectedRoute requiredRole="candidate">
                <CandidateDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/employer" 
            element={
              <ProtectedRoute requiredRole="employer">
                <EmployerDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminPanel />
              </ProtectedRoute>
            } 
          />
          
          {/* Public Job Board */}
          <Route path="/public-jobs" element={<PublicJobBoard />} />
          
          {/* Main App Routes */}
          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/about" element={<About />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/press" element={<Press />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/help" element={<Help />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;