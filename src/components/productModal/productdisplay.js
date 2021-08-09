import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useDispatch, useSelector } from "react-redux";
import IconButton from '@material-ui/core/IconButton';
import NotesIcon from '@material-ui/icons/Notes';
import {generatePublicUrl} from '../../urlConfig';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 3),
  },
  images:{
      display:'flex',
      flexDirection:'row',
    maxHeight: '200px',
    objectFit: 'contain',
    marginTop:'3%',
    paddingLeft:'4%'
  }
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  const product = useSelector(state => state.product)
  const dispatch = useDispatch();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="title">Product Description</h2>
     {props.description}
     <div style={{display:'block'}}>
         <div style={{display:'flex'}}>
             {(props.image).productPictures.map(picture => <div className={classes.images}>
                 <img src={generatePublicUrl(picture.img)} className={classes.images}/>
             </div> )}
         </div>
     </div>
    </div>
  );

  return (
    <div>
      
            <IconButton aria-label="expand row" size="small" onClick={handleOpen}>
            {/* NotesIcon{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} */}
            <NotesIcon/>
            </IconButton>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="title"
        aria-describedby="description"
        
      >
        {body}
      </Modal>
    </div>
  );
}
