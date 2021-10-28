import { Button, TextField } from "@mui/material";
import React, { forwardRef, useContext, useState } from "react";
import { Context } from "../..";
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import {newProject} from '../../http/userAPI'

const NewProject = () => {

  const NumberFormatCustom = forwardRef(function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        prefix="$"
      />
    );
  });
  const [values, setValues] = useState({
    numberformat: '',
  });
  
  NumberFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };


  const {proj} = useContext(Context);

  const [nameProject, setNameProject] = useState('');
  const [customer, setCustomer] = useState('');
  const [address, setAddress] = useState('');
  const [timeline, setTimeline] = useState('');
  const [estimation, setEstimation] = useState('');
  

  const createNewProj = async () => {
    let data;

    data = await newProject(nameProject, customer, address, timeline, estimation);
    proj.setProject(data);
  }
  

  return (
    <div>
      <TextField
        fullWidth={true}
        id="outlined-basic"
        label="Название проекта"
        variant="outlined"
        margin='normal'
        onChange={e => setNameProject(e.target.value)}
      />
      <TextField
        fullWidth={true}
        id="outlined-basic"
        label="Заказчик"
        variant="outlined"
        margin='normal'
        onChange={e => setCustomer(e.target.value)}
      />
      <TextField
        fullWidth={true}
        id="outlined-basic"
        label="Адрес"
        variant="outlined"
        margin='normal'
        onChange={e => setAddress(e.target.value)}
      />
      <TextField
        fullWidth={true}
        id="outlined-basic"
        label="Сроки"
        variant="outlined"
        margin='normal'
        onChange={e => setTimeline(e.target.value)}
      />

{/* Не работает, если вводить цифры подряд, вводятся только по одной и курсор пропадает */}
      <TextField
        label="Расчет"
        value={values.numberformat}
        onChange={handleChange}
        fullWidth={true}
        variant="outlined"
        margin='normal'
        name="numberformat"
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
        
      />
      <Button
      variant="contained"
          onClick={createNewProj}
          color="success"
      >
      Добавить новый проект</Button>
    </div>
  );
};
export default NewProject;
