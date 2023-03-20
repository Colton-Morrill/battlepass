const stats = [
    { id: 1, name: 'Worksheets, Chores, Sleep Schedule, etc.', value: 'Complete Tasks' },
    { id: 2, name: 'Each Task has a point value assigned that goes into your bank', value: 'Earn Points' },
    { id: 3, name: 'The more points you earn, the better rewards you unlock', value: 'Claim Rewards' },
  ]
  
  export default function HowItWorks() {
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                How It Works
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                Claim fun rewards in the Midnight Island BattlePass.
              </p>
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.id} className="flex flex-col bg-gray-400/5 p-8">
                  <dt className="text-sm font-semibold leading-6 text-gray-600">{stat.name}</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    )
  }
  