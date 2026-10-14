export default function Sidebar(){
  return(
      <div className="hidden md:flex md:w-64 md:flex-col bg-slate-800 text-white p-6">
        <h2 className="text-2xl font-bold">CareerTrack</h2>

        <nav className="mt-8">
          <ul className="space-y-4 text-lg">
            <li><a className="block rounded-lg px-4 py-3 text-base hover:bg-slate-700" href="#">Dashboard</a></li>
            <li><a className="block rounded-lg px-4 py-3 text-base hover:bg-slate-700" href="#">Pipelines</a></li>
            <li><a className="block rounded-lg px-4 py-3 text-base hover:bg-slate-700" href="#">Applications</a></li>
            <li><a className="block rounded-lg px-4 py-3 text-base hover:bg-slate-700" href="#">Analytics</a></li>
            <li><a className="block rounded-lg px-4 py-3 text-base hover:bg-slate-700" href="#">Settings</a></li>
          </ul>
        </nav>
      </div>
  )
}
