// Displays bars in list format for a session
import React from 'react'

function ListBars({ session, deleteBar}) {
  return session.map((session) => {
    return (
      <ul key={session._id}>
        {session.bars.map((bars) => (
          <li key={bars._id} onClick={() => deleteBar(bars._id)}>{bars.name}</li>
        ))}
      </ul>
    )
  })
}

export default ListBars
