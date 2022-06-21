import logo from './logo.svg';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import './App.css';
import './style.css';
import AddLink from './component/AddLink';
import Linksection from './component/Linksection'

function App() {

    const[links, setLinks] = useState([])

    return (
        <div className="App">
            <div className = "linkBox">
                <Linksection id = {links}/>

                <AddLink addnewLinks = {setLinks}/>
            </div>
        </div>
    );
}

export default App;
