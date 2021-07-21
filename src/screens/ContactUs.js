import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField1: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '50ch',
  },
  textField2: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '32ch',
  },
  textField3: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '20ch',
  },
}));

export default function ContactUs() {
  const classes = useStyles();

  return (
      <div>
    <h2 style={{textAlign : "center",marginTop : "2%"}}>Contact us Here..</h2>
    <div className={classes.root}>
     
      <div style={{marginLeft : "25%",marginRight :"25%",marginTop : "1%",minHeight : '84vh'}}  >
        <TextField
          id="filled-full-width"
          label="Email"
          style={{ margin: 8 }}
          placeholder="abc@gmail.com"
          helperText="Enter a Valid Email-Address!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
        />
        <TextField
          id="filled-full-width1"
          label="Mobile Number"
          style={{ margin: 8 }}
          placeholder="9999999999"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
        />
         <TextField
          id="filled-full-width2"
          label="Address"
          style={{ margin: 8 }}
          placeholder="A 2 / 104,Eldeco Golf View Apartments ,Greater Noida , Uttar Pradesh "
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
        />
        <TextareaAutosize
         style={{ margin: 8 ,width:"100%"}}
         aria-label="minimum height" 
         minRows={3} 
         placeholder="Type your Message...."
         margin="normal"
         InputLabelProps={{
           shrink: true,
         }}
         variant="filled"
         />
         <TextField
          id="filled-full-width3"
          label="Feedback"
          style={{ margin: 8 }}
          placeholder="Give your Feedback"
          fullWidth
          multiline 
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
        />
        <Button variant="contained" color="secondary" style={{marginLeft : '44%',marginTop:"1%"}}>
            Submit
        </Button>
       
      </div>
       </div>
       </div>
  );
}
