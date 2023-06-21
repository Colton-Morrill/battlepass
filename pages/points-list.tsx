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

const PointsList: NextPageWithLayout = () => {
    const session = useSession()
    const supabase = useSupabaseClient()
    const user = useUser();
    const router = useRouter()

    const [loading, setLoading] = useState(true)
    const [points, setPoints] = useState([])
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
                .from('points')
                .select("*")
            if (error && status !== 406) {
                throw error
            }
            if (data) {
                setPoints(data);
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


    const toggleModal = () => {
        setModalVisible(modalVisible => !modalVisible);
        console.log(modalVisible);
    }

    return (
        <>
            <Head>
                <title>BattlePass | Points List</title>
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
                                    <h1 className="text-xl font-bold leading-6 text-gray-900">Points List</h1>
                                    <p className="mt-2 text-sm text-gray-700">
                                        Below are each users points.
                                    </p>
                                </div>
                                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                                    {/* <Link
                                        href="/reward-edit?id=-1"
                                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Add Reward
                                    </Link> */}
                                </div>
                            </div>
                            <div className="mt-8 flow-root">
                                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                        <table className="min-w-full divide-y divide-gray-300 mb-12">
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="pr-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        Email
                                                    </th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        Points
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {points.length < 1 ?
                                                    <tr>
                                                        <td className='text-gray-400 py-6'>No Point Data.</td>
                                                        <td></td>
                                                    </tr>
                                                    :
                                                    points.map((point, i) => {
                                                        return (<tr key={i}>
                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                                                {point.email}
                                                            </td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{point.points}</td>
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

PointsList.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}


export default PointsList