import { Button, Container, MenuItem, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { ORDERS_ROUTE } from "../../utils/consts";
import { observer } from "mobx-react-lite";
// import { createNewOrder } from "../../http/orderAPI";
import { createNewOrder } from "../../http/axios/orderAPI";
import { Context } from "../..";
import useInput from "../Validations/Hooks/useInput";

const NewOrder = observer(() => {
  const { order } = useContext(Context);
  const history = useHistory("");

  const orderName = useInput("", {
    isEmpty: true,
    minLength: 2,
    maxLength: 30,
  });
  const supplier = useInput("", { isEmpty: true });
  const project = useInput("", { isEmpty: true, minLength: 2, maxLength: 30 });
  const measure = useInput("", { isEmpty: true });
  const [photo, setPhoto] = useState("");
  const shopName = useInput("", { isEmpty: true, minLength: 2, maxLength: 30 });
  const brand = useInput("", { isEmpty: true });
  const quantity = useInput("", {
    isEmpty: true,
    minValue: 0,
    maxValue: 100000,
  });

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
    { value: "number", label: "шт" },
    { value: "gram", label: "г" },
    { value: "kilogram", label: "кг" },
    { value: "meter", label: "м" },
    { value: "meter2", label: "м2" },
    { value: "meter3", label: "м3" },
  ];

  const click = async () => {
    try {
      let data;

      data = await createNewOrder(
        orderName.value,
        supplier.value,
        project.value,
        measure.value,
        photo,
        shopName.value,
        brand.value,
        quantity.value
      );

      order.setOrder({
        orderName: orderName.value,
        supplier: supplier.value,
        project: project.value,
        measure: measure.value,
        photo: photo.value,
        shopName: shopName.value,
        brand: brand.value,
        quantity: quantity.value,
      });

      if (data) {
        history.push(ORDERS_ROUTE);
        console.log(data);
      } else {
        console.log(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container style={{ marginLeft: 'auto', marginRight: 'auto'}}>
      <h2>Создание новой заявки</h2>
      <TextField
        fullWidth={true}
        id="outlined-basic"
        label="Название"
        variant="outlined"
        margin="normal"
        required
        value={orderName.value}
        onChange={(e) => orderName.onChange(e)}
        onBlur={(e) => orderName.onBlur(e)}
      />
      {orderName.isDirty && orderName.isEmpty && (
        <div style={{ color: "red" }}>Поле не может быть пустым</div>
      )}
      {orderName.isDirty && orderName.minLengthError && (
        <div style={{ color: "red" }}>Слишком короткое название</div>
      )}
      {orderName.isDirty && orderName.maxLengthError && (
        <div style={{ color: "red" }}>Слишком длинное название</div>
      )}

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
        value={project.value}
        onChange={(e) => project.onChange(e)}
        onBlur={(e) => project.onBlur(e)}
      >
        {projects.map((option) => (
          <MenuItem key={option.value} value={option.label}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      {project.isDirty && project.isEmpty && (
        <div style={{ color: "red" }}>Поле не может быть пустым</div>
      )}
      {project.isDirty && project.minLengthError && (
        <div style={{ color: "red" }}>Слишком короткое название</div>
      )}
      {project.isDirty && project.maxLengthError && (
        <div style={{ color: "red" }}>Слишком длинное название</div>
      )}

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
        value={brand.value}
        onChange={(e) => brand.onChange(e)}
        onBlur={(e) => brand.onBlur(e)}
      >
        {brands.map((option) => (
          <MenuItem key={option.value} value={option.label}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      {brand.isDirty && brand.isEmpty && (
        <div style={{ color: "red" }}>Поле не может быть пустым</div>
      )}

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
        value={supplier.value}
        onChange={(e) => supplier.onChange(e)}
        onBlur={(e) => supplier.onBlur(e)}
      >
        {suppliers.map((option) => (
          <MenuItem key={option.value} value={option.label}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      {supplier.isDirty && supplier.isEmpty && (
        <div style={{ color: "red" }}>Поле не может быть пустым</div>
      )}

      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="outlined-select-currency"
        label="Название магазина"
        name="shopName"
        autoComplete="shopName"
        value={shopName.value}
        onChange={(e) => shopName.onChange(e)}
        onBlur={(e) => shopName.onBlur(e)}
      />
      {shopName.isDirty && shopName.isEmpty && (
        <div style={{ color: "red" }}>Поле не может быть пустым</div>
      )}
      {shopName.isDirty && shopName.minLengthError && (
        <div style={{ color: "red" }}>Слишком короткое название</div>
      )}
      {shopName.isDirty && shopName.maxLengthError && (
        <div style={{ color: "red" }}>Слишком длинное название</div>
      )}

      <div>
        <TextField
          fullWidth={false}
          style={{ marginRight: 10 }}
          id="outlined-basic"
          label="Количество"
          variant="outlined"
          margin="normal"
          required
          type="number"
          value={quantity.value}
          onChange={(e) => quantity.onChange(e)}
          onBlur={(e) => quantity.onBlur(e)}
        />

        <TextField
          variant="outlined"
          margin="normal"
          style={{ width: 160 }}
          required
          select
          fullWidth={false}
          id="outlined-select-currency"
          label="Ед.измерения"
          name="measure"
          autoComplete="measure"
          value={measure.value}
          onChange={(e) => measure.onChange(e)}
          onBlur={(e) => measure.onBlur(e)}
        >
          {measures.map((option) => (
            <MenuItem key={option.value} value={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        {measures.isDirty && measures.isEmpty && (
          <div style={{ color: "red" }}>Поле не может быть пустым</div>
        )}

        {quantity.isDirty && quantity.isEmpty && (
          <div style={{ color: "red" }}>Поле не может быть пустым</div>
        )}
        {quantity.isDirty && quantity.minValueError && (
          <div style={{ color: "red" }}>
            Значение не может быть отрицательным или равно 0
          </div>
        )}
        {quantity.isDirty && quantity.maxValueError && (
          <div style={{ color: "red" }}>Слишком большое значение</div>
        )}
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
        disabled={
          !orderName.inputValid ||
          !supplier.inputValid ||
          !project.inputValid ||
          !measure.inputValid ||
          !shopName.inputValid ||
          !brand.inputValid ||
          !quantity.inputValid
        }
      >
        Создать заявку
      </Button>
    </Container>
  );
});
export default NewOrder;
