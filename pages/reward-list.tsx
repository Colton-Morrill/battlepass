import { useSession, useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { NextPageWithLayout } from './_app'
import Layout from '@/layouts/Layout'
import { ReactElement } from 'react'
import BattlePass from '@/components/BattlePass'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Popup from '@/components/Popup'
import emailjs from '@emailjs/browser';
import Link from 'next/link'

const RewardList: NextPageWithLayout = () => {
    const session = useSession()
    const supabase = useSupabaseClient()
    const user = useUser();
    const router = useRouter()

    const [loading, setLoading] = useState(true)
    const [tasks, setTasks] = useState([])
    const [users, setUsers] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [modalData, setModalData] = useState([
        { title: '', description: '' },
    ]);

    useEffect(() => {
        getTasks();
    }, [session])

    async function getTasks() {
        try {
            setLoading(true)
            if (!user) throw new Error('No user')

            let { data, error, status } = await supabase
                .from('rewards')
                .select("*")
            if (error && status !== 406) {
                throw error
            }
            if (data) {
                setTasks(data);
                getUsers();
            }
        } catch (error) {
            alert('Error loading user data!')
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function getUsers() {
        try {
            setLoading(true)
            if (!user) throw new Error('No user')

            let { data, error, status } = await supabase
                .from('profiles')
                .select("*")
            if (error && status !== 406) {
                throw error
            }
            if (data) {
                setUsers(data);
            }
        } catch (error) {
            alert('Error loading user data!')
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function denyTask(task) {
        try {
            setLoading(true)
            if (!user) throw new Error('No user')

            const { error } = await supabase
                .from('rewards')
                .delete()
                .eq('id', task.id)
            if (error) throw error
            getTasks()
            const data = [
                { title: 'Reward Deleted!', description: 'Reward ' + task.reward_name + " has been deleted." },
            ]
            setModalData(data);
            toggleModal()
        } catch (error) {
            alert('Error updating the data!')
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    const toggleModal = () => {
        setModalVisible(modalVisible => !modalVisible);
        console.log(modalVisible);
    }

    return (
        <>
            <Head>
                <title>BattlePass | Reward List</title>
                <meta name="description" content="Midnight Island Battle Pass" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="https://www.coltonmorrill.com/vaporwave-01.svg" />
            </Head>
            <div className="container relative min-h-screen">
                {session &&
                    <>
                        <div className={modalVisible ? 'absolute top-0 left-0 right-0 bottom-0 z-50 bg-black/50 flex justify-center items-center' : 'hidden absolute top-0 left-0 right-0 bottom-0 z-50 bg-black/50 flex justify-center items-center'}>
                            <Popup title={modalData[0].title} description={modalData[0].description} action={() => toggleModal()} />
                        </div>
                        <div className="bg-white p-16 rounded-2xl">
                            <div className="sm:flex sm:items-center">
                                <div className="sm:flex-auto">
                                    <h1 className="text-xl font-bold leading-6 text-gray-900">Task List</h1>
                                    <p className="mt-2 text-sm text-gray-700">
                                        Choose an action for the rewards below.
                                    </p>
                                </div>
                                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                                    <Link
                                        href="/reward-edit?id=-1"
                                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Add Reward
                                    </Link>
                                </div>
                            </div>
                            <div className="mt-8 flow-root">
                                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                        <table className="min-w-full divide-y divide-gray-300 mb-12">
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        Name
                                                    </th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        Cost
                                                    </th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        Assigned To
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
                                                {tasks.length < 1 ?
                                                    <tr>
                                                        <td className='text-gray-400 py-6'>No Pending Approvals.</td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                    :
                                                    tasks.map((task, i) => {
                                                        var date = new Date(task.datetime);
                                                        var formattedDate = date.toLocaleString();
                                                        var editUrl = "/reward-edit?id=" + task.id;
                                                        return (<tr key={i}>
                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                                                {task.reward_name}
                                                            </td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{task.cost}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{task.user_name}</td>
                                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                                <a href={editUrl} className="text-indigo-600 hover:text-indigo-900">
                                                                    Edit
                                                                </a>
                                                            </td><td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                                <button onClick={() => denyTask(task)} className="text-red-600 hover:text-red-900">
                                                                    Delete
                                                                </button>
                                                            </td>
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
        </>
    )
}

RewardList.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}


export default RewardList