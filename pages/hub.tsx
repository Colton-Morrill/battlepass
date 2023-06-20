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

const Hub: NextPageWithLayout = () => {
    const session = useSession()
    const supabase = useSupabaseClient()
    const user = useUser();
    const router = useRouter()

    const [loading, setLoading] = useState(true)
    const [rewards, setRewards] = useState([])
    const [usersPoints, setUsersPoints] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [modalData, setModalData] = useState([
        { title: '', description: '' },
    ]);

    useEffect(() => {
        getCurrentRewards();
    }, [session])

    async function getCurrentRewards() {
        try {
            setLoading(true)
            if (!user) throw new Error('No user')

            let { data, error, status } = await supabase
                .from('rewards_asc_by_id')
                .select("*")
            if (error && status !== 406) {
                throw error
            }
            if (data) {
                setRewards(data);
                getUsersPoints();
            }
        } catch (error) {
            alert('Error loading user data!')
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function getUsersPoints() {
        try {
            setLoading(true)
            if (!user) throw new Error('No user')

            let { data, error, status } = await supabase
                .from('points')
                .select("*")
                .eq('user_id', user.id)
            if (error && status !== 406) {
                throw error
            }
            if (data) {
                setUsersPoints(data[0].points);
            }
        } catch (error) {
            alert('Error loading user data!')
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const checkForPoints = (rewardData) => {

        if (usersPoints < rewardData.cost) {
            const data = [
                { title: 'Not Enough Points!', description: 'You do not have enough points to claim this reward.' },
            ]
            setModalData(data);
            toggleModal();
        }
        else {
            const data = [
                { title: 'Reward Claimed!', description: 'Please wait for your reward to be approved.' },
            ]
            setModalData(data);
            getCurrentApprovals(rewardData);
        }
    };

    async function getCurrentApprovals(rewardData) {
        try {
            setLoading(true)
            if (!user) throw new Error('No user')

            let { data, error, status } = await supabase
                .from('desc_id')
                .select("*")
            if (error && status !== 406) {
                throw error
            }
            if (data) {
                toggleModal();
                addApproval(rewardData, data)
            }
        } catch (error) {
            alert('Error loading user data!')
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function addApproval(rewardData, data) {
        var length = data.length
        var id = null;
        if (length > 0) {
            id = data[0].id;
            id += 1
        }
        else {
            id = 1
        }
        try {
            setLoading(true)
            if (!user) throw new Error('No user')

            const { error } = await supabase
                .from('pending_approvals')
                .insert({ id: id, created_at: new Date().toISOString(), requested_by: user.id, email: user.email, name: rewardData.reward_name, points: rewardData.cost, approved: 'false', task_id: rewardData.id, type: 'Reward' })

            if (error) throw error
            sendNotification(rewardData);
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

    const sendNotification = (rewardData) => {

        var templateParams = {
            message: rewardData.reward_name,
            email: user.email,
        };

        emailjs.send('service_0c0ssyl', 'template_bua0q2n', templateParams, 'wbAzpgcSEVRID5A6w')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <>
            <Head>
                <title>BattlePass | Hub</title>
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
                                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Rewards</h2>
                                    <p className="mt-2 text-sm text-gray-700">
                                        Claim rewards below with your earned points!
                                    </p>
                                </div>
                                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                                    <p

                                        className="text-lg block rounded-md text-indigo-600 px-3 py-2 text-center text-sm font-semibold"
                                    >
                                        {'Available Points: ' + usersPoints}
                                    </p>
                                </div>
                            </div>
                            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                                {rewards.map((reward, i) => {
                                    const rewardData = reward;
                                    return (<article key={i} className="flex flex-col items-start justify-between">
                                        <div className="relative w-full">
                                            <img
                                                src={reward.image_url}
                                                alt=""
                                                className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                                            />
                                            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                                        </div>
                                        <div className="max-w-xl">
                                            <div className="group relative">
                                                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                                    <a href={reward.reward_name}>
                                                        <span className="absolute inset-0" />
                                                        {reward.reward_name}
                                                    </a>
                                                </h3>
                                                <div className="mt-1 flex items-center gap-x-4 text-xs">
                                                    <p className="text-gray-500">
                                                        {reward.cost} Points
                                                    </p>
                                                </div>
                                                <p className="mt-2 line-clamp-5 text-sm leading-6 text-gray-600">{reward.description}</p>
                                            </div>

                                        </div>
                                        <div className='flex flex-col justify-start gap-2'>
                                            <button onClick={() => checkForPoints(rewardData)} className="mt-3 hover:cursor-pointer disabled:hover:cursor-not-allowed rounded-md disabled:bg-gray-400 bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Claim Reward</button>
                                        </div>
                                    </article>)
                                })}
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

Hub.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}


export default Hub