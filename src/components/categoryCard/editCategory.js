import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
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
import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import clsx from 'clsx';
import Fab from '@material-ui/core/Fab';
import CheckboxTree from 'react-checkbox-tree';
import { IoIosCheckboxOutline, IoIosCheckbox, IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { getAllCategory, addCategory, updateCategories } from '../../actions';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        background: '#4b5563'
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    button: {
        margin: theme.spacing(1),
        backgroundColor: "#4b5563",
    },

}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditCategory() {
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
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    // const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {

        if (!category.loading) {
            setShow(false);
        }

    }, [category.loading]);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    }


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

            });
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }

        return options;
    }

    const updateCategoriesss = () => {
        updateCategory();
    }


    const updateCategory = () => {
        
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

    const handleCategoryInput = (key,value,index,type) => {
        if (type=='checked'){
           const updatedCheckedArray =  checkedArray.map((item,_index) => index == _index ? { ...item, [key]: value} : item)
           setCheckedArray(updatedCheckedArray)
        }else if(type == "expanded"){
            const updatedExpandedArray =  expandedArray.map((item,_index) => index == _index ? { ...item, [key]: value} : item)
           setExpandedArray(updatedExpandedArray)
        }
    }

    const updateCategoriesForm = () => {
        const form = new FormData();

        expandedArray.forEach((item,index) => {
            form.append('_id',item.value);
            form.append('name',item.name);
            form.append('parentId',item.parentId ? item.parentId: "");
        })
        checkedArray.forEach((item,index) => {
            form.append('_id',item.value);
            form.append('name',item.name);
            form.append('parentId',item.parentId ? item.parentId: "");
        })
        dispatch(updateCategories(form))
        
        setUpdateCategoryModal(false);
        setOpen(false);
    }

    return (
        <div style={{ display: "flex" }}>
            <Button
                variant="contained"
                color="primary"
                className={clsx(classes.primary, classes.button)}
                startIcon={<EditIcon />}
                onClick={handleClickOpen}
            >
                Edit
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Edit category
                        </Typography>
                        <Button autoFocus color="inherit" onClick={updateCategoriesForm}>
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
                    
                    {
                        expandedArray.length > 0 &&
                        expandedArray.map((item, index) =>
                            <>
                                <h3 style={{ marginLeft: '3%' }}>Expanded</h3>
                                <TextField key={index}
                                    required
                                    id="outlined-required"
                                    label="Required"
                                    placeholder={'Category Name'}
                                    variant="outlined"
                                    style={{ marginLeft: '3%', width: "30%" }}
                                    value={item.name}
                                    onChange={(e) => handleCategoryInput('name',e.target.value,index,'expanded')}
                                />
                                <TextField
                                    id="Category"
                                    select
                                    label="Select"
                                    value={item.parentId}
                                    style={{ marginLeft: "3%", width: "30%" }}
                                    helperText="Please select catgeory"
                                    variant="outlined"
                                    onChange={(e) => handleCategoryInput('parentId',e.target.value,index,'expanded')}
                                >
                                    {createCategoryList(category.categories).map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>

                            </>
                        )
                    }
                    {
                        checkedArray.length > 0 &&
                        checkedArray.map((item, index) =>
                            <>
                                <h3 style={{ marginLeft: '3%' }}>Expanded</h3>
                                <TextField key={index}
                                    required
                                    id="outlined-required"
                                    label="Required"
                                    placeholder={'Category Name'}
                                    variant="outlined"
                                    style={{ marginLeft: '3%', width: "30%" }}
                                    value={item.name}
                                    onChange={(e) => handleCategoryInput('name',e.target.value,index,'checked')}
                                />
                                <TextField
                                    id="Category"
                                    select
                                    label="Select"
                                    value={item.parentId}
                                    style={{ marginLeft: "3%", width: "30%" }}
                                    helperText="Please select catgeory"
                                    variant="outlined"
                                    onChange={(e) => handleCategoryInput('parentId',e.target.value,index,'checked')}
                                >
                                    {createCategoryList(category.categories).map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>

                            </>
                        )
                    }
{/* 

                    <label htmlFor="upload-photo" style={{ marginLeft: "3%", marginTop: "3%", height: "10%" }}>
                        <span style={{ display: 'flex', marginLeft: "3%" }}> {JSON.stringify(categoryImage.name)} </span>
                        <input
                            style={{ display: 'none' }}
                            id="upload-photo"
                            name="categoryImage"
                            type="file"
                            onChange={handleCategoryImage}
                        />

                        <Fab
                            size="larfe"
                            component="span"
                            aria-label="add"
                            variant="extended"
                            style={{ marginLeft: "3%", marginTop: '2%', backgroundColor: "#4b5563", color: '#fff' }}
                        >
                            <AddCircleIcon style={{ padding: '2%', color: '#fff' }} /> Upload photo
                        </Fab>
                    </label> */}
                    <Button autoFocus color="inherit" style={{ width: "10%", marginLeft: "5%",marginTop:"2%", background: "#4b5563", color: "#fff" }} onClick={updateCategoriesss} >
                    Edit
                </Button>
                </List>
                
            </Dialog>
        </div>
    );
}
