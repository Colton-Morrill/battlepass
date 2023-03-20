import React, { ReactElement, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { signIn, useSession } from 'next-auth/react'
import { NextPageWithLayout } from './_app'
import SettingsForm from '@/components/SettingsForm'
const Layout = dynamic(() => import('@/layouts/Layout'), { ssr: false })

const Settings: NextPageWithLayout = () => {
  const { status, data } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") signIn()
  }, [status])
  return (
    <SettingsForm></SettingsForm>
  )
}

Settings.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Settings