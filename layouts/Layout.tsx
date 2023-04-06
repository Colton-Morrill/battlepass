import { useEffect, useState } from 'react'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Database } from '../utils/database.types'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useUser, Session } from '@supabase/auth-helpers-react'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import type { RootState } from '@/store'
import Head from 'next/head'
type Profiles = Database['public']['Tables']['profiles']['Row']
type Points = Database['public']['Tables']['points']['Row']

const navigation = [
  { name: 'Battle Pass', href: '/hub', current: false },
  { name: 'Account', href: '/account', current: false },
  { name: 'Tasks', href: '/tasks', current: false },
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Layout({ children }: any) {
  const theme = useSelector((state: RootState) => state.reducer.theme.value);
  useEffect(() => {
    var root = document.getElementsByTagName('html')[0];
    root.setAttribute('class', theme);
  }, [theme]);
  const session = useSession()
  const supabase = useSupabaseClient()
  const dispatch = useDispatch<AppDispatch>();

  
  return (
    <>
      {!session ? (
        <>
          <Head>
            <title>Sign In | Midnight Island</title>
            <meta name="description" content="Midnight Island Battle Pass" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="https://www.coltonmorrill.com/vaporwave-01.svg" />
          </Head>
          <div className='h-screen w-screen flex justify-center items-center bg-black'>
            <div className='w-full lg:w-1/3 px-10'>
              <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" providers={[]} />
            </div>
          </div>
        </>
      ) : (
        <div className="min-h-full">
          <Disclosure as="nav" className="bg-gray-900 shadow-sm">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="flex h-16 justify-between">
                    <div className="flex">
                      <div className="flex flex-shrink-0 items-center">
                        <img
                          className="block h-8 w-auto lg:hidden rounded-lg"
                          src="https://www.coltonmorrill.com/vaporwave-01.svg"
                          alt="Your Company"
                        />
                        <img
                          className="hidden h-8 w-auto lg:block rounded-lg"
                          src="https://www.coltonmorrill.com/vaporwave-01.svg"
                          alt="Your Company"
                        />
                      </div>
                      <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? 'border-indigo-500 text-gray-900'
                                : 'border-transparent text-gray-400 hover:border-gray-300 hover:text-gray-700 pass-text',
                              'inline-flex items-center text-lg border-b-2 px-1 pt-1 font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                      <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">

                        <button
                          onClick={() => supabase.auth.signOut()}
                          className={classNames(
                            'border-transparent text-gray-400 pass-text hover:border-gray-300 hover:text-gray-700 ml-auto inline-flex items-center border-b-2 px-1 pt-1 text-lg font-medium'
                          )}
                        >
                          Sign Out
                        </button>

                      </div>
                    </div>

                    <div className="-mr-2 flex items-center sm:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>
                <Disclosure.Panel className="sm:hidden">
                  <div className="space-y-1 pt-2 pb-3">
                    {navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                            : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800',
                          'block border-l-4 py-2 pl-3 pr-4 text-base font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>

                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <div className="py-10">
            <header>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              </div>
            </header>
            <main>
              <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
            </main>
          </div>
        </div>
      )}
    </>
  )
}
