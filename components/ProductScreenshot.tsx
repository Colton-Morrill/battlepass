import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import { UserPlus2, BadgeCheckIcon, BarChart2 } from 'lucide-react'

const features = [
  {
    name: 'Add Family Members.',
    description:
      'Easily add all your family members with our simple to use interface.',
    icon: UserPlus2,
  },
  {
    name: 'Approve Tasks.',
    description: 'Automatic notifications and a streamlined approval process make it easy to approve tasks.',
    icon: BadgeCheckIcon,
  },
  {
    name: 'Point Tracking.',
    description: 'Detailed point tracking allows you to see where each family members stands and how close they are to getting rewarded.',
    icon: BarChart2,
  },
]

export default function ProductScreenshot() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:ml-auto lg:pl-4 lg:pt-4 flex items-center justify-center">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">Encourage Productivity.</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Easy to use.</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
              Effortlessly create and assign enjoyable activities to your family members.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="flex items-start justify-end lg:order-first">
            <img
              src="/approvals.png"
              alt="Product screenshot"
              className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[80rem]"
              width={2432}
              height={1442}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
