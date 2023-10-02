import "./App.css";
import { useAuth } from "./contexts/authentication";
import AuthenticatedApp from "./pages/AuthenticatedApp.jsx";
import axios from "axios";
import UnauthenticatedApp from "./pages/UnauthenticatedApp";
axios.defaults.baseURL = "https://pet-sitter.up.railway.app";

function App() {
  const auth = useAuth();
  return auth.isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export default App;
