"use client"
import Image from 'next/image'
import Link from 'next/link'
import unsplash from '/public/lisheng-chang-M2524ncJQ40-unsplash.jpg'

function Hero () {
    return (
        <section
        className="overflow-hidden sm:grid sm:grid-cols-2 sm:items-center flex-1"
        >
        <div className="p-8 md:p-12 lg:px-16 lg:py-24">
            <div
            className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right"
            >
            <h2 className="text-2xl font-bold md:text-3xl">
                Buy and sell online.
            </h2>

            <p className="hidden text-gray-100 md:mt-4 md:block">
               You were searching for a place to buy and sell products online, you are in the right place. 
            </p>

            <div className="mt-4 md:mt-8">
                <Link
                href="/explore"
                className="btn px-12 py-3 text-sm font-medium"
                >
                Explore now
                </Link>
            </div>
            </div>
        </div>

        <Image
            alt="Sleep while make money"
            src={unsplash}
            className="h-full w-full object-cover sm:h-[calc(100%_-_2rem)] sm:self-end sm:rounded-ss-[30px] md:h-[calc(100%_-_4rem)] md:rounded-ss-[60px]"
        />
        </section>
    )
}

export default Hero