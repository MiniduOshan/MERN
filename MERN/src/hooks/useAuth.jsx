import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import axios from "axios";

const AuthContext = createContext(null);

const API_URL = "http://localhost:5000/api/auth";

export const AuthProvider = (props) => {
  const { children } = props;

  const [user, setUser] = useState(null); // {id, name, email}
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // load saved auth on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error("Failed to parse saved user", err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }

    setLoading(false);
  }, []);

  // attach token to axios requests
  useEffect(() => {
    const interceptorId = axios.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      axios.interceptors.request.eject(interceptorId);
    };
  }, [token]);

  const signup = async (name, email, password) => {
    const { data } = await axios.post(`${API_URL}/signup`, {
      name,
      email,
      password
    });

    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);

    return data;
  };

  const login = async (email, password) => {
    const { data } = await axios.post(`${API_URL}/login`, {
      email,
      password
    });

    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);

    return data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const value = {
    user,
    token,
    loading,
    signup,
    login,
    logout
  };

  // no JSX here, only pure JS
  return React.createElement(AuthContext.Provider, { value }, children);
};

export const useAuth = () => useContext(AuthContext);
