import React ,{useState , useEffect} from 'react'

import {DataGrid} from '@material-ui/data-grid'

const columns = [
    {field : 'id', headerName : 'ID'},
    {field : 'languageNameEnglish' , headerName : 'Language Name' , width : 300},
    {field : 'languageNameNative' , headerName : 'Native Language',  width : 300},
    {field : 'status' , headerName : 'Status', width : 200},
    {field : 'createdAt' , headerName : 'CreatedAt', width : 300},

]
const MoreInfo = () => {
    const [tableData , setTableData] = useState([])

    useEffect(() => {
        fetch("https://www.mist-one.com/pub/languages")
        .then(res => res.json())
            .then(json => {
                console.log("json", json.data.rows)
                setTableData(json.data.rows)
            });
    })

    return (
        <div className = "container" style={{height :'80vh', width:'100%', marginBottom :"10%"}}>
            <h2 style={{textAlign :"center", marginTop:'1.5%',marginBottom :'1.5%'}}>Data Table</h2>
            <DataGrid
             rows ={tableData}
             columns = {columns}
             pageSize={100}
             checkboxSelection
            />
        </div>
    )
}

export default MoreInfo