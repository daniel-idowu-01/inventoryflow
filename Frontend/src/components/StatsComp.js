import React from 'react'

const StatsComp = ({ title, info, percent, icon, textColor, bgColor }) => {
  return (
    <article
      className='p-3 shadow-md border md:w-52 md:h-32 rounded-xl bg-white'
    >
      <section
        className='flex justify-between text-right '
      >
        <div className={`${bgColor} ${textColor} p-3 rounded-xl w-fit h-fit text-white`}>
          {icon}
        </div>

        <div>
          <p>{title}</p>
          <p className='text-xl font-bold'>{info}</p>
        </div>
      </section>

      <hr className='w-[70%] mx-auto mt-3' />

      <p className='text-xs mt-3 opacity-55'>
        <span className='text-green-500 mr-1'>
          +{percent}
        </span>
        than last week
      </p>

    </article>
  )
}

export default StatsComp
