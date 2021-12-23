import { Button, Container, MenuItem, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { ORDERS_ROUTE } from "../../utils/consts";
import { observer } from "mobx-react-lite";
// import { createNewEquipment, createNewMaterial } from "../../http/materialAPI";
import { Context } from "../..";
import { createNewMaterial } from "../../http/axios/materialAPI";
import { createNewEquipment } from "../../http/axios/equipmentAPI";
import useInput from "../Validations/Hooks/useInput";

const NewMaterial = observer(() => {
  const { material } = useContext(Context);
  const history = useHistory("");

  const type = useInput("", { isEmpty: true, minLength: 2, maxLength: 30 });
  const name = useInput("", { isEmpty: true, minLength: 2, maxLength: 30 });

  const supplier = useInput("", { isEmpty: true });
  const measure = useInput("", { isEmpty: true });
  const shopName = useInput("", { isEmpty: true, minLength: 2, maxLength: 30 });
  const quantity = useInput("", {
    isEmpty: true,
    minValue: 0,
    maxValue: 100000,
  });

  const brand = useInput("", { isEmpty: true });
  const typeObj = useInput("", { isEmpty: true });
  const serialNumber = useInput("", {
    isEmpty: true,
    minLength: 2,
    maxLength: 50,
  });

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
    { value: "number", label: "шт" },
    { value: "gram", label: "г" },
    { value: "kilogram", label: "кг" },
    { value: "meter", label: "м" },
    { value: "meter2", label: "м2" },
    { value: "meter3", label: "м3" },
  ];
  const types = [
    { value: "material", label: "Материал" },
    { value: "equipment", label: "Оборудование" },
  ];

  const click = async () => {
    try {
      let data;

      if (type.value === "Материал") {
        data = await createNewMaterial(
          type.value,
          name.value,
          supplier.value,
          measure.value,
          shopName.value,
          quantity.value
        );
        material.setMaterial({
          type: type.value,
          name: name.value,
          supplier: supplier.value,
          measure: measure.value,
          shopName: shopName.value,
          quantity: quantity.value,
        });
      } else {
        data = await createNewEquipment(
          type.value,
          name.value,
          brand.value,
          typeObj.value,
          serialNumber.value
        );
        material.setMaterial({
          type: type.value,
          name: name.value,
          brand: brand.value,
          typeObj: typeObj.value,
          serialNumber: serialNumber.value,
        });
      }
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
    <Container style={{ marginLeft: 'auto', marginRight: 'auto' }}>
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
        value={type.value}
        onChange={(e) => type.onChange(e)}
        onBlur={(e) => type.onBlur(e)}
      >
        {types.map((option) => (
          <MenuItem key={option.value} value={option.label}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      {type.isDirty && type.isEmpty && (
        <div style={{ color: "red" }}>Поле не может быть пустым</div>
      )}

      {type.value === "Материал" ? (
        <div>
          <TextField
            fullWidth={true}
            id="outlined-basic"
            label="Название"
            variant="outlined"
            margin="normal"
            required
            value={name.value}
            onChange={(e) => name.onChange(e)}
            onBlur={(e) => name.onBlur(e)}
          />
          {name.isDirty && name.isEmpty && (
            <div style={{ color: "red" }}>Поле не может быть пустым</div>
          )}
          {name.isDirty && name.minLengthError && (
            <div style={{ color: "red" }}>Слишком короткое название</div>
          )}
          {name.isDirty && name.maxLengthError && (
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
            {brandsMat.map((option) => (
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
              type="number"
              required
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            className="submit"
            onClick={click}
            style={{ marginTop: 15 }}
            disabled={
              !type.inputValid ||
              !name.inputValid ||
              !supplier.inputValid ||
              !measure.inputValid ||
              !shopName.inputValid ||
              !quantity.inputValid
            }
          >
            Создать заявку
          </Button>
        </div>
      ) : (
        <div>
          <TextField
            fullWidth={true}
            style={{ marginRight: 10 }}
            id="outlined-basic"
            label="Название оборудования"
            variant="outlined"
            margin="normal"
            required
            value={name.value}
            onChange={(e) => name.onChange(e)}
            onBlur={(e) => name.onBlur(e)}
          />
          {name.isDirty && name.isEmpty && (
            <div style={{ color: "red" }}>Поле не может быть пустым</div>
          )}
          {name.isDirty && name.minLengthError && (
            <div style={{ color: "red" }}>Слишком короткое название</div>
          )}
          {name.isDirty && name.maxLengthError && (
            <div style={{ color: "red" }}>Слишком длинное название</div>
          )}
          <TextField
            fullWidth={true}
            style={{ marginRight: 10 }}
            id="outlined-basic"
            label="Тип"
            variant="outlined"
            margin="normal"
            required
            value={typeObj.value}
            onChange={(e) => typeObj.onChange(e)}
            onBlur={(e) => typeObj.onBlur(e)}
          />
          {typeObj.isDirty && typeObj.isEmpty && (
            <div style={{ color: "red" }}>Поле не может быть пустым</div>
          )}
          {typeObj.isDirty && typeObj.minLengthError && (
            <div style={{ color: "red" }}>Слишком короткое название</div>
          )}
          {typeObj.isDirty && typeObj.maxLengthError && (
            <div style={{ color: "red" }}>Слишком длинное название</div>
          )}

          <TextField
            variant="outlined"
            margin="normal"
            style={{ width: 160 }}
            required
            select
            fullWidth={false}
            id="outlined-select-currency"
            label="Бренд"
            name="measure"
            autoComplete="measure"
            value={measure.value}
            onChange={(e) => measure.onChange(e)}
            onBlur={(e) => measure.onBlur(e)}
          >
            {brandsEq.map((option) => (
              <MenuItem key={option.value} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {measure.isDirty && measure.isEmpty && (
            <div style={{ color: "red" }}>Поле не может быть пустым</div>
          )}

          <TextField
            fullWidth={true}
            style={{ marginRight: 10 }}
            id="outlined-basic"
            label="Серийный номер"
            variant="outlined"
            margin="normal"
            required
            value={serialNumber.value}
            onChange={(e) => serialNumber.onChange(e)}
            onBlur={(e) => serialNumber.onBlur(e)}
          />
          {serialNumber.isDirty && serialNumber.isEmpty && (
            <div style={{ color: "red" }}>Поле не может быть пустым</div>
          )}
          {serialNumber.isDirty && serialNumber.minLengthError && (
            <div style={{ color: "red" }}>Слишком короткое название</div>
          )}
          {serialNumber.isDirty && serialNumber.maxLengthError && (
            <div style={{ color: "red" }}>Слишком длинное название</div>
          )}
          <Button
        type="submit"
        fullWidth
        variant="contained"
        color="success"
        className="submit"
        onClick={click}
        style={{ marginTop: 15 }}
        disabled={
          !type.inputValid ||
          !name.inputValid ||
          !brand.inputValid ||
          !typeObj.inputValid ||
          !serialNumber.inputValid
        }
      >
        Создать заявку
      </Button>
        </div>
      )}
    </Container>
  );
});
export default NewMaterial;
