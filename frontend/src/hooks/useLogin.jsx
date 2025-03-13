import { useState } from "react";

export default function useLogin(url) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const login = async (object) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(object),
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        console.error("Login failed:", responseData.error);
        setError(responseData.error);
        setIsLoading(false);
        return responseData;
      }
      
      localStorage.setItem("user", JSON.stringify(responseData)); //Keep localStorage as a fallback.
      setIsLoading(false);
      return responseData;
    } catch (err) {
      console.error("Login failed:", err);
      setError("An unexpected error occurred.");
      setIsLoading(false);
      return { error: "An unexpected error occurred." };
    }
  };
  
  return { login, isLoading, error };
}
