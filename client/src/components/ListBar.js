// Displays bars in list format for a session
import React from 'react'

function ListBars({ session, deleteSession }) {
  return session.map((session) => {
    return (
      <ul key={session._id}>
        {session.bars.map((bars) => (
          <li key={bars._id} onClick={() => deleteSession(bars._id)}>{bars.name}</li>
        ))}
      </ul>
    )
  })
}

// const ListBars = ({ session, deleteSession }) => {
//   return (
//     <ul>
//       {session && session.length > 0 ? (
//         session.map((session) => {
//           return (
//             //console.log(session.bars[0].name)
//             <li key={session._id} onClick={() => deleteSession(session._id)}>
//               {session.bars[0].name}
//             </li>
//           )
//         })
//       ) : (
//         <li>No bars in session</li>
//       )}
//     </ul>
//   )
// }

export default ListBars
