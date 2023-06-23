import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { Brain, BadgeCheck, BarChart4, Paintbrush } from 'lucide-react';

const features = [
  {
    name: 'Create Engaging Chores',
    description:
      'Easily create and assign interactive, fun tasks that spark enthusiasm and drive engagement within your family.',
    icon: Brain,
  },
  {
    name: 'Seamlessly Approve Rewards:',
    description:
      'Effortlessly review and approve rewards, celebrating your family members\' accomplishments and keeping them motivated.',
    icon: BadgeCheck,
  },
  {
    name: 'Comprehensive Point Tracking',
    description:
      'Gain valuable insights into your family\'s progress and achievements, empowering you to acknowledge their efforts effectively.',
    icon: BarChart4,
  },
  {
    name: 'Customizable Rewards',
    description:
      'Tailor the rewards to match the preferences and interests of your family members. From personalized experiences to meaningful surprises.',
    icon: Paintbrush,
  },
]

export default function HowItWorks() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600"></h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to encourage productive behavior.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
          Effortlessly create and assign tasks to your family members, transforming them into exciting challenges.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
