
"use client";

import Sidebar from "@/components/Sidebar";
import { useApplications } from "@/components/ApplicationContext";

export default function Analytics() {
  const { applications } = useApplications();

  const total = applications.length;

  const applied = applications.filter(
    (app) => app.status === "Applied"
  ).length;

  const interviews = applications.filter(
    (app) => app.status === "Interview"
  ).length;

  const offers = applications.filter(
    (app) => app.status === "Offer"
  ).length;

  const rejections = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  const stats = [
    { title: "Total Applications", value: total },
    { title: "Applied", value: applied },
    { title: "Interviews", value: interviews },
    { title: "Offers", value: offers },
    { title: "Rejections", value: rejections },
  ];

 const statusData = [
  { name: "Applied", value: applied, color: "bg-slate-400" },
  { name: "Interview", value: interviews, color: "bg-violet-500" },
  { name: "Offer", value: offers, color: "bg-emerald-500" },
  { name: "Rejected", value: rejections, color: "bg-amber-500" },
]; 

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 min-w-0 bg-gray-100 px-4 pb-4 pt-20 md:p-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Analytics
        </h1>

        <p className="mt-2 text-gray-600">
          Get insights into your job application progress.
        </p>

        {/* Statistics Cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <p className="text-sm font-medium text-gray-500">
                {stat.title}
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                {stat.value}
              </h2>
            </div>
          ))}
        </div>

        {/* Status Distribution */}
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Application Status Distribution
          </h2>

          <div className="mt-6 space-y-5">
            {statusData.map((item) => {
              const percentage =
                total === 0 ? 0 : (item.value / total) * 100;

              return (
                <div key={item.name}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium text-gray-700">
                      {item.name}
                    </span>

                    <span className="text-gray-500">
                      {item.value} ({percentage.toFixed(0)}%)
                    </span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                    <div
                    className={`${item.color} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
