import {
  Button,
  Container,
  MenuItem,
  TextField,

} from "@mui/material";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { ORDERS_ROUTE } from "../../utils/consts";
import { observer } from "mobx-react-lite";
// import { createNewOrder } from "../../http/orderAPI";
import { createNewOrder } from "../../http/axios/orderAPI";
import { Context } from "../..";


const NewOrder = observer(() => {
  const {order} = useContext(Context)
  const history = useHistory("");

  const [orderName, setOrderName] = useState("");
  const [supplier, setSupplier] = useState("");
  const [project, setProject] = useState("");
  const [measure, setMeasure] = useState("");
  const [photo, setPhoto] = useState("");
  const [shopName, setShopName] = useState("");
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState('');

  const brands = [
    {
      value: "brand1",
      label: "Бренд 1",
    },
    {
      value: "brand2",
      label: "Бренд 2",
    },
    {
      value: "brand3",
      label: "Бренд 3",
    },
    {
      value: "brand4",
      label: "Бренд 4",
    },
    {
      value: "brand5",
      label: "Бренд 5",
    },
  ];
  const suppliers = [
    { value: "supplier1", label: "Поставщик 1" },
    { value: "supplier2", label: "Поставщик 2" },
  ];
  const projects = [
    { value: "project1", label: "Проект 1" },
    { value: "project2", label: "Проект 2" },
  ];
  const measures = [
    {value: 'number', label: 'шт'},
    {value: 'gram', label: 'г'},
    {value: 'kilogram', label: 'кг'},
    {value: 'meter', label: 'м'},
    {value: 'meter2', label: 'м2'},
    {value: 'meter3', label: 'м3'},
  ]

  const click = async () => {
    try {
    let data;

    data = await createNewOrder(
      orderName,
      supplier,
      project,
      measure,
      photo,
      shopName,
      brand,
      quantity
    );

    order.setOrder({
      orderName: orderName,
      supplier: supplier,
      project: project,
      measure: measure,
      photo: photo,
      shopName: shopName,
      brand: brand,
      quantity: quantity,
    })

    if(data) {
      history.push(ORDERS_ROUTE);
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
    <h2>Создание новой заявки</h2>
      <TextField
        fullWidth={true}
        id="outlined-basic"
        label="Название"
        variant="outlined"
        margin="normal"
        required
        value={orderName}
        onChange={(e) => setOrderName(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        select
        fullWidth
        id="outlined-select-currency"
        label="Название проекта"
        name="status"
        autoComplete="status"
        value={project}
        onChange={(e) => setProject(e.target.value)}
      >
        {projects.map((option) => (
          <MenuItem key={option.value} value={option.label}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
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
      {brands.map((option) => (
          <MenuItem key={option.value} value={option.label}>
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
          <MenuItem key={option.value} value={option.label}>
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
        required
        type='number'
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        style={{width: 160}}
        required
        select
        fullWidth={false}
        id="outlined-select-currency"
        label="Ед.измерения"
        name="measure"
        autoComplete="measure"
        value={measure}
        onChange={(e) => setMeasure(e.target.value)}
      >
        {measures.map((option) => (
          <MenuItem key={option.value} value={option.label}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      </div>
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="raised-button-file"
        multiple
        type="file"
        value={photo}
        onChange={(e) => setPhoto(e.target.value)}
      />
      <label htmlFor="raised-button-file">
        <Button variant="outlined" component="span">
          Загрузить фото
        </Button>
      </label>

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
export default NewOrder;
