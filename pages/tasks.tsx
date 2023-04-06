import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { NextPageWithLayout } from './_app'
import Layout from '@/layouts/Layout'
import { ReactElement } from 'react'
import BattlePass from '@/components/BattlePass'
import { useState } from 'react'
import Head from 'next/head'
import emailjs from '@emailjs/browser';
import { useRef } from 'react'

const posts = [
    {
        id: 1,
        title: 'Wash the Dishes',
        href: '#',
        description:
            'Wash and dry the dishes before dinner. Make sure that there is no soap and food bits on the dishes when you wash them. After placing the dishes on the drying mat, wipe down the counters and clean the sink.',
        imageUrl:
            'https://images.pexels.com/photos/4108726/pexels-photo-4108726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        date: '5 Points',
        datetime: '2020-03-16',
        category: { title: 'Daily', href: '#' }
    },
    {
        id: 1,
        title: 'Take care of the Guinea Pigs',
        href: '#',
        description:
            'Clean out the cage and sweep it with the electric broom. Feed them 1 cup of veggies. Fill up both water bottles. After they are done eating separate them and feed each guinea pig their pellets.',
        imageUrl:
            'https://images.pexels.com/photos/12916343/pexels-photo-12916343.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        date: '5 Points',
        datetime: '2020-03-16',
        category: { title: 'Daily', href: '#' }
    },
    {
        id: 1,
        title: 'Clean up bed.',
        href: '#',
        description:
            'In the morning, fold your sheets and put them in the closet along with your pillow. Then return the couch into \'couch\' position and push it up against the wall.',
        imageUrl:
            'https://images.pexels.com/photos/1907784/pexels-photo-1907784.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        date: '5 Points',
        datetime: '2020-03-16',
        category: { title: 'Daily', href: '#' }
    },
    {
        id: 1,
        title: 'Complete your daily lessons.',
        href: '#',
        description:
            'In the beginning of the day, we will decide which lessons you need to complete. We will check at the end of the day if you have completed your lessons.',
        imageUrl:
            'https://images.pexels.com/photos/327882/pexels-photo-327882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        date: '5 Points',
        datetime: '2020-03-16',
        category: { title: 'Daily', href: '#' }
    },
    {
        id: 1,
        title: 'Read a chapter book.',
        href: '#',
        description:
            'We will take you to the library and you can pick out a chapter book. After reading the book you will do a 1 page book report or you can do a verbal book report and tell us about the book.',
        imageUrl:
            'https://images.pexels.com/photos/4170629/pexels-photo-4170629.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        date: '20 Points',
        datetime: '2020-03-16',
        category: { title: 'Bi-Weekly', href: '#' }
    },
    {
        id: 1,
        title: 'Sunday Funday.',
        href: '#',
        description:
            'Every Sunday, you can choose to help Colton to do laundry or help Anna do grocery shopping. Whichever you choose will earn you 10 points.',
        imageUrl:
            'https://images.pexels.com/photos/13092853/pexels-photo-13092853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        date: '10 Points',
        datetime: '2020-03-16',
        category: { title: 'Weekly', href: '#' }
    },
]

const Tasks: NextPageWithLayout = () => {
    const session = useSession()
    const supabase = useSupabaseClient()

    const form = useRef<HTMLFormElement>(null);

    const sendEmail = (e: any) => {
        e.preventDefault();

        emailjs.sendForm('service_0c0ssyl', 'template_bua0q2n', form.current, 'wbAzpgcSEVRID5A6w')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };


    return (
        <>
            <Head>
                <title>BattlePass | Tasks</title>
                <meta name="description" content="Midnight Island Battle Pass" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="https://www.coltonmorrill.com/vaporwave-01.svg" />
            </Head>
            <div className="bg-white py-24 sm:pt-16 sm:py-32 rounded-2xl">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Tasks</h2>
                        <p className="mt-2 text-lg leading-8 text-gray-600">
                            Complete the below tasks to earn points. <br></br>Report your tasks to Colton/Anna to earn your points.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {posts.map((post, i) => (
                            <article key={i} className="flex flex-col items-start justify-between">
                                <div className="relative w-full">
                                    <img
                                        src={post.imageUrl}
                                        alt=""
                                        className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                                    />
                                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                                </div>
                                <div className="max-w-xl">
                                    <div className="mt-8 flex items-center gap-x-4 text-xs">
                                        <time dateTime={post.datetime} className="text-gray-500">
                                            {post.date}
                                        </time>
                                        <a
                                            href={post.category.href}
                                            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                                        >
                                            {post.category.title}
                                        </a>
                                    </div>
                                    <div className="group relative">
                                        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                            <a href={post.href}>
                                                <span className="absolute inset-0" />
                                                {post.title}
                                            </a>
                                        </h3>
                                        <p className="mt-5 line-clamp-5 text-sm leading-6 text-gray-600">{post.description}</p>
                                    </div>
                                </div>
                                <form className="mt-3" ref={form} onSubmit={sendEmail}>
                                    <input readOnly className="hidden block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="text" name="message" value={post.title + " worth " + post.date} />
                                    <input className="hover:cursor-pointer rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="submit" value="Complete Task" />
                                </form>
                            </article>
                        ))}

                    </div>
                </div>
            </div>
        </>
    )
}

Tasks.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}


export default Tasks