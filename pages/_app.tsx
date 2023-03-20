import '@/styles/globals.css'
import { ReactElement, ReactNode, useState } from 'react'
import type { AppProps } from 'next/app'
import type { NextPage } from 'next'
import ReduxWrapper from '@/components/ReduxWrapper'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function App({ Component, pageProps }: AppPropsWithLayout) {
  const [supabase] = useState(() => createBrowserSupabaseClient())
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <>
      <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
   
          <ReduxWrapper>
            {getLayout(
              <Component {...pageProps} />
            )}
          </ReduxWrapper>
       
      </SessionContextProvider>
    </>
  )
}

export default App;

