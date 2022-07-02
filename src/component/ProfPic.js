import React, {useState,useEffect, useRef} from 'react'
import axios from 'axios'
import '../profpic.css'
async function postImage({image}){
    const formData = new FormData();
    formData.append("image",image)
    console.log("IN POST")
    const result = await axios.post('http://127.0.0.1:3001/profImage',formData,{headers:{'Content-Type':'multipart/form-data'}})
    console.log("END POST")
    return result.data;
}
export default function ProfPic() {
    const [file,setFile] = useState()
    const imageRef = useRef()
    const [profileImage, setProf] = useState()

    const grabImage=()=>{
        axios.get('http://127.0.0.1:3001/getprofImage').then(resp=>{
            setProf(resp.data.rows[0].profileImage)
        }).catch(err=>
            console.log(err,"error profPic")
        )
        console.log("CHANGED")
    }
    
    useEffect(()=>{
        console.log("GRABBED")
        grabImage();
    },[1])
    const submit = async event =>{
        event.preventDefault()
        console.log("SET")
        const result = await postImage({image:file})
        console.log("set image")
        imageRef.current = file
        console.log(imageRef.current,"HEHEH")
        grabImage()
    }
    const fileSelected = event =>{
        const file = event.target.files[0]
        setFile(file)
    }
    var prof = 0;
    if(prof === 0){
        return(
            <div class="ProfPic">
                <div class = "editProf">
                    <button type="button" class="profileBtn" data-toggle="modal" data-target="#exampleModal">
                        <img class = "profileImage" src = {profileImage}></img>
                    </button>
                   
                </div>
                <form onSubmit={submit}>
                    <input onChange = {fileSelected} type ="file" accept="image/*"></input>
                    <button type = "submit">Submit</button>
                </form>

                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        ...
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}
