import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, AlertTitle, TextField, Button } from '@mui/material'
import axios from 'axios'
import { Box } from '@mui/system'

export default function Input() {
  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  const userSearch = () => {
    const user = username

    if (user && user.length > 0) {
      axios
        .get(`/api/sessions/${user}`)
        .then((res) => {
          console.log(res)
          if (res.data) {
            window.localStorage.setItem('session_id', res.data)
            setUsername('')
            navigate('/sessions')
          } else {
            ;<Alert severity='error'>
              <AlertTitle>Error</AlertTitle>
              {username} not found
            </Alert>
            setUsername('')
          }
        })
        .catch((err) => console.log(err))
    } else {
      console.log('Input field required')
    }
  }

  const handleChange = (e) => {
    setUsername(e.target.value)
  }

  return (
    <Box
      component='form'
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
    >
      <TextField
        id='outlined-username'
        label='Username'
        value={username}
        onChange={handleChange}
      />
      <br />
      <Button
        onClick={() => {
          userSearch()
        }}
        variant='contained'
      >
        Search user
      </Button>
    </Box>
  )
}

// class Input extends Component {
//   state = {
//     action: '',
//   };
//
//   addBar = () => {
//     // console.log(this.state.action)
//     const task = { action: this.state.action };
//
//     if (task.action && task.action.length > 0) {
//       axios
//         .post('/api/sessions', task)
//         .then((res) => {
//           if (res.data) {
//             this.props.getBars();
//             this.setState({ action: '' });
//           }
//         })
//         .catch((err) => console.log(err));
//     } else {
//       console.log('input field required');
//     }
//   };
//
//   handleChange = (e) => {
//     this.setState({
//       action: e.target.value,
//     });
//   };
//
//   render() {
//     let { action } = this.state;
//     return (
//       <div>
//         <input type="text" onChange={this.handleChange} value={action} />
//         <button onClick={this.addBar}>add bar</button>
//       </div>
//     );
//   }
// }
//
// export default Input;
//
