import React from 'react';

const ListBars = ({ session, deleteSession }) => {
  return (
    <ul>
      {session && session.length > 0 ? (
        session.map((session) => {
          return (
            <li key={session._id} onClick={() => deleteSession(session._id)}>
              {session.action}
            </li>
          );
        })
      ) : (
        <li>No session(s) left</li>
      )}
    </ul>
  );
};

export default ListBars;

