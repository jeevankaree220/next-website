import Image from 'next/image';

export default function Hero() {
  return (
    <section className="py-16 md:py-24 bg-stone-50 border border-stone-200 rounded-t-[60px] my-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-8">
        <div>

          <p className="text-xl mb-8">
            Your Idea, Our Expertise.
          </p>
          <h1 className="text-8xl font-thin leading-tight mb-4">
            We Build <span className='bg-gradient-to-r from-slate-700 via-slate-600 to-slate-400 bg-clip-text text-transparent font-normal'>MVP&apos;s</span>
          </h1>

        </div>
        <div className="relative h-[35em]">
          <Image
            src="/hero.png"
            alt="Phone with app interface"
            layout="fill"
            objectFit="cover"
            className='w-full lg:rounded-[30px] '
          />
        </div>
      </div>
    </section>
  );
}