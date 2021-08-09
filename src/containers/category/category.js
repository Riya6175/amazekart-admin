import React, { useEffect,useState } from "react";
import Sidebar from "../home/sidebar";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import RecipeReviewCard from "../../components/categoryCard/card"
import AddCategory from "../../components/categoryCard/modalAdd";
import DeleteCategory from "../../components/categoryCard/categoryDelete";
import EditCategory from "../../components/categoryCard/editCategory";



const useStyles = makeStyles((theme) => ({
    root: {
      display:"flex",
    },
    products:{
        flexGrow: 1,
        ...theme.mixins.toolbar,
        padding: theme.spacing(0, 1),
        justifyContent:'center'
    },
    buttons: {
      display: "flex",
      justifyContent:"flex-end"
    },
  }));


const Category = () => {
      const classes = useStyles();
    return(
      <div style = {{marginTop: "5%"}} className={classes.root}>
          <Sidebar/>
          <div container className={classes.products}>
              <div className={classes.buttons}>
                    <DeleteCategory/>
                    <AddCategory/>
                    <EditCategory/>
              </div>
              <Typography
              color="textPrimary"
              gutterBottom
              variant="h2"
              align="center"
              className={classes.products}
              >
                Categories
                
              </Typography>
          
              <RecipeReviewCard/>
                
            </div>
    </div>
    )
};

export default Category;
