"use client"
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

const navigation = [
  { name: 'UI/UX', href: '#' },
  { name: 'Website', href: '#' },
  { name: 'Landing Page', href: '#' },
  { name: 'Web App', href: '#' },
]

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-slate-100">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="bg-gradient-to-r from-sky-400 via-blue-300 to-pink-300 bg-clip-text text-transparent text-lg font-extrabold lg:text-3xl px-2 py-2 lg:px-4 lg:py-1">Next.js</span>

            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-md font-semibold leading-6 text-white hover:underline-offset-8 underline-offset-2 underline decoration-2 hover:decoration-4 hover:decoration-sky-500 hover:transition hover:ease-in-out hover:delay-150">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#tally-open=mVZ8va&tally-emoji-text=👋&tally-emoji-animation=wave" className="text-md font-semibold leading-6 underline-offset-2 text-white decoration-2 hover:decoration-4 hover:transition hover:ease-in-out hover:delay-150  hover:decoration-sky-500 hover:underline-offset-8 underline">
              Contact me <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <Image
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt=""
                  width={100}
                  height={100}
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/25">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#tally-open=mVZ8va&tally-emoji-text=👋&tally-emoji-animation=wave"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                  >
                    Contact me
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <div className="relative table w-full py-36 lg:py-64 bg-no-repeat bg-center bg-cover" style={{backgroundImage:"url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}>

        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/40 via-slate-800/70 to-slate-700/30"></div>
        <div className="absolute inset-0 bg-repeat bg-center bg-cover"></div>

        <div className="w-full mx-auto max-w-5xl relative text-center py-10 lg:py-20">

          <div className="mx-auto grid grid-cols-1 mt-10 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
                Build Ultra Fast Website with Next.js and  <span className='bg-gradient-to-r from-sky-400 via-blue-500 to-pink-400 bg-clip-text text-transparent'>Tailwind CSS</span>
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-300 capitalize max-w-2xl mx-auto">
            Create stunning, responsive websites seamlessly with the powerful combination of Next.js and Tailwind CSS.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#tally-open=mVZ8va&tally-emoji-text=👋&tally-emoji-animation=wave"
                className="rounded-md bg-gradient-to-r from-sky-400 via-blue-700 to-pink-500 px-10 py-4 text-lg font-semibold text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
              >
                Contact me
              </a>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
