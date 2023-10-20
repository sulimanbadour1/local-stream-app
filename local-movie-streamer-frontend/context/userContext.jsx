import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!user) {
      axios.get("/profile").then(({ data }) => {
        setUser(data);
      });
    }
  }, []);
  const logout = async () => {
    try {
      await axios.post("/logout"); // Adjust this endpoint if needed
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle error accordingly (e.g., display a notification to the user)
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}
