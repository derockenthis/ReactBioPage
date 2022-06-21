import axios from 'axios'
import React, {useEffect, useState} from 'react';
import '../style.css'
import '../addLink.css'
import Linksection from './Linksection';
export default function AddLink(props) {
  const [urlLink, seturlLink] = useState([]);
  // const [linkTitle, setlinkTitle] = useState([]);
  var linkUrl;
  var linkTitle;

  function getName(props){
    linkTitle = document.getElementById("l1").value
    linkUrl = document.getElementById("lurl").value
    seturlLink({linkTitle:linkTitle,
                linkUrl:linkUrl})
    console.log(linkTitle,linkUrl)
  }
  const addLink = () =>{
    getName()
    axios.post("http://127.0.0.1:3001/manage",{linkName:linkTitle, urlLink:linkUrl}).then(() => {
      return props.addnewLinks(urlLink)
    }).catch(err=>
    console.log(err))
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
                <input placeholder = "Link Box Title" className = "linkTitle" id = "l1"></input>
                <input placeholder = "Link Url" className = "linkUrl" id = 'lurl'></input>
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
