import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ListBar from './ListBar'

// The session provides most of the functions to be used by the list and acts as the container for the list
function Session() {
  const [session, setSession] = useState([])
  const [sessionId, setSessionId] = useState(null)

  // This useEffect sets the session id variable and calls the getBars function on update of the sessionID
  useEffect(() => {
    setSessionId(window.localStorage.getItem('session_id'))
    getBars(sessionId)
  },[sessionId])

  /*
    getBars take 1 parameter:
      sessionId: String
    getBars uses the sessionId as the search parameter for the api request and upon a successful request
    a list of bars in the session is returned and the set to the session object to be displayed
  */
  function getBars(sessionId) {
    axios.get(`/api/sessions/bars/${sessionId}`).then((res) => {
      if (res.data) {
        setSession(res.data)
      }
    })
  }

  // function deleteSession(id) {
  //   axios
  //     .post(`/api/sessions/${id}`)
  //     .then((res) => {
  //       if(res.data) {
  //         getBars()
  //       }
  //     })
  //     .catch((err) => console.log(err))
  // }

  /*
    deleteBar takes 1 parameter:
      barId: String
    deleteBar takes the barId string and uses it as the search parameter in the api request and upon successful
    request the new list of bars is retrieved using the getBars function
  */
  function deleteBar(barId) {
    axios
      .post(`/api/sessions/bars/${barId}`)
      .then((res) => {
        if (res.data) {
          getBars(sessionId)
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <div>
      <h1>Session</h1>
      <ListBar session={session} deleteBar={deleteBar} />
    </div>
  )
}

export default Session
