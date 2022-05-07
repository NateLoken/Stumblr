import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

// users the createContext hook to create a context variable that accessible throughout the application
export const userContext = createContext({})

function Context(props) {

  const [userObject, setUserObject] = useState()

  // This useEffect hook runs on mount and gets makes a request to the /getuser api to get the users data and sets it as the userObject
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
    <userContext.Provider value={userObject}>{props.children}</userContext.Provider>
  )
}

export default Context
