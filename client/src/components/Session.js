import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ListBar from './ListBar'

function Session() {
  const [session, setSession] = useState([])
  const [sessionId, setSessionId] = useState(null)

  useEffect(() => {
    setSessionId(window.localStorage.getItem('session_id'))
    getBars(sessionId)
  },[sessionId])

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
