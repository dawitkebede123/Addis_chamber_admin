import React, { useState, useEffect, useRef } from 'react';

const DataSearch=()=>{
    const [value,setValue] = useState('')
    const [result,setResult] = useState([])

  useEffect(()=>{
    if(value.length>0){
        fetch('https://chamber-60982-default-rtdb.firebaseio.com/Query10').then(
            response => response.json()            
        ).then(responseData=>{
            setResult([]);
            let searchQuery = value.toUpperCase();
            for(const key in responseData){
                let business = responseData[key].name.toUpperCase();
                if(business.slice(0,searchQuery.length).indexOf(searchQuery) !== -1){
                    setResult(prevResulle =>{
                        return [...prevResulle,responseData[key].name]
                    })
                }
            }
        }).catch(error=>{
            console.log(error);
        })
    }else{
        setResult([])
    }
  },[value])  

  return (
        <div>
            <p className="titelText">
              Fruit Search
            </p>
            <input type="text"
              className="searchBar"
            onChange={(event)=>setValue(event.target.value)}
            value={value}
              />
              <div className="searchBack">
                {
                    result.map((result,index) => (
                        // <a key={index}>
                            <div className="searchEntry">
                                {result}
                            </div>
                        // </a>
                    ))
                }
              </div>
        </div>   
  )
}
export default DataSearch;