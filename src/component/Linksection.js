import axios from 'axios'
import React, {useEffect, useState, useRef} from 'react';
import '../style.css'
import '../linksection.css'
import Link from './Link'

export default function Linksection(props){
    const [links,setlinks] = useState([])
    const [dragging,setDragging] = useState(false)
    const dragItem = useRef();
    const dragNode = useRef();
    const updatedList = useRef();
    useEffect(()=>{
        axios.get("http://127.0.0.1:3001/pageLinks").then(resp => {
            let list = resp.data.rows
            // list.sort((a,b)=>(a.urlNum>b.urlNum)?1:-1)
            setlinks(list)
            
            console.log("RUNNING EFFFECT")
            // console.log(this.state.links)
            // setLinks(resp.data)
        }).catch(()=>
        console.log(Error))
    },[props.id])

    const handleDragStart = (obj,num) =>{
        // console.log('drag starting..',num)
        dragItem.current = num;
        // console.log("E",e.target)
        dragNode.current = obj.target;
        dragNode.current.addEventListener('dragend',handleDragEnd)
        setTimeout(()=>{
            setDragging(true)
        },0)

    }
    const handleDragEnter = (e,num) =>{
        const currentItem = dragItem.current
        console.log("Drag entering",num,currentItem)
        if(e.target!== dragNode.current || currentItem != num){
            // console.log("TARGET IS NOT THE SAME")
            setlinks(oldList =>{
                let newList = JSON.parse(JSON.stringify(oldList));
                console.log(currentItem)
                newList.splice(num,0,newList.splice(currentItem,1)[0])
                dragItem.current = num;
                for(let i =0; i<newList.length;i++){
                    newList[i].urlNum = i
                }
                // console.log(newList)
                updatedList.current = newList;
                return newList
            })

        }
    }
    const handleDragEnd = () =>{
        if(true){
            console.log(updatedList)
            axios.post("http://127.0.0.1:3001/resortedLinks",{links:updatedList.current}).then(() => {
                console.log("resorted")
            }).catch(err=>
            console.log(err))
        }
        console.log("Ending Drag...")
        setDragging(false)
        dragNode.current.removeEventListener('dragend',handleDragEnd)
        dragItem.current = null;
        dragNode.current = null;

    }
    const getStyles = (num) =>{
        const currentLink = dragItem.current;
        if(currentLink === num){
            return "current Link"
        }
        return "Link"
    }

    if(links){
        // console.log(links,"yes")
        document.ondragover = (e) =>{
            e.preventDefault()
        }
        return (
            <div className = "Linksection">
                {links.map((val,key)=>
                    <a href = {val.urlLink} className = "aLink">
                        <div 
                        onDrag={(event)=> event.preventDefault()}
                        draggable onDragStart={(e) => handleDragStart(e,val.urlNum)} 
                        key = {key} link = {val.urlLink} linkText = {val.urlText}
                        className={dragging?getStyles(val.urlNum):"Link"}
                        onDragEnter = {dragging?(e)=>handleDragEnter(e,val.urlNum):null}>
                            {val.urlText}
                        </div>
                    </a>
                    // return <Link key = {key} link = {val.urlLink} linkText = {val.urlText}/>
                )}
            </div>
        )
    }else{
        return null;
    }

}

