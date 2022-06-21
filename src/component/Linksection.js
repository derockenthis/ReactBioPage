import axios from 'axios'
import React, {useEffect, useState} from 'react';
import '../style.css'
import '../addLink.css'
import Link from './Link'

export default function Linksection(props){
    const [links,setlinks] = useState([])
    useEffect(()=>{
        axios.get("http://127.0.0.1:3001/pageLinks").then(resp => {
            console.log(resp.data.rows[0])
            setlinks(resp.data.rows)
            // console.log(this.state.links)
            // setLinks(resp.data)
        }).catch(()=>
        console.log(Error))
    },[props.id])

    if(links){
        console.log(props.id)

        return (
            <div className = "Linksection">
                {links.map((val,key)=>{
                    return <Link key = {key} link = {val.urlLink} linkText = {val.urlText}/>
                })}
            </div>
        )
    }else{
        return null;
    }

}

