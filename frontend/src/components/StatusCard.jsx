function StatusCard({ title, status, description, statusColor }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          {title}
        </h3>

        <span className={`text-sm font-medium ${statusColor}`}>
          {status}
        </span>
      </div>

      <p className="mt-3 text-sm text-gray-400">
        {description}
      </p>
    </div>
  )
}

export default StatusCard