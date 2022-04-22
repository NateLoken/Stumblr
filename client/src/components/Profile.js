import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const style = {
    
  width: '100%',
  maxWidth: 500,
  bgcolor: 'background.paper',
  margin: 0,
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto',
  position: 'fixed',
};

export default function ListDividers() {
  return (
      <div>
          <h1>Profile</h1>
    <List sx={style} component="nav" aria-label="mailbox folders">
      <ListItem button>
        <ListItemText primary="Account Info" />
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemText primary="Add and Invite Friends" />
      </ListItem>    
      <Divider />
      <ListItem button>
        <ListItemText primary="Disclaimers" />
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemText primary="About" />
      </ListItem>
    </List>
    </div>

  );
}
