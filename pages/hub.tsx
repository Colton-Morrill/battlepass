import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { NextPageWithLayout } from './_app'
import Layout from '@/layouts/Layout'
import { ReactElement } from 'react'
import BattlePass from '@/components/BattlePass'
import { useState } from 'react'
import Head from 'next/head'

const Hub: NextPageWithLayout = () => {
    const session = useSession()
    const supabase = useSupabaseClient()
    return (
        <>
            <Head>
                <title>BattlePass | Hub</title>
                <meta name="description" content="Midnight Island Battle Pass" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="https://www.coltonmorrill.com/vaporwave-01.svg" />
            </Head>
            <div className="container">
                {session &&
                    <BattlePass session={session} />
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