import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '@/components/Account'
import { NextPageWithLayout } from './_app'
import Layout from '@/layouts/Layout'
import { ReactElement, useEffect, useState } from 'react'
import Head from 'next/head'
import { useSearchParams, useRouter } from 'next/navigation';

const Points: NextPageWithLayout = () => {
  
    const searchParams = useSearchParams();
    const session = useSession()
    const router = useRouter()
    const supabase = useSupabaseClient()
    const [previousPoints, setOldPoints] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = searchParams.get('user');
        const approved = searchParams.get('approved');
        const points = searchParams.get('amount');
        const postId = searchParams.get('postId')
        if (userId != null) {
            if (approved != null && approved ==="true") {
                setPoints(userId, points);
            }
            else {
                resetTask({userId, postId});
            }
        }
    }, [searchParams]);

    async function setPoints(userId, points) {
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
            updatePoints({userId, points, id, email, old_points})
          }
        } catch (error) {
          alert('Error loading user data!')
          console.log(error)
        } finally {
          setLoading(false)
        }
      }


      async function updatePoints({userId, points, id, email, old_points}) {
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
          alert('Profile updated!')
          router.push('/tasks');
        } catch (error) {
          alert('Error updating the data!')
          console.log(error)
        } finally {
          setLoading(false)
        }
      }

      async function resetTask({userId, postId}) {
        try {
            setLoading(true)
            if (!userId) throw new Error('No user')

            const updates = {
                id: postId,
                datetime: new Date(1572840117245).toISOString()
            }

            let { error } = await supabase.from('tasks').upsert(updates)
            if (error) throw error
            alert('Task Reset!')
            router.push('/tasks');
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
                <title>BattlePass | Points</title>
                <meta name="description" content="Midnight Island Battle Pass" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="https://www.coltonmorrill.com/vaporwave-01.svg" />
            </Head>
            {session &&
                <>
                </>
            }
        </div>
    )
}

Points.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}

export default Points