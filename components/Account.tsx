import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react'
import { Database } from '../utils/database.types'
import { setAdmin, setMember } from '@/slices/userTypeSlice'

import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
type Profiles = Database['public']['Tables']['profiles']['Row']
type Points = Database['public']['Tables']['points']['Row']

export default function Account({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [previousPoints, setOldPoints] = useState<Points['points']>(null)
  const [userType, setUserType] = useState('member')
  const [username, setUsername] = useState<Profiles['username']>(null)
  const [website, setWebsite] = useState<Profiles['website']>(null)
  const [points, setTalonsPoints] = useState<Points['points']>(null)
  const [avatar_url, setAvatarUrl] = useState<Profiles['avatar_url']>(null)
  const [email, setUserId] = useState('talonjacobmorrill@gmail.com')
  const blank = "0"
  const [inputReset, setInputReset] = useState('')


  useEffect(() => {
    getTalonsPoints()
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url, type`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        if (data.type === "admin") {
          setUserType('admin')
          dispatch(setAdmin())
        }
        else {
          setUserType('member')
          dispatch(setMember())
        }
        setUsername(data.username)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function getTalonsPoints() {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      let { data, error, status } = await supabase
        .from('points')
        .select(`points`)
        .eq('id', '0')
        .single()

      if (error && status !== 406) {
        throw error
      }

      console.log(data);

      if (data) {
        setOldPoints(data.points)
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({
    username
  }: {
    username: Profiles['username']
  }) {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function updatePoints({
    points
  }: {
    points: Points['points']
  }) {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      var oldPointsNumb = Number(previousPoints)
      var pointsNumb = Number(points)
      var totalNumb = oldPointsNumb + pointsNumb
      var total = totalNumb.toString()
      points = total;

      const updates = {
        id: "0",
        points,
        email,
      }

      let { error } = await supabase.from('points').upsert(updates)
      if (error) throw error
      getTalonsPoints()
      setTalonsPoints("")
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }


  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="form-widget w-full lg:w-1/2 mx-auto content-container bg-[#111827] p-10 rounded-2xl">
      <h1 className='text-3xl font-bold mb-10'>Account Settings</h1>
      <h2 className='text-xl font-bold mb-3'>Public Settings</h2>
      <div className='flex flex-col'>
        <label htmlFor="username">Username</label>
        <input
          className='rounded bg-slate-800 border-slate-700 mt-2'
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className='flex justify-end'>
        <button
          className="my-3 w-32 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => updateProfile({ username })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      {userType === "admin" &&
        <>
          <h2 className='text-xl font-bold mb-3'>Manual Override</h2>
          <h3 className='font-bold mb-6'>Adjust Talon&apos;s Points</h3>
          <div className='flex flex-col'>
            <label htmlFor="username">{"Talon's Points " + "(" + previousPoints + ")"}</label>
            <input
              className='rounded bg-slate-800 border-slate-700 mt-3'
              id="points"
              type="text"
              onChange={(e) => setTalonsPoints(e.target.value)}
              value={points}
            />
          </div>
          <div className='flex justify-end'>
            <button
              className="my-3 w-32 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => updatePoints({ points })}
              disabled={loading}
            >
              {loading ? 'Loading ...' : 'Update'}
            </button>
          </div>
        </>
      }
      <div className='flex justify-end'>
        <button className="w-32 rounded-md bg-gray-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
    </div>
  )
}