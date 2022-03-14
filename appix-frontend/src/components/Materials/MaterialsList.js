import { makeStyles, Typography } from '@material-ui/core';
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '../..';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header2: {
    flexGrow: 1,
    marginBottom: 25,
    marginLeft: 10,
  },
  div: {
    marginBottom: 70,
    height: 800,
    width: "100%",
  },
}));


const columns = [
  { field: 'supplier', headerName: 'Поставщик', width: 300 },
  { field: 'name', headerName: 'Название', width: 300 },
  { field: 'brand', headerName: 'Бренд', width: 300 },
  { field: 'quantity', headerName: 'Количество', width: 300 },
  {
    field: 'measure',
    headerName: 'Ед.измерения',
    width: 270,
  },
  {
    field: 'shopName',
    headerName: 'Название магазина',
    width: 300,
  },

];


const MaterialsList = observer(() => {
  const {material} = useContext(Context)
  const classes = useStyles()

  return (
    <Box>
    <div className={classes.div}>
    <Typography variant='h5' className={classes.header2}>Материалы</Typography>
      <DataGrid
        disableColumnMenu={'true'}
        rows={material.material.map(element => element)}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
      />
    </div>
    </Box>
  )
})

export default MaterialsList
