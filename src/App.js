import logo from './logo.svg';
import React, {useEffect, useState} from 'react';
import './App.css';
import './style.css';
import AddLink from './component/AddLink';

function App() {
    const[links, setLinks] = useState([])
    return (
        <div className="App">
            <div className = "linkBox">
                <AddLink/>
            </div>
        </div>
    );
}

export default App;
