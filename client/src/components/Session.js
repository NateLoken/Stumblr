import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import ListBar from './ListBar'
import { userContext } from '../Context'
import { useSearchParams } from 'react-router-dom'

function Session() {
  const userObject = useContext(userContext)
  const [session, setSession] = useState([])

  useEffect(() => {
    getBars()
  })

  function getBars() {
    const user = userObject.username
    axios.get(`/api/sessions/bars/${user}`).then((res) => {
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
