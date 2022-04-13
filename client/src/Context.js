import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const myContext = createContext({})

function Context(props) {

  const [userObject, setUserObject] = useState()

  useEffect(() => {
    axios.get("http://localhost:5000/getuser", { withCredentials: true })
      .then((res) => {
        if(res.data) {
          setUserObject(res.data)
      }
    })
      .catch((err) => console.log(err))
    
  }, [])

  return (
    <myContext.Provider value={userObject}>{props.children}</myContext.Provider>
  )
}

export default Context
