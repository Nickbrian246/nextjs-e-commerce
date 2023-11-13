import React from 'react'
import { topNavBarLinks } from './utils/linksGroup'
import Link from 'next/link'
export default function MenuTop() {
  return (
    <>
      <nav className='w-full flex items-center justify-center p-1 bg-black'>
        <ul className='
        flex
        gap-1
        justify-center
        w-[280px]
        flex-wrap
        text-white
        text-sm
        font-light
        ' >
          {topNavBarLinks.map((link) => (
            <li className="
            p-1
            pr-3
            relative 
            text-center

            after:content-['']
            after:absolute
            after:top-0
            after:right-0
            after:translate-x-[-50%]
            after:w-[1px]
            after:h-full 
            after:bg-white  
            " 
            key={link.titleEs}
            >
              <Link href={link.route}>
                {link.titleEs}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

    </>

  )
}
