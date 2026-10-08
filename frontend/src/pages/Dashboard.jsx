import StatusCard from '../components/StatusCard'
import RecentActivity from '../components/RecentActivity'
import QuickActions from '../components/QuickActions'

function Dashboard() {
  return (
    <main className="flex-1 p-8">

      {/* Page Introduction */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold">
          Welcome to EyeVoice
        </h2>

        <p className="mt-2 text-slate-400">
          Control your computer using eye movement and voice.
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid gap-6 md:grid-cols-3">

        <StatusCard
          title="Eye Tracking"
          status="Active"
          description="Gaze tracking is ready."
          statusColor="text-emerald-400"
        />

        <StatusCard
          title="Voice Control"
          status="Ready"
          description="Microphone is available."
          statusColor="text-cyan-400"
        />

        <StatusCard
          title="Camera"
          status="Connected"
          description="Camera feed is available."
          statusColor="text-emerald-400"
        />

      </div>

      {/* Recent Activity */}
      <RecentActivity />

      {/* Quick Actions */}
      <QuickActions />

    </main>
  )
}

export default Dashboard