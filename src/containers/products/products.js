import React from "react";
import Sidebar from "../home/sidebar";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DisplayProducts from "./index";

const useStyles = makeStyles((theme) => ({
    root: {
      display:"flex"
    },
    products:{
        flexGrow: 1,
        ...theme.mixins.toolbar,
        padding: theme.spacing(0,10),
    },buttons: {
      display: "flex",
      justifyContent:"flex-end"
    },
  }));

const Products = () => {
    
      const classes = useStyles();
    return(
        <div style={{ marginTop: "5%"}} className={classes.root}>
        <Sidebar/>
        <div className={classes.products}>
          <div className={classes.buttons}>
            
          </div>
          <DisplayProducts style={{marginTop:"10%"}}/>
        </div>
        </div>
        
        
    )
  
};

export default Products;