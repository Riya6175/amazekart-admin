import React,{useState} from 'react'
import useTable from './useTable'
import TableBody from '@material-ui/core/TableBody';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SimpleModal from '../../components/productModal/productdisplay'




const useStyles = makeStyles({
  Heading: {
    fontSize:'1.5rem',
    color:'#fff',
    fontFamily:'Roboto',
    fontWeight: '600'
  },
  content:{
    flexGrow:1,
    fontSize:'1.25rem',
    color:'#232f3e',
    fontFamily:'Roboto',
    fontWeight: '300',
  },
  rowshover:{
    '&:hover':{
      background:'#fff'
    }
  }
  
});



export default function ProductDetails(){
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  
    const[name,setName] = useState('');
    const [quantity,setQuantity] = useState('');
    const [price,setPrice] = useState('');
    const [description, setDescription]= useState('');
    const [categoryId, setCategoryId]= useState('');
    const [productPictures, setProductPictures]= useState([]);
    const category = useSelector(state => state.category)
    const product = useSelector(state => state.product)
    const dispatch = useDispatch();
    const { TblContainer, TblPagination} = useTable(product);
    const [orderBy, setOrderBy] = React.useState(price);
    const [open, setOpen] = React.useState(false);

  return (
    <>
      <TblContainer style={{marginTop:'10%'}}>
        <TableHead style={{background:"#4b5563",fontSize:'2rem'}} >
          <TableRow >
            <TableCell></TableCell>
            <TableCell className={classes.Heading}>Product Name</TableCell>

            <TableCell className={classes.Heading}>
            Price
            </TableCell>
            
            <TableCell className={classes.Heading}>Quantity</TableCell>
            <TableCell className={classes.Heading}>Category</TableCell>
            <TableCell className={classes.Heading}>Created By</TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{background:"#E5E4E2"}}>
          {
            product.products.length > 0 ? 
            product.products.map(product => 
            <>
            <TableRow className={classes.rowshover}> 
              <TableCell>
              <SimpleModal description={product.description} image={product}/>
              </TableCell>
              <TableCell className={classes.content}>{product.name}</TableCell>
              <TableCell className={classes.content}>{product.price}</TableCell>
              <TableCell className={classes.content}>{product.quantity}</TableCell>
              <TableCell className={classes.content}>{product.category.name}</TableCell>
              <TableCell className={classes.content}>{product.createdBy}</TableCell>
            </TableRow>
            
            
            </>
            ) : null
          }
        </TableBody>
      </TblContainer>
      
    </>
  )




}
