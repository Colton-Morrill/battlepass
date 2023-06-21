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
import { useSearchParams } from 'next/navigation'

const TaskEdit: NextPageWithLayout = () => {
    const session = useSession()
    const supabase = useSupabaseClient()
    const user = useUser();
    const router = useRouter()
    const searchParams = useSearchParams();

    const [loading, setLoading] = useState(true)
    const [tasks, setRewards] = useState([])
    const [users, setUsers] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [modalData, setModalData] = useState([
        { title: '', description: '' },
    ]);
    const [taskId, setTaskId] = useState(-1)
    const [taskTitle, setTaskTitle] = useState("")
    const [taskDescription, setTaskDescription] = useState("")
    const [taskImage, setTaskImage] = useState("")
    const [taskPoints, setTaskPoints] = useState("")
    const [taskAssignee, setTaskAssignee] = useState("")
    const [taskUsername, setTaskUsername] = useState("")
    const [taskDateTime, setTaskDateTime] = useState("")
    console.log(taskAssignee);

    useEffect(() => {
        const id = Number(searchParams.get('id'));
        setTaskId(id);
        if (id != -1 && id != 0) {
            getTask(id);
        }
        getUsers()
    }, [searchParams])

    async function getTask(id) {
        try {
            setLoading(true)
            if (!user) throw new Error('No user')

            let { data, error, status } = await supabase
                .from('rewards')
                .select("*")
                .eq('id', id)
            if (error && status !== 406) {
                throw error
            }
            if (data) {
                setRewards(data);
                setTaskTitle(data[0].reward_name);
                setTaskDescription(data[0].description);
                setTaskImage(data[0].image_url);
                setTaskPoints(data[0].cost);
                setTaskUsername(data[0].user_name);
                setTaskAssignee(JSON.stringify([{ userId: data[0].assigned_to, userName: data[0].user_name },]));
                setTaskDateTime(data[0].created_at);
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

    async function getCurrentTasks(tasks) {
        try {
            setLoading(true)
            if (!user) throw new Error('No user')

            let { data, error, status } = await supabase
                .from('rewards_by_id')
                .select("*")
            if (error && status !== 406) {
                throw error
            }
            if (data) {
                addTask(tasks, data)
            }
        } catch (error) {
            alert('Error loading user data!')
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function addTask(tasks, data) {
        var length = data.length
        var id = null;
        if (taskId != -1) {
            id = tasks[0].id;
        }
        else {
            if (length > 0) {
                id = data[0].id;
                id += 1
            }
            else {
                id = 1
            }
        }
        var userData = []
        if (taskAssignee === "") {
            userData = [
                { userId: users[0].id, userName: users[0].username },
            ]
        }
        else {
            userData = JSON.parse(taskAssignee);
        }
        try {
            setLoading(true)
            if (!user) throw new Error('No user')

            const { error } = await supabase
                .from('rewards')
                .upsert({ id: id, reward_name: taskTitle, description: taskDescription, image_url: taskImage, cost: taskPoints, assigned_to: userData[0].userId, user_name: userData[0].userName })

            if (error) throw error
            alert('Reward Updated!');
            router.push('/reward-list');
        } catch (error) {
            alert('Error updating the data!')
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const parseJSON = () => {
        const userData = JSON.parse(taskAssignee);
        console.log(userData);
    }

    const toggleModal = () => {
        setModalVisible(modalVisible => !modalVisible);
        console.log(modalVisible);
    }

    return (
        <>
            <Head>
                <title>BattlePass | Task Edit</title>
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
                                    <h1 className="text-xl font-bold leading-6 text-gray-900">{taskId === -1 ? 'Add Reward' : 'Reward Edit'}</h1>
                                    <p className="mt-2 text-sm text-gray-700">
                                        {taskId === -1 ? 'Fill out the form below to add a reward.' : 'Edit the form below to edit the reward.'}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4 sm:flex-none">
                                <form>
                                    <div className='my-6'>
                                        <label className="block text-sm font-medium leading-6 text-gray-900">
                                            Reward Title
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="Task Title"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                value={taskTitle || ''}
                                                onChange={(e) => setTaskTitle(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='my-6'>
                                        <label className="block text-sm font-medium leading-6 text-gray-900">
                                            Reward Description
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                name="Task Title"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                value={taskDescription || ''}
                                                onChange={(e) => setTaskDescription(e.target.value)}
                                            >
                                            </textarea>
                                        </div>
                                    </div>
                                    <div className='my-6'>
                                        <label className="block text-sm font-medium leading-6 text-gray-900">
                                            Reward Image <br />
                                            <span className='text-xs text-gray-500'>Hyperlink URL</span>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="Task Title"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                value={taskImage || ''}
                                                onChange={(e) => setTaskImage(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='my-6'>
                                        <label className="block text-sm font-medium leading-6 text-gray-900">
                                            Reward Cost
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="Task Title"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                value={taskPoints || ''}
                                                onChange={(e) => setTaskPoints(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='my-6'>
                                        <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                            Reward Assignee
                                        </label>
                                        <select
                                            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={taskAssignee}
                                            onChange={(e) => setTaskAssignee(e.target.value)}
                                        >
                                            {
                                                users.map((user, i) => {
                                                    const data = [
                                                        { userId: user.id, userName: user.username },
                                                    ]
                                                    return (
                                                        <option key={i} value={JSON.stringify(data)}>{user.username}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className='my-6 flex justify-end'>
                                        <button
                                            type="button"
                                            onClick={() => getCurrentTasks(tasks)}
                                            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

TaskEdit.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}


export default TaskEdit