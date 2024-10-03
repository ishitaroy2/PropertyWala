import { ThemeProvider, CssBaseline } from "@mui/material";
import LandingPage from "./pages/Home/HomePage";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import LoginPage from "./pages/Login/LoginPage";
import { useLocation } from "react-router-dom";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  return token ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <ErrorBoundary>{children}</ErrorBoundary>
  );
};

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  return token ? (
    <ErrorBoundary>{children}</ErrorBoundary>
  ) : (
    <Navigate
      to="/login"
      state={{
        from: location,
        shouldShowLoginError: true,
      }}
      replace
    />
  );
};

const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to="/home" replace />,
  },
  {
    path: "/home",
    element: (
      <PrivateRoute>
        <LandingPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
]);

export default function App() {
  return (
    <ErrorBoundary>
      <CssBaseline />
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}
