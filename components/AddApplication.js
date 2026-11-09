
"use client";
import { useState, useEffect} from "react";
export default function AddApplication({ onClose, onSave, applicationToEdit }) {
  const [company, setCompany] = useState(
    applicationToEdit?.company || ""
  );

  const [role, setRole] = useState(
    applicationToEdit?.role || ""
  );

  const [status, setStatus] = useState(
    applicationToEdit?.status || "Applied"
  );

  useEffect(() => {
  if (applicationToEdit) {
    setCompany(applicationToEdit.company);
    setRole(applicationToEdit.role);
    setStatus(applicationToEdit.status);
  } else {
    setCompany("");
    setRole("");
    setStatus("Applied");
  }
}, [applicationToEdit]);


function handleSubmit(e) {
  e.preventDefault();

  const applicationData = {
    company,
    role,
    status,
  };

  onSave(applicationData);
}
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-bold text-gray-900">
          Add Application
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Enter the details of the job you applied for.
        </p>


        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              placeholder="e.g. Google"
              value={company} onChange={(e) => { setCompany(e.target.value) }}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Job Title
            </label>
            <input
              type="text"
              placeholder="e.g. Frontend Developer"
              value={role} onChange={(e) => { setRole(e.target.value) }}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700" >
              Application Status
            </label>
            <select
              value={status} onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-blue-500"
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button onClick={onClose} type="button"
              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
            >
              Save Application
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
