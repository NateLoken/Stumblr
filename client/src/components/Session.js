import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ListBar from './ListBar'

function Session() {
  const [session, setSession] = useState([])

  useEffect(() => {
    getBars()
  })

  function getBars() {
    axios.get('api/sessions').then((res) => {
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

  function deleteBar(id) {
    axios
      .post(`/api/sessions/bars/${id}`)
      .then((res) => {
        if (res.data) {
          getBars()
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
