export default function Stats({title, value, description}){
  return (
    <div className="bg-white shadow-sm rounded-xl p-6">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
      <p className="text-gray-400 text-sm mt-1">{description}</p>
    </div>
  )
}