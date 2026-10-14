import Sidebar from "@/components/Sidebar";
import Stats from "@/components/Stats";
const applications = [
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
    company:"Infosys",
    role: "Software development intern",
    status:"Applied"
  }
];

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />


      {/* Main content */}
      <div className="flex-1 min-w-0 bg-gray-100 p-4 md:p-8">
        <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl text-black font-bold">
              Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Track your job search and stay organized.
            </p>
          </div>

          <button className="bg-blue-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-600">
            + Add Application
          </button>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Stats
            title="Total Applications"
            value={24}
            description="Jobs applied to"
          />
          <Stats
            title="Interviews"
            value={5}
            description="Interviews scheduled"
          />
          <Stats
            title="Offers "
            value={2}
            description="Offers received"
          />
          <Stats
            title="Rejections"
            value={3}
            description="Applications rejected"
          />

        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900">Recent Applications</h2>

          {/* Applications rows*/}
          <div className="space-y-3 ">

            {applications.map((application) => (
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

                <span className={`px-3 py-1 rounded-full text-sm font-medium ${application.status === "Interview"
                      ? "bg-purple-100 text-purple-700"
                      : application.status === "Applied"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                    }`}
                >{application.status}</span>
              </div>
            ))}

          </div>
        </div>


      </div>
    </div >

  );
}
