import { useEffect, useState } from "react";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Start with loading true
  const token = localStorage.getItem("authToken");

  const checkForAuth = () => {
    fetch("http://localhost:5000/api/auth/check", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          setUser(null);
          throw new Error("Authentication error");
        }
      })
      .then((data) => {
        setUser(data.userData);
      })
      .catch((err) => {
        console.error(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const fetchData = () => {
      checkForAuth();
    };
    fetchData();
  }, []);

  const isAuthenticated = () => {
    return user ? true : false;
  };

  return { user, isAuthenticated, isLoading };
};

export default useAuth;
