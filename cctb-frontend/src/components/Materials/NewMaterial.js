import {
  Button,
  Container,
  MenuItem,
  TextField,

} from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { PROJECTS_ROUTE } from "../../utils/consts";
import { observer } from "mobx-react-lite";


const NewMaterial = observer(() => {
  const history = useHistory("");

  const [type, setType] = useState('')
  const [name, setName] = useState("");

  const [supplier, setSupplier] = useState("");
  const [measure, setMeasure] = useState("");
  const [shopName, setShopName] = useState("");
  const [quantity, setQuantity] = useState('');


  const [brand, setBrand] = useState("");
  const [typeObj, setTypeObj] = useState('');
  const [serialNumber, setSerialNumber] = useState('');

  const brandsMat = [
    {
      value: "brand1",
      label: "Бренд материала 1",
    },
    {
      value: "brand2",
      label: "Бренд материала 2",
    },
    {
      value: "brand3",
      label: "Бренд материала 3",
    },
    {
      value: "brand4",
      label: "Бренд материала 4",
    },
    {
      value: "brand5",
      label: "Бренд материала 5",
    },
  ];
  const brandsEq = [
    {
      value: "brand1",
      label: "Бренд оборудования 1",
    },
    {
      value: "brand2",
      label: "Бренд оборудования 2",
    },
    {
      value: "brand3",
      label: "Бренд оборудования 3",
    },
    {
      value: "brand4",
      label: "Бренд оборудования 4",
    },
    {
      value: "brand5",
      label: "Бренд оборудования 5",
    },
  ];

  const suppliers = [
    { value: "supplier1", label: "Поставщик 1" },
    { value: "supplier2", label: "Поставщик 2" },
  ];
  const measures = [
    {value: 'number', label: 'шт'},
    {value: 'gram', label: 'г'},
    {value: 'kilogram', label: 'кг'},
    {value: 'meter', label: 'м'},
    {value: 'meter2', label: 'м2'},
    {value: 'meter3', label: 'м3'},
  ];
  const types = [
    {value: 'material', label: 'Материал'},
    {value: 'equipment', label: 'Оборудование'}
  ]

  const click = async () => {
    try {
    let data;

    if(data) {
      history.push(PROJECTS_ROUTE);
      console.log(data)
    }
    else{
      console.log(data)
    }
  } catch(e) {
    console.log(e)
  }
  
  };

  return (
    <Container style={{ marginLeft: 10, marginRight: 10 }}>
    <h2>Создание новой заявки на материал/оборудование</h2>

    <TextField
        variant="outlined"
        margin="normal"
        required
        select
        fullWidth
        id="outlined-select-currency"
        label="Материал/оборудование"
        name="status"
        autoComplete="status"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        {types.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      {type === 'material' ?
      <div>
      <TextField
        fullWidth={true}
        id="outlined-basic"
        label="Название"
        variant="outlined"
        margin="normal"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        select
        required
        fullWidth
        id="outlined-basic"
        label="Бренд"
        name="brand"
        autoComplete="brand"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      >
      {brandsMat.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
        </TextField>
      
      <TextField
        variant="outlined"
        margin="normal"
        required
        select
        fullWidth
        id="outlined-select-currency"
        label="Поставщик"
        name="supplier"
        autoComplete="supplier"
        value={supplier}
        onChange={(e) => setSupplier(e.target.value)}
      >
        {suppliers.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="outlined-select-currency"
        label="Название магазина"
        name="shopName"
        autoComplete="shopName"
        value={shopName}
        onChange={(e) => setShopName(e.target.value)}
      />
      <div>
      <TextField
        fullWidth={false}
        style={{marginRight: 10}}
        id="outlined-basic"
        label='Количество'
        variant="outlined"
        margin="normal"
        type='number'
        required
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        style={{width: 160}}
        required
        select
        fullWid={false}
        id="outlined-select-currency"
        label="Ед.измерения"
        name="measure"
        autoComplete="measure"
        value={measure}
        onChange={(e) => setMeasure(e.target.value)}
      >
        {measures.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      </div>
      </div>
      :
      <div>
      <TextField
        fullWidth={true}
        style={{marginRight: 10}}
        id="outlined-basic"
        label='Название оборудования'
        variant="outlined"
        margin="normal"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        fullWidth={true}
        style={{marginRight: 10}}
        id="outlined-basic"
        label='Тип'
        variant="outlined"
        margin="normal"
        required
        value={typeObj}
        onChange={(e) => setTypeObj(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        style={{width: 160}}
        required
        select
        fullWid={false}
        id="outlined-select-currency"
        label="Бренд"
        name="measure"
        autoComplete="measure"
        value={measure}
        onChange={(e) => setMeasure(e.target.value)}
      >
        {brandsEq.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth={true}
        style={{marginRight: 10}}
        id="outlined-basic"
        label='Тип'
        variant="outlined"
        margin="normal"
        required
        value={typeObj}
        onChange={(e) => setTypeObj(e.target.value)}
      />
      <TextField
        fullWidth={true}
        style={{marginRight: 10}}
        id="outlined-basic"
        label='Серийный номер'
        variant="outlined"
        margin="normal"
        required
        value={serialNumber}
        onChange={(e) => setSerialNumber(e.target.value)}
      />
      </div>
      }
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="success"
        className="submit"
        onClick={click}
        style={{ marginTop: 15 }}
      >
        Создать заявку
      </Button>
    </Container>
  );
});
export default NewMaterial;

