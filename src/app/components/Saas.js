"use client"
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-white">
      <div className="relative isolate pt-14">
        <div className="py-16 sm:py-10 lg:pb-10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-extrabold tracking-normal text-slate-800 sm:text-6xl">
                Grow your business with our <span className="bg-gradient-to-r from-blue-700 via-blue-500 to-red-400 bg-clip-text text-transparent">B2B SaaS app</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Designed to streamline processes, boost productivity, and drive growth, our platform is tailored to meet the unique needs of modern enterprises.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a href="#" className="rounded-xl bg-gradient-to-r from-blue-400 via-blue-600 to-blue-700 px-8 py-4 text-lg font-medium text-white shadow-2xl shadow-stone-600 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                  Create your Account for Free
                </a>
              </div>
            </div>
            <div className="mt-8 flow-root sm:mt-16">
              <div className="-m-2 rounded-xl bg-slate-500/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-3xl lg:p-6">
                <img
                  src="https://media.licdn.com/dms/image/D5622AQE7K368yyBoHQ/feedshare-shrink_2048_1536/0/1713804765476?e=1717632000&v=beta&t=hxYeDX5zi4_c9yLOlQPiQIW7Jd02AZFpVIJ0a0j6zGk"
                  alt="App screenshot"
                  width={2432}
                  height={1442}
                  className="rounded-md shadow-2xl ring-1 ring-slate-500/10"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
