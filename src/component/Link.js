import React from 'react'

export default function Link(link) {
    // console.log(link,"BIOZ")
  return (
    <div className="Link">
        <button><a href={link.link}>{link.linkText}</a></button>
        <button>up</button>
    </div>
  )
}
