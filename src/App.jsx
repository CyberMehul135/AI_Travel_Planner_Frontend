import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./features/trip/pages/Dashboard";
import { TripPlanner } from "./features/trip/pages/TripPlanner";
import { MyTrips } from "./features/trip/pages/MyTrips";
import AppLayout from "./components/layout/AppLayout";
import Login from "./features/auth/pages/Login";
import { TripDetails } from "./features/trip/pages/TripDetails";
import { AuthProvider } from "./features/auth/context/AuthContext";
import ProtectedLayout from "./features/auth/components/ProtectedLayout";
import { TripDetailsAi } from "./features/trip/pages/TripDetailsAi";
import { ToastContainer } from "react-toastify";
import { Profile } from "./features/user/pages/Profile";

function App() {
  return (
    <AuthProvider>
      <ToastContainer
        toastClassName="!p-3 !text-sm"
        position="top-right"
        autoClose={5000}
        theme="dark"
      />
      <BrowserRouter>
        <Routes>
          {/* Public-Routes */}
          <Route path="/login" element={<Login />} />

          {/* Private-Routes */}
          <Route element={<ProtectedLayout />}>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/trips" element={<MyTrips />} />
              <Route path="/trips/create" element={<TripPlanner />} />
              <Route path="/trips/:id" element={<TripDetails />} />
              <Route path="/trips/:id/ai" element={<TripDetailsAi />} />
              <Route path="/user/profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
