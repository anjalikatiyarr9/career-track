"use client";
import Sidebar from "@/components/Sidebar";
import Stats from "@/components/Stats";
import { useState } from "react";
import { useApplications } from "@/components/ApplicationContext";
import AddApplication from "@/components/AddApplication";

export default function Home() {

  const { applications, setApplications } = useApplications();

  const total = applications.length;

  const interviews = applications.filter(
    (app) => app.status === "Interview"
  ).length;

  const offers = applications.filter(
    (app) => app.status === "Offer"
  ).length;

  const rejections = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editApplication, setEditApplication] = useState(null);

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
      {/* Main content */}
      <div className="flex-1 min-w-0 bg-gray-100 px-4 pb-4 pt-20 md:p-8">
        <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl text-black font-bold">
              Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Track your job search and stay organized.
            </p>
          </div>

          <button className="bg-blue-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => setIsModalOpen(true)}>
            + Add Application
          </button>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Stats title="Total Applications" value={total} description="Jobs applied to" />
          <Stats title="Interviews" value={interviews} description="Interviews scheduled" />
          <Stats title="Offers" value={offers} description="Offers received" />
          <Stats title="Rejections" value={rejections} description="Applications rejected" />

        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900">Recent Applications</h2>

          <div className="mt-4 mb-4 flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="Search company or job title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 outline-none focus:border-blue-500"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 outline-none focus:border-blue-500 sm:w-48"
            >
              <option value="All">All status</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>


          {/* Applications rows*/}
          <div className="space-y-3 ">


            {applications.length === 0 ? (
              // Case 1: No applications exist
              <div className="bg-white rounded-xl p-8 text-center shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800">
                  No applications yet
                </h3>

                <p className="text-gray-500 mt-2">
                  Start tracking your job applications by adding one.
                </p>
              </div>
            ) : filteredApplications.length === 0 ? (
              // Case 2: No matching search or filter results
              <div className="bg-white rounded-xl p-8 text-center shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800">
                  No applications found
                </h3>

                <p className="text-gray-500 mt-2">
                  Try changing your search or status filter.
                </p>
              </div>
            ) : (
              // Case 3: Display matching applications
              filteredApplications.map((application) => (
                <div
                  key={application.company}
                  className="flex items-center gap-4 bg-white justify-between text-gray-500 rounded-xl shadow-sm p-4"
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
                      type="button"
                      onClick={() => {
                        setEditApplication(application);
                        setIsModalOpen(true);
                      }}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(application.id)}
                      
                      className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}


          </div>
        </div>


      </div>
      {isModalOpen && (
        <AddApplication
          key={editApplication?.company ?? "new-application"}
          onClose={() => {
            setIsModalOpen(false);
            setEditApplication(null);
          }}
          onSave={handleAddApplication}
          applicationToEdit={editApplication}
        />
      )}
    </div >


  );
}
