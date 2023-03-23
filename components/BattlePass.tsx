import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react'
import { Database } from '../utils/database.types'
import PassItem from './PassItem'
import Image from 'next/image'
import { Check } from 'lucide-react'

import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
type Profiles = Database['public']['Tables']['profiles']['Row']
type Points = Database['public']['Tables']['points']['Row']

export default function BattlePass({ session }: { session: Session }) {
  const [points, setPoints] = useState<Points['points']>(null)
  const supabase = useSupabaseClient<Database>()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [rowCount, setRowCount] = useState(0)
  const [username, setUsername] = useState<Profiles['username']>(null)
  const [website, setWebsite] = useState<Profiles['website']>(null)
  const [avatar_url, setAvatarUrl] = useState<Profiles['avatar_url']>(null)

  useEffect(() => {
    getProfile()
    getPoints()
  }, [session])

  var barWidth:any = null
  var pointsNumb = Number(points)

  if (pointsNumb === 500) {

    barWidth = 5;
  }
  else if (pointsNumb >= 200) {

    barWidth = 4;
  }
  else if (pointsNumb >= 100) {

    barWidth = 3;
  }
  else if (pointsNumb >= 50) {

    barWidth = 2;
  }
  else if (pointsNumb >= 20) {
    barWidth = 1;
  }
  else {
    barWidth = 0
  }

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

  async function getPoints() {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      let { data, error, status } = await supabase
        .from('points')
        .select(`points`)
        .eq('email', user.email)
        .single()

      if (status == 406) {
        createPointsData()
      }

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setPoints(data.points);
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function createPointsData() {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      countRows()
      var rowNumber = rowCount.toString();

      let { error } = await supabase.from('points').insert({ id: rowNumber, points: "0", email: user.email })
      if (error) throw error
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  async function countRows() {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      const { count, error } = await supabase
        .from('points')
        .select('*', { count: 'exact', head: true })

      if (count) {
        setRowCount(count);
      }

      if (error) throw error
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const bpItems = [
    { name: 'You Pick Dinner', src: "/food.webp", rarity: 'common', cost: '20' },
    { name: 'Movie Night', src: "/movie.webp", rarity: 'uncommon', cost: '50' },
    { name: '1000 V-Bucks', src: "/vbucks.webp", rarity: 'rare', cost: '100' },
    { name: '1000 Apex Coins', src: "/apex.jpg", rarity: 'epic', cost: '200' },
    { name: '$NOT Concert Tickets', src: "/snot.webp", rarity: 'legendary', cost: '500' },
  ]

  const slicedArray = bpItems.slice(0, barWidth);

  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className='w-full content-container flex justify-center items-center flex-col'>
      <div className='w-[0%] w-[33%] w-[55%] w-[80%] w-[100%] hidden'></div>
      <div className='w-full flex justify-between mb-10'>
        <h1 className='text-3xl font-bold pass-text'>Welcome <span className='text-red-500'>{username}</span></h1>
        <div className='flex items-center gap-2'>
          <Image src="/legendtokens.png" alt="star" className='-mt-2' width={30} height={30} />
          <h2 className='pass-text text-2xl leading-[0.5rem]'>{points}</h2>
        </div>
      </div>
      <div className='w-full grid grid-cols-5 gap-1 relative border-b-4 border-orange-500'>
        {bpItems.map((item, i) => (
          <div key={i} className='w-full h-full flex justify-center items-center bg-black/25'>
            <div className='w-10 h-10 flex items-center justify-center pass-text'>
              <div className='text-2xl font-bold text-white'>{item.cost}</div>
            </div>
          </div>
        ))}
      </div>
      <div className='w-full grid grid-cols-5 gap-1'>
        {bpItems.map((item, i) => (
          <h3 key={i} className='text-center pass-text text-2xl bg-black/25 pt-3'>{item.name}</h3>
        ))}
      </div>
      <div className='w-full grid grid-cols-5 gap-1'>
       { slicedArray.map((item, i) => {
          var triangle = null;
           if (item.rarity === "legendary") {
            triangle = "border-l-yellow-400"
        }
        else if (item.rarity === "epic") {
            triangle = "border-l-purple-500"
        }
        else if (item.rarity === "rare") {
            triangle = "border-l-blue-400"
        }
        else if (item.rarity === "uncommon") {
            triangle = "border-l-lime-200"
        }
        else {
            triangle = "border-l-gray-300"
        }
        return (<div key={i} className="w-full relative"><div className={'inner-triangle ' + triangle}><Check className='-ml-[55px] mt-1' size={30} /></div></div>
        )})}
      </div>
      <div className='w-full grid grid-cols-5 gap-1 mb-10'>
       { bpItems.map((item, i) => {
        return (<PassItem key={i} props={item} progress={barWidth}></PassItem>
        )})}
      </div>
    </div>
  )
}

