import axios from 'axios'
import React, {useEffect, useState} from 'react';
import '../style.css'
import '../addLink.css'

class Linksection extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            links:10
        }

    }
    // shouldComponentUpdate(){
    //     axios.get("http://127.0.0.1:3001/pageLinks").then(resp => {
    //         console.log(resp.data)
    //         let data = resp.data.rows[0].urlLink
    //         console.log(resp.data.rows[0].urlLink)
    //         this.state.links = data;
    //         // setLinks(resp.data)
    //     }).catch(err=>{
    //         console.log(err)
    //     })
    // }
    componentDidMount(){
        axios.get("http://127.0.0.1:3001/pageLinks").then(resp => {
            // console.log(resp.data.rows[0])
            this.setState({links:resp.data.rows})
            console.log(this.state.links)
            // setLinks(resp.data)
        }).catch(()=>
        console.log(Error))
    }
    render(){
        if(this.state.links!=10){
            this.state.links.map((val,key)=>{
                console.log(val,"value")
            })
            return (
                <div className = "Linksection">
                    {this.state.links.map((val,key)=>{
                        return(
                            <div className="link" id = {key}>
                                <button><a href={val.urlLink}>{val.urlText}</a></button>
                            </div>
                        )
                    })}
                </div>
            )
        }
        else{
            return (
                <div className = "Linksection">
                    loading...
                </div>
            )
        }
    }
}
export default Linksection;
