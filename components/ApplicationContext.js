
"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ApplicationContext = createContext();

export function ApplicationProvider({ children }) {
  const [applications, setApplications] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved applications when the app starts
  useEffect(() => {
    const savedApplications = localStorage.getItem("applications");

    if (savedApplications) {
      const parsedApplications = JSON.parse(savedApplications);

      const applicationsWithIds = parsedApplications.map((application) => ({
        ...application,
        id: application.id || crypto.randomUUID(),
      }));

      setApplications(applicationsWithIds);
    }

    setIsLoaded(true);
  }, []);

  // Save applications whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("applications", JSON.stringify(applications));
    }
  }, [applications, isLoaded]);

  return (
    <ApplicationContext.Provider value={{ applications, setApplications }}>
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplications() {
  return useContext(ApplicationContext);
}
