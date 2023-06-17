import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import Account from '@/components/Account'
import { NextPageWithLayout } from './_app'
import Layout from '@/layouts/Layout'
import { ReactElement, useEffect, useState } from 'react'
import Head from 'next/head'
import { useSearchParams, useRouter } from 'next/navigation';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Approvals: NextPageWithLayout = () => {

  const searchParams = useSearchParams();
  const session = useSession()
  const router = useRouter()
  const supabase = useSupabaseClient()
  const user = useUser();

  const [loading, setLoading] = useState(true)
  const [approvals, setApprovals] = useState([])

  const filtered = (approved) => approvals.filter(i => i.approved.includes(approved));
  const approvedArray = filtered('true');
  const unapprovedArray = filtered('false');

  useEffect(() => {
    getCurrentApprovals();
  }, [session])

  async function getCurrentApprovals() {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      let { data, error, status } = await supabase
        .from('pending_approvals')
        .select("*")
      if (error && status !== 406) {
        throw error
      }
      if (data) {
        setApprovals(data);
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function setPoints(userId, points, approval) {
    try {
      setLoading(true)
      if (!userId) throw new Error('No user')

      let { data, error, status } = await supabase
        .from('points')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        const old_points = data.points;
        const id = data.id;
        const email = data.email
        updatePoints({ userId, points, id, email, old_points })
        switchStatus(approval);
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function switchStatus(approval) {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      const updates = {
        id: approval.id,
        created_at: approval.created_at,
        email: approval.email,
        task_name: approval.task_name,
        points: approval.points,
        approved: 'true',
      }

      let { error } = await supabase.from('pending_approvals').upsert(updates)
      if (error) throw error
      getCurrentApprovals()
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function denyTask(userId, approval) {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      const { error } = await supabase
        .from('pending_approvals')
        .delete()
        .eq('id', approval.id)
      if (error) throw error
      resetTask({ userId, approval })
      getCurrentApprovals()
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }


  async function updatePoints({ userId, points, id, email, old_points }) {
    try {
      setLoading(true)
      if (!userId) throw new Error('No user')
      var oldPointsNumb = Number(old_points)
      var pointsNumb = Number(points)
      var totalNumb = oldPointsNumb + pointsNumb
      var total = totalNumb.toString()
      points = total;

      const updates = {
        id: id,
        points,
        email: email,
        user_id: userId,
      }

      let { error } = await supabase.from('points').upsert(updates)
      if (error) throw error
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function resetTask({ userId, approval }) {
    try {
      setLoading(true)
      if (!userId) throw new Error('No user')

      const updates = {
        id: approval.task_id,
        datetime: new Date(1572840117245).toISOString()
      }

      let { error } = await supabase.from('tasks').upsert(updates)
      if (error) throw error
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      <Head>
        <title>BattlePass | Approvals</title>
        <meta name="description" content="Midnight Island Battle Pass" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://www.coltonmorrill.com/vaporwave-01.svg" />
      </Head>
      {session &&
        <div className="bg-white rounded-2xl">
          <div className="mx-auto p-16">
            {loading ?
              <>
                <Skeleton height={40} />
                <Skeleton className="mb-10" height={20} />
                <Skeleton height={20} />
                <Skeleton className="mb-10" height={20} />
                <Skeleton className="mb-5" height={30} />
                <Skeleton height={30} count={10} />
                <Skeleton height={20} />
                <Skeleton className="mb-10" height={20} />
                <Skeleton className="mb-5" height={30} />
                <Skeleton height={30} count={10} />
              </>
              :
              <>
                <div className="mx-auto text-start">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Task Approvals</h2>
                </div>
                <div className="mx-auto mt-16 max-w-2xl gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none">
                  <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                      <h1 className="text-base font-semibold leading-6 text-gray-900">Requested Approvals</h1>
                      <p className="mt-2 text-sm text-gray-700">
                        Choose an action for the requested approvals below.
                      </p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                      {/* <button
                    type="button"
                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Approval All
                  </button> */}
                    </div>
                  </div>
                  <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300 mb-12">
                          <thead>
                            <tr>
                              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                Name
                              </th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Task
                              </th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Date Completed
                              </th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Points
                              </th>
                              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                <span className="sr-only">Edit</span>
                              </th>
                              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                <span className="sr-only">Deny</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {unapprovedArray.length < 1 ?
                              <tr>
                                <td className='text-gray-400 py-6'>No Pending Approvals.</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                              </tr>
                              :
                              unapprovedArray.map((approval, i) => {
                                var date = new Date(approval.created_at);
                                var formattedDate = date.toLocaleString();
                                var userId = approval.requested_by;
                                var points = approval.points;
                                return (<tr key={i}>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                    {approval.email}
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{approval.task_name}</td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formattedDate}</td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{approval.points}</td>
                                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                    <button onClick={() => setPoints(userId, points, approval)} className="text-indigo-600 hover:text-indigo-900">
                                      Approve<span className="sr-only">, {approval.name}</span>
                                    </button>
                                  </td><td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                    <button onClick={() => denyTask(userId, approval)} className="text-red-600 hover:text-red-900">
                                      Deny<span className="sr-only">, {approval.name}</span>
                                    </button>
                                  </td>
                                </tr>)
                              })
                            }
                          </tbody>
                        </table>
                        <div className="sm:flex sm:items-center mb-10">
                          <div className="sm:flex-auto">
                            <h1 className="text-base font-semibold leading-6 text-gray-900">Approval History</h1>
                            <p className="mt-2 text-sm text-gray-700">
                              View previous approvals.
                            </p>
                          </div>
                          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                            {/* <button
                    type="button"
                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Approval All
                  </button> */}
                          </div>
                        </div>
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead>
                            <tr>
                              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                Name
                              </th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Task
                              </th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Date Completed
                              </th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Points
                              </th>
                              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                <span className="sr-only">Edit</span>
                              </th>
                              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                <span className="sr-only">Deny</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {approvedArray.length < 1 ?
                              <tr>
                                <td className='text-gray-400 py-6'>No History Available.</td>
                                <td></td>
                                <td></td>
                                <td></td>
                              </tr>
                              :
                              approvedArray.map((approval, i) => {
                                var date = new Date(approval.created_at);
                                var formattedDate = date.toLocaleString();
                                var userId = approval.requested_by;
                                var points = approval.points;
                                return (<tr key={i}>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                    {approval.email}
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{approval.task_name}</td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formattedDate}</td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{approval.points}</td>
                                </tr>)
                              })
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            }
          </div>
        </div>
      }
    </div>
  )
}

Approvals.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Approvals