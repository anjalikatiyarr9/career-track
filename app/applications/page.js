
"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import AddApplication from "@/components/AddApplication";
import { useApplications } from "@/components/ApplicationContext";

export default function Applications() {
  const { applications, setApplications } = useApplications();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editApplication, setEditApplication] = useState(null);

  function handleAddApplication(newApplication) {
  if (editApplication) {
    setApplications((prevApplications) =>
      prevApplications.map((application) =>
        application.id === editApplication.id
          ? { ...newApplication, id: editApplication.id }
          : application
      )
    );
  } else {
    setApplications((prevApplications) => [
      ...prevApplications,
      { ...newApplication, id: crypto.randomUUID() },
    ]);
  }

  setIsModalOpen(false);
  setEditApplication(null);
}

  function handleDelete(id) {
  setApplications((prevApplications) =>
    prevApplications.filter(
      (application) => application.id !== id
    )
  );
}

  const filteredApplications = applications.filter((application) => {
    const matchesSearch =
      application.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.role.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || application.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 min-w-0 bg-gray-100 px-4 pb-4 pt-20 md:p-8">
        <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Applications
            </h1>
            <p className="mt-2 text-gray-600">
              Manage and track all your job applications.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-lg bg-blue-500 px-4 py-2 font-bold text-white transition hover:bg-blue-600"
          >
            + Add Application
          </button>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="Search company or job title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 sm:w-48"
          >
            <option value="All">All status</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Application List */}
        <div className="space-y-3">
          {applications.length === 0 ? (
            <div className="rounded-xl bg-white p-8 text-center shadow-sm">
              <h3 className="font-semibold text-gray-800">
                No applications yet
              </h3>
              <p className="mt-2 text-gray-500">
                Add your first job application to get started.
              </p>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="rounded-xl bg-white p-8 text-center shadow-sm">
              <h3 className="font-semibold text-gray-800">
                No applications found
              </h3>
              <p className="mt-2 text-gray-500">
                Try changing your search or status filter.
              </p>
            </div>
          ) : (
            filteredApplications.map((application) => (
              <div
                key={application.id}
                className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                <div>
                  <p className="font-semibold text-gray-900">
                    {application.company}
                  </p>
                  <p className="text-sm text-gray-500">
                    {application.role}
                  </p>
                </div>

                <div className="flex items-center gap-3">

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${application.status === "Interview"
                      ? "bg-violet-50 text-violet-700"
                      : application.status === "Applied"
                        ? "bg-slate-100 text-slate-700"
                        : application.status === "Offer"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                  >
                    {application.status}
                  </span>


                  <button
                    onClick={() => {
                      setEditApplication(application);
                      setIsModalOpen(true);
                    }}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(application.id)}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600">
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {isModalOpen && (
        <AddApplication
          key={editApplication?.id ?? "new-application"}
          onClose={() => {
            setIsModalOpen(false);
            setEditApplication(null);
          }}
          onSave={handleAddApplication}
          applicationToEdit={editApplication}
        />
      )}
    </div>
  );
}