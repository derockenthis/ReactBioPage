import React, { useState,useEffect } from 'react'

export default function Click() {
    const [count,setCount] = useState(1);

    useEffect(()=>{
        console.log(count)
    })
    const handleClick = ()=>{
        setCount(count+1)
    }
  return (
    <div>
        {count}
        <button onClick={handleClick}>CLICK ME</button>
    </div>
  )
}
