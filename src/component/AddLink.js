import axios from 'axios'
import React, {useEffect, useState} from 'react';
import '../style.css'
import '../addLink.css'
export default function AddLink() {
  // const [urlLink, seturlLink] = useState([]);
  // const [linkTitle, setlinkTitle] = useState([]);
  var linkurl;
  var linkTitle;
  const addLink = () =>{
    linkTitle = document.getElementsByClassName("linkTitle").value
    axios.post("http://127.0.0.1:3001/").then(() => {
      console.log(linkTitle,"hello");
    })
  }
  return (
    <div className = "linkAdd">
      <div className = "addLinkbox" data-toggle="modal" data-target="#exampleModalCenter">
      +
      </div>


      <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Link</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class = "linkInfo">
                <input placeholder = "Link Box Title" className = "linkTitle"></input>
                <input placeholder = "Link Url" className = "linkUrl"></input>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" onClick={addLink}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  )
}
