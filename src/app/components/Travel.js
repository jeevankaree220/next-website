"use client"
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]


export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
//   console.log(Country.getAllCountries())
  return (
    <div className="bg-white lg:h-screen h-full">
        <div className='absolute inset-x-0 top-[calc(100%-3rem)] z-1 transform-gpu border-l-purple-200 overflow-hidden sm:top-[calc(100%-40rem)]'>

                <Image src={'/paper-plane.svg'} className='origin-center -rotate-12 p-4 rounded-xl opacity-40' width={100} height={100} alt='Next.js Website for Flight Booking'/>
                </div>
      <div className="relative isolate pt-8">
        <div className="py-16 sm:py-16 lg:pb-0">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="relative mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-extrabold tracking-normal text-slate-800 sm:text-7xl">

              Book Your Next Adventure Today! <span className="bg-gradient-to-r from-red-700 via-red-500 to-red-400 bg-clip-text text-transparent">✈</span>
              </h1>
              <div className='absolute top-0 left-0'>

<Image src={'/paper-plane.svg'} className='origin-center rotate-12 p-0 rounded-xl opacity-30' width={60} height={60} alt='Next.js Website for Flight Booking'/>
</div>
              <p className="mt-6 text-lg leading-8 text-gray-600">
              Whether you&apos;re planning a weekend getaway, a business trip, or a dream vacation, we&apos;ve got you covered. With our user-friendly interface and extensive network of airlines, booking your flight tickets has never been easier.</p>


            </div>



             <section className="relative">
                <div className="container relative">
                    <div className="grid grid-cols-1 justify-center">
                    <div className="relative mt-3">
                        <div className="p-16 bg-white  dark:bg-slate-900 rounded-xl shadow-2xl shadow-stone-500 dark:shadow-gray-800">
                        <div className="section-title">
                            <h4 className="text-4xl font-semibold mb-3 text-center text-slate-800">Search flights</h4>
                        </div>
                        <form className="mt-4">
                            <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4">

                            <div>
                                <label className="font-semibold">From</label>
                                <div className=''>
                                    <select
                                        id="location"
                                        name="location"
                                        className="mt-2 bg-transparent block w-full rounded-md border-0 py-5 pl-3 pr-2 text-slate-800 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-slate-300 sm:text-sm sm:leading-6"
                                        defaultValue="Canada"
                                    >
                                        <option disabled>==From==</option>
                                        <option>New Delhi</option>
                                        <option>Goa</option>
                                        <option>Chennai</option>
                                        <option>Bengaluru</option>
                                        <option>Pune</option>
                                        <option>Mumbai</option>
                                        <option>Ahmedabad</option>
                                        <option>Kochi</option>
                                        <option>Kolkatta</option>
                                        <option>Srinagar</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="font-semibold">To</label>
                                <div>
                                    <select
                                        id="location"
                                        name="location"
                                        className="mt-2 bg-transparent block w-full rounded-md border-0 py-5 pl-3 pr-2 text-slate-800 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-slate-300 sm:text-sm sm:leading-6"
                                        defaultValue="Canada"
                                    >
                                        <option disabled>==To==</option>
                                        <option>Bengaluru</option>
                                        <option>Pune</option>
                                        <option>Mumbai</option>
                                        <option>Ahmedabad</option>
                                        <option>Kochi</option>
                                        <option>Kolkatta</option>
                                        <option>Srinagar</option>
                                        <option>Hyderabad</option>
                                        <option>New Delhi</option>
                                        <option>Goa</option>
                                        <option>Chennai</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="font-semibold">Departure</label>
                                <input name="date" type="date" className="form-input mt-2 w-full py-4 px-3 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-md outline-none border border-gray-200 focus:border-yellow-500 dark:border-gray-800 dark:focus:border-yellow-500 focus:ring-0 start" placeholder="Select date :" />
                            </div>
                            <div>
                                <label className="font-semibold">Return</label>
                                <input name="date" type="date" className="form-input mt-2 w-full py-4 px-3 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-md outline-none border border-gray-200 focus:border-yellow-500 dark:border-gray-800 dark:focus:border-yellow-500 focus:ring-0 start" placeholder="Select date :" />
                            </div>
                            <div>
                                <label className="font-semibold">Adults:</label>
                                <input type="number" min="0" id="adult" className="form-input mt-2 w-full py-4 px-4 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-md outline-none border border-gray-200 focus:border-yellow-500 dark:border-gray-800 dark:focus:border-yellow-500 focus:ring-0" placeholder="Adults :" />
                            </div>
                            <div>
                                <label className="font-semibold">Children:</label>
                                <input type="number" min="0" id="childrens" className="form-input mt-2 w-full py-4 px-3 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-md outline-none border border-gray-200 focus:border-yellow-500 dark:border-gray-800 dark:focus:border-yellow-500 focus:ring-0" placeholder="Childrens :" />
                            </div>

                            </div>
                            <div className="lg:mt-7">
                                <input type="submit" id="submit" name="send" className="py-4 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-gradient-to-r from-red-700 via-red-500 to-red-400 text-white rounded-md w-full" value="Search Flights ✈" />
                            </div>

                        </form>
                        </div>
                    </div>
                    </div>
                </div>
                 <div className='absolute right-0 bottom-[calc(100%-3rem)] z-transform-gpu border-l-purple-200 overflow-hidden sm:bottom-[calc(100%-20rem)]'>

                            <Image src={'/paper-plane.svg'} className='origin-center rotate-90 p-4 rounded-xl opacity-50' width={100} height={100} alt='Next.js Website for Flight Booking'/>
                            </div>
            </section>

          </div>
        </div>

      </div>
    </div>
  )
}
