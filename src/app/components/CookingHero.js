import { ChevronRightIcon } from '@heroicons/react/20/solid'

export default function Example() {
    return (
        <div className="bg-white h-screen">
            <div className="relative isolate overflow-hidden bg-gradient-to-b from-green-100/20">
                <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
                    <div className="px-6 lg:px-0 lg:pt-4">
                        <div className="mx-auto max-w-2xl">
                            <div className="max-w-lg">
                                <span className="text-2xl lg:text-3xl font-thin text-green-600 px-3 py-2 border border-green-400">Chef&apos;s Way 👩🏻‍🍳</span>
                                <div className="mt-24 sm:mt-32 lg:mt-16">
                                    <a href="#" className="inline-flex space-x-6">
                                        <span className="rounded-full bg-green-600/10 px-3 py-1 text-sm font-semibold leading-6 text-green-600 ring-1 ring-inset ring-green-600/10">
                                            New recepie
                                        </span>
                                        {/* <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                                            <span>Have a look at latest video here</span>
                                            <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </span> */}
                                    </a>
                                </div>
                                <h1 className="mt-10 text-4xl font-extrabold tracking-tight text-slate-800 sm:text-6xl">
                                    100 different ways to make <span className='bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent'>salads.</span>
                                </h1>
                                <p className="mt-6 text-lg leading-8 text-gray-600">
                                Indulge in vibrant flavors and nutritious ingredients handcrafted into refreshing salads, sourced from local farms and delivered straight to your plate
                                </p>
                                <div className="mt-10 flex items-center gap-x-6">
                                    <a
                                        href="#"
                                        className="rounded-sm bg-gradient-to-r from-green-400  to-green-600 px-6 py-3 text-md font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                    >
                                        Order now
                                    </a>
                                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                                        Subscribe to my channel <span aria-hidden="true">→</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
                        <div
                            className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl shadow-green-600/10 ring-1 ring-green-50 md:-mr-20 lg:-mr-36"
                            aria-hidden="true"
                        />
                        <div className="shadow-2xl shadow-green-200 md:rounded-sm">
                            <div className="bg-green-500 [clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.sm))]">
                                <div
                                    className="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-green-100 opacity-20 ring-1 ring-inset ring-white md:ml-20 lg:ml-36"
                                    aria-hidden="true"
                                />
                                <div className="relative px-6 pt-2 sm:pt-0 md:pl-0 md:pr-0">
                                    <div className="mx-auto max-w-2xl md:mx-0 md:max-w-none">
                                        {/* <div className="w-screen overflow-hidden rounded-tl-xl bg-gray-900"> */}
                                            {/* <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                                                <div className="-mb-px flex text-sm font-medium leading-6 text-gray-400">
                                                    <div className="border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white">
                                                        NotificationSetting.jsx
                                                    </div>
                                                    <div className="border-r border-gray-600/10 px-4 py-2">App.jsx</div>
                                                </div>
                                            </div> */}
                                            {/* <div class="px-6 pb-14 pt-6"> */}
                                                <img className='w-full h-[600px] object-cover bg-no-repeat' src='https://plus.unsplash.com/premium_photo-1666299819315-929b3fae4450?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
                                            {/* </div> */}
                                        {/* </div> */}
                                    </div>
                                    <div
                                        className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 md:rounded-sm"
                                        aria-hidden="true"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
            </div>
        </div>
    )
}
