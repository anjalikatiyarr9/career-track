
"use client";

import Sidebar from "@/components/Sidebar";
import { useApplications } from "@/components/ApplicationContext";

export default function Settings() {
  const { applications, setApplications } = useApplications();

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 min-w-0 bg-gray-100 px-4 pb-4 pt-20 md:p-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Settings
        </h1>

        <p className="mt-2 text-gray-600">
          Manage your CareerTrack data.
        </p>

        <div className="mt-8 max-w-2xl rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            Application Data
          </h2>

          <p className="mt-2 text-gray-600">
            Total saved applications: {applications.length}
          </p>

          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to delete all applications?")) {
                setApplications([]);
              }
            }}
            className="mt-5 rounded-lg bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-600"
          >
            Clear All Applications
          </button>
        </div>
      </main>
    </div>
  );
}
