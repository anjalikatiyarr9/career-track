
"use client";

import Sidebar from "@/components/Sidebar";
import { useApplications } from "@/components/ApplicationContext";

export default function Pipeline() {
  const { applications, setApplications } = useApplications();

  const statuses = ["Applied", "Interview", "Offer", "Rejected"];

 function handleStatusChange(id, newStatus) {
  setApplications((prevApplications) =>
    prevApplications.map((application) =>
      application.id === id
        ? { ...application, status: newStatus }
        : application
    )
  );
}

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 min-w-0 bg-gray-100 px-4 pb-4 pt-20 md:p-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Application Pipeline
        </h1>

        <p className="mt-2 text-gray-600">
          Track your progress through every stage of your job search.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {statuses.map((status) => {
            const filteredApplications = applications.filter(
              (application) => application.status === status
            );

            return (
              <div
                key={status}
               className="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-bold text-gray-800">
                    {status}
                  </h2>

                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-700">
                    {filteredApplications.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {filteredApplications.length === 0 ? (
                    <p className="rounded-lg border border-dashed border-slate-300 bg-white p-4 text-center text-sm text-slate-500">
                      No applications
                    </p>
                  ) : (
                    filteredApplications.map((application) => (
                      <div
                        key={application.id}
                        className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
                      >
                        <h3 className="font-semibold text-gray-900">
                          {application.company}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {application.role}
                        </p>

                        <label className="mt-4 block text-xs font-medium text-gray-600">
                          Change status
                        </label>

                        <select
                          value={application.status}
                          onChange={(e) =>
                            handleStatusChange(
                              application.id,
                              e.target.value
                            )
                          }
                          className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100" >

                          {statuses.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
