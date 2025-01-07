import React from 'react'

const Hero = () => {
  return (
    <main>
      <div className='absolute -left-20 -top-20 w-64 h-64 bg-[#407BFF] bg-opacity-5 rounded-full'></div>
      <nav
        className='relative flex justify-center items-center p-10 nunito-sans-nav'
      >
        <div className='relative flex items-center gap-12 text-sm'>
          <p>TEAM</p>
          <p>DOCS</p>
          <button
            className='text-[#407BFF] border border-[#407BFF] rounded-md py-4 px-6'
          >
            Get Started For Free
          </button>
          <div className='absolute left-52 -top-32 w-40 h-40 bg-[#407BFF] bg-opacity-5 rounded-full'></div>
        </div>
        <div className='absolute right-0 top-40 w-64 h-64 bg-[#407BFF] bg-opacity-5 rounded-full'></div>
      </nav>

      {/* hero content */}
      <section className='md:flex justify-center items-center'>
        <article className='relative md:flex flex-col gap-8 p-10 md:px-14 md:w-1/2'>
          <div className='absolute left-20 -top-10 w-96 h-96 bg-[#407BFF] bg-opacity-5 rounded-full'></div>
          <h1 className='text-3xl md:text-5xl leading-loose font-bold'>
            Your One-stop Inventory Management System
          </h1>
          <p className='text-xl leading-relaxed'>
            Streamline Your Business Operations with Our Cutting-Edge Inventory Management System
          </p>

          <button className='md:w-[35%] bg-[#407BFF] p-4 rounded-md text-white'>
            Get Started For Free
          </button>
        </article>


        <article className="relative flex justify-center md:w-1/2">
          <img
            className="animate-img w-[80%]"
            src={require("../assets/home.png")}
            alt=""
          />
        </article>
      </section>

    </main>
  )
}

export default Hero
