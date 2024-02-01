import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { getUserAuth } from '../utils/Context';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../utils/FirebaseConfig';
import { useNavigate } from 'react-router-dom';


export default function ResponsiveDialog() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate()
    
  const handleClickOpen = () => {
    setOpen(true);
  };

  const {User, logOut } = getUserAuth();
  const logout = async() => {
    try {
      const updateRef = doc(db, "users", User.uid)
      await updateDoc(updateRef, {
        isOnline:false
      })
      await logOut()
      console.log('done')
        navigate('/');
    } catch (err) {
        console.error(err)
    }
  }
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Logout?
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Are you sure?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You will be immediately exited from the ChatRoom
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Stay
          </Button>
          <Button onClick={logout} autoFocus>
            Leave
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}