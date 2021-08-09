import React, { useEffect } from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../actions";
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import categoryImages from '../../containers/category/images';
import SubCategory from "./subcategory";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 100,
  },
  media: {
    height: "300px",
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  card: {
    
    boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
    backgroundColor: "#fafafa",
    borderRadius:'12px'
  },
  title:{
    marginLeft:'10%'
  }
}));



export default function RecipeReviewCard(props) {

  const category = useSelector(state => state.category)
  const [expandedId, setExpandedId] = React.useState(-1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory())
  }, [])

  console.log(category)

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = i => {
    setExpandedId(expandedId === i ? -1 : i);
  };

  return (
    <div style={{marginBottom:'3%'}}>
      <Container>
        <Grid container spacing={1}>
          {category.categories.map((child,i) => (
            <Grid item xs={12} sm={3} key={category.id}>
              <Card className={classes.card}>
                    {/* <CardMedia
                      style={{height: 0, paddingTop: '56.25%'}}
                      className={classes.media}
                      image={require ("./images/logo_blue.png")}
                      backgroundColor="#000"
                    /> */}
                    <img src={child.categoryImage} style={{height: '230px', paddingTop: '0%'}}/>
                  <CardActions disableSpacing style={{paddingTop:'0%',paddingBottom:'0%'}}>
                    <Typography className={classes.title}>
                      <h2 style={{paddingTop:'0%',margin:'0px',marginBottom:'4px',fontFamily:'Montserrat'}}>{child.name}</h2>
                    </Typography>
                    <IconButton
                      className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                      })}
                      onClick={() => handleExpandClick(i)}
                      aria-expanded={expandedId === i}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>


                  <Collapse in={expandedId === i} timeout="auto" unmountOnExit style={{paddingTop:'0%'}}>
                            <SubCategory category={child} style={{paddingTop:'0%'}}/>
                  </Collapse>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  )
}

