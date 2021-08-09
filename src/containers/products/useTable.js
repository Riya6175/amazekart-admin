import React,{useState} from 'react'
import { Table,TableHead,TableRow} from '@material-ui/core'
import { TablePagination } from '@material-ui/core';

export default function useTable(products){

    const pages = [5,10,25]
    const[page,setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page])

    const TblContainer = props=> (
        <Table style={{marginTop:'2%'}}>
            {props.children}
        </Table>

    )

    const handleChangePage = (event,newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value,10))
        setPage(0)
    }

    const TblPagination = () => (<TablePagination 
        component ="div"
        page={page}
        rowsPerPage={rowsPerPage}
        count='10'
        rowsPerPageOptions={pages}
        onChangePage={handleChangePage}
        onChangeRowsPerPage = {handleChangeRowsPerPage}
        />)

    // const recordAfterPaginationAndSorting = () => {
    //     return products.slice(page*rowsPerPage, (page+1)*rowsPerPage)
    // }

    return {
        TblContainer,
        TblPagination
    }

}