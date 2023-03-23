import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '@/components/Account'
import { NextPageWithLayout } from './_app'
import Layout from '@/layouts/Layout'
import { ReactElement, useEffect } from 'react'
import Head from 'next/head'

const EditAccount: NextPageWithLayout = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      <Head>
                <title>BattlePass | Account</title>
                <meta name="description" content="Midnight Island Battle Pass" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="https://www.coltonmorrill.com/vaporwave-01.svg" />
      </Head>
    {session &&
        <Account session={session} />
    }
    </div>
  )
}

EditAccount.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default EditAccount