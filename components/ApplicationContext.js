
"use client";

import { createContext, useContext, useState } from "react";

const ApplicationContext = createContext();

const initialApplications = [
  {
    company: "Google",
    role: "Frontend Developer",
    status: "Interview",
  },
  {
    company: "Microsoft",
    role: "Software Engineer Intern",
    status: "Applied",
  },
  {
    company: "Amazon",
    role: "Web Developer",
    status: "Rejected",
  },
  {
    company: "Infosys",
    role: "Software development intern",
    status: "Applied",
  },
];

export function ApplicationProvider({ children }) {
  const [applications, setApplications] = useState(initialApplications);

  return (
    <ApplicationContext.Provider value={{ applications, setApplications }}>
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplications() {
  return useContext(ApplicationContext);
}
