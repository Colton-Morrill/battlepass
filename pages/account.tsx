import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '@/components/Account'
import { NextPageWithLayout } from './_app'
import Layout from '@/layouts/Layout'
import { ReactElement, useEffect } from 'react'

const EditAccount: NextPageWithLayout = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
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