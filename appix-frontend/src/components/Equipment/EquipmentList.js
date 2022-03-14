import { makeStyles, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
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
    marginBottom: 50,
    height: 800,
    width: "100%",
  },
}));

const columns = [
  { field: 'brand', headerName: 'Бренд', width: 300 },
  { field: 'name', headerName: 'Название', width: 300 },
  {
    field: 'typeObj',
    headerName: 'Тип',
    width: 300,
  },
  {
    field: 'serialNumber',
    headerName: 'Серийный номер',
    width: 300,
  },
];



const EquipmentList = observer(() => {
  const {equipment} =useContext(Context)
  const classes = useStyles()
  return (
    <Box>
    <div className={classes.div}>
    <Typography variant='h5' className={classes.header2}>Оборудование</Typography>
      <DataGrid
        disableColumnMenu={'true'}
        rows={equipment.equipment.map(element => element)}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
      />
    </div>
    </Box>
  );

})

export default EquipmentList
