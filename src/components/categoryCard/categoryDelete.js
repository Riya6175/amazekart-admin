import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import DeleteIcon from '@material-ui/icons/Delete';
import clsx from 'clsx';
import CheckboxTree from 'react-checkbox-tree';
import { IoIosCheckboxOutline, IoIosCheckbox, IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { getAllCategory, addCategory, deleteCategories} from '../../actions';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    backgroundColor: '#4b5563'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: "#4b5563",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },

  primary: {

    '&:hover': { // changes colors for button hover state

      backgroundColor: "#fff",

      color: "#000",

    },

  },

  secondary: {

    fontWeight: 700, // make the text bold

  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteCategory() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = useState(false);

  const category = useSelector(state => state.category);
  const [categoryName, setCategoryName] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');
  const [categoryImage, setCategoryImage] = useState('');

  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {

    if (!category.loading) {
        setShow(false);
    }

}, [category.loading]);




  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        {
          label: category.name,
          value: category._id,
          children: category.children.length > 0 && renderCategories(category.children)
        }
      );
    }
    return myCategories;
  }

  const createCategoryList = (categories, options = []) => {

    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        type: category.type
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options)
      }
    }

    return options;
  }

  const updateCheckedAndExpandedCategories = () => {
    const categories = createCategoryList(category.categories)
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 && checked.forEach((categoryId, index) => {
      const category = categories.find((category, _index) => categoryId == category.value)
      category && checkedArray.push(category)
    })
    expanded.length > 0 && expanded.forEach((categoryId, index) => {
      const category = categories.find((category, _index) => categoryId == category.value)
      category && expandedArray.push(category)
    })
    setCheckedArray(checkedArray)
    setExpandedArray(expandedArray)
    console.log({ checked, expanded, categories, checkedArray, expandedArray })
  }
  const deleteCategory = () => {
    updateCheckedAndExpandedCategories();
    setDeleteCategoryModal(true);
  }
  const deleteCategoriesHere = () => {
    updateCheckedAndExpandedCategories();
    const checkedIdsArray = checkedArray.map((item, index) => ({ _id: item.value }))
    const expandedIdsArray = expandedArray.map((item, index) => ({ _id: item.value }))
    const idsArray = expandedIdsArray.concat(checkedIdsArray);
    if(checkedIdsArray.length > 0){
      dispatch(deleteCategories(checkedIdsArray))
      .then(result => {
        if (result) {
          dispatch(getAllCategory());
          setDeleteCategoryModal(false);
        }
      })
    }
    
  }

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        className={clsx(classes.primary, classes.button)}
        startIcon={<DeleteIcon />}
        onClick={handleClickOpen}
      >
        Delete
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Delete category
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List style={{ margin: "2%" }}>
          <h1>Categories</h1>
          <CheckboxTree
            nodes={renderCategories(category.categories)}
            checked={checked}
            expanded={expanded}
            onCheck={checked => setChecked(checked)}
            onExpand={expanded => setExpanded(expanded)}
            icons={{
              check: <IoIosCheckbox />,
              uncheck: <IoIosCheckboxOutline />,
              halfCheck: <IoIosCheckboxOutline />,
              expandClose: <IoIosArrowForward />,
              expandOpen: <IoIosArrowDown />
            }}
          />
          <Button autoFocus color="inherit" style={{ width: "10%", marginLeft: "3%", marginTop: "2%", background: "#4b5563", color: "#fff" }} onClick={deleteCategoriesHere} >
            Delete
          </Button>
        </List>
      </Dialog>
    </div>
  );
}
