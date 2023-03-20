import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react'
import { Database } from '../utils/database.types'
import PassItem from './PassItem'
import Image from 'next/image'

import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
type Profiles = Database['public']['Tables']['profiles']['Row']
type Points = Database['public']['Tables']['points']['Row']

export default function BattlePass({ session }: { session: Session }) {
  const [points, setPoints] = useState<Points['points']>(null)
  const supabase = useSupabaseClient<Database>()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState<Profiles['username']>(null)
  const [website, setWebsite] = useState<Profiles['website']>(null)
  const [avatar_url, setAvatarUrl] = useState<Profiles['avatar_url']>(null)

  useEffect(() => {
    getPoints()
  }, [session])

  var barWidth = null 
  var pointsNumb = Number(points)

if (pointsNumb === 500) {
  
  barWidth = "100";
}
else if (pointsNumb >= 200) {
  
  barWidth = "80";
}
else if (pointsNumb >= 100) {
  
  barWidth = "55";
}
else if (pointsNumb >= 50) {

  barWidth = "33";
}
else if(pointsNumb >= 20) {
  barWidth = "20";
}
else {
  barWidth = "0"
}


  async function getPoints() {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      let { data, error, status } = await supabase
        .from('points')
        .select(`points`)
        .eq('userId', user.id)
        .single()

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

  const bpItems = [
    { name: 'Food', src: "/food.webp", rarity: 'common' },
    { name: 'Movie', src: "/movie.webp", rarity: 'uncommon' },
    { name: 'V-Bucks', src: "/vbucks.webp", rarity: 'rare' },
    { name: 'Apex Coins', src: "/apex.jpg", rarity: 'epic' },
    { name: '$NOT CONCERT', src: "/snot.webp", rarity: 'legendary' },
]



  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className='w-full'>
      <div className='w-[0%] w-[33%] w-[55%] w-[80%] w-[100%] hidden'></div>
      <div className='w-full flex justify-end mb-10'>
        <div className='flex items-center gap-2'>
        <Image src="/star.webp" alt="star" width={30} height={30} />
        <h2 className='pass-text text-4xl'>{points}</h2>
        </div>
      </div>
      <div className='w-full grid grid-cols-5 gap-10 mb-10'>
      {bpItems.map((item, i) => (
          <PassItem key={i} props={item} />
      ))}
          
      </div>
      <div className='w-full grid grid-cols-5 gap-10 relative'>
        <div className={'absolute w-[90%] h-3 rounded-full -z-10 top-1/3'}>
          <div className={'w-[' + barWidth + '%] h-full bg-indigo-600'}></div>
        </div>
        <div className='w-full h-full flex justify-center items-center'>
          <div className='w-10 h-10 bg-indigo-600 flex items-center justify-center pass-text'>
              <div className='text-2xl font-bold text-white'>20</div>
          </div>
        </div>
        <div className='w-full h-full flex justify-center items-center'>
          <div className='w-10 h-10 bg-indigo-600 flex items-center justify-center pass-text'>
              <div className='text-2xl font-bold text-white'>50</div>
          </div>
        </div>
        <div className='w-full h-full flex justify-center items-center'>
          <div className='w-10 h-10 bg-indigo-600 flex items-center justify-center pass-text'>
              <div className='text-2xl font-bold text-white'>100</div>
          </div>
        </div>
        <div className='w-full h-full flex justify-center items-center'>
          <div className='w-10 h-10 bg-indigo-600 flex items-center justify-center pass-text'>
              <div className='text-2xl font-bold text-white'>200</div>
          </div>
        </div>
        <div className='w-full h-full flex justify-center items-center'>
          <div className='w-10 h-10 bg-indigo-600 flex items-center justify-center pass-text'>
              <div className='text-2xl font-bold text-white'>500</div>
          </div>
        </div>
      </div>
    </div>
  )
}