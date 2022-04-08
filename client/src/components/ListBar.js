// Displays bars in list format for a session
import React from 'react'

const ListBars = ({ session, deleteSession }) => {
  return (
    <ul>
      {session && session.length > 0 ? (
        session.map((session) => {
          return (
            //console.log(session.bars[0].name)
            <li key={session._id} onClick={() => deleteSession(session._id)}>
              {session.bars[0].name}
            </li>
          )
        })
      ) : (
        <li>No bars in session</li>
      )}
    </ul>
  )
}

export default ListBars
