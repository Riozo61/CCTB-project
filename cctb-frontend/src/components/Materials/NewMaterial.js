import { Button, Container, MenuItem, TextField } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { ORDERS_ROUTE } from "../../utils/consts";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { createNewMaterial } from "../../http/axios/materialAPI";
import { createNewEquipment } from "../../http/axios/equipmentAPI";
import useInput from "../Validations/Hooks/useInput";
import { getBrand } from "../../http/axios/brandAPI";
import { getPartnerMember } from "../../http/axios/partnerAPI";
import BrandPopover from "../Popover/BrandPopover";
import SupplierPopover from "../Popover/SupplierPopover";

const NewMaterial = observer(() => {
  const { material } = useContext(Context);
  const {equipment} = useContext(Context);
  const history = useHistory("");
  const {brand} = useContext(Context);
  const {partnerMember} = useContext(Context)

  useEffect(() => {
    getPartnerMember().then(data => {partnerMember.setPartnerMember(data.rows)});
    getBrand().then(data => {brand.setBrand(data.rows)})
    
  },
  
  []);
  const suppliers = [];
  if (partnerMember.partnerMember[0]){
    partnerMember.partnerMember.forEach((element) => {
      if (element.rolePartner === "Поставщик") {
        suppliers.push(element);
      }
    });
  }

  const type = useInput("", { isEmpty: true, minLength: 1});
  const name = useInput("", { isEmpty: true, minLength: 1});

  const supplier = useInput("", { isEmpty: true });
  const measure = useInput("", { isEmpty: true });
  const shopName = useInput("", { isEmpty: true, minLength: 1});
  const quantity = useInput("", {
    isEmpty: true,
    minValue: 0,
  });

  const brandName = useInput("", { isEmpty: true });
  const typeObj = useInput("", { isEmpty: true });
  const serialNumber = useInput("", {
    isEmpty: true,
    minLength: 1,
  });

  const measures = [
    { value: "number", label: "шт" },
    { value: "kilogram", label: "кг" },
    { value: "ton", label: "т" },
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
          quantity.value,
          brandName.value
        );
        material.setMaterial({
          type: type.value,
          name: name.value,
          supplier: supplier.value,
          measure: measure.value,
          shopName: shopName.value,
          quantity: quantity.value,
          brand: brandName.value
        });
      } else {
        data = await createNewEquipment(
          type.value,
          brandName.value,
          name.value,
          typeObj.value,
          serialNumber.value
        );
        equipment.addEquipment({
          type: type.value,
          brand: brandName.value,
          name: name.value,
          typeObj: typeObj.value,
          serialNumber: serialNumber.value,
        });
      }
      if (data) {
        history.push(ORDERS_ROUTE);
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
            value={brandName.value}
            onChange={(e) => brandName.onChange(e)}
            onBlur={(e) => brandName.onBlur(e)}
          >
          {brand.brand[0] &&
          brand.brand.map((option) => (
            <MenuItem key={option.id} value={option.brandName}>
              {option.brandName}
            </MenuItem>
          ))}
          </TextField>
          {brandName.isDirty && brandName.isEmpty && (
            <div style={{ color: "red" }}>Поле не может быть пустым</div>
          )}
          <BrandPopover/>

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
          <MenuItem
            key={option.id}
            value={`${option.firstName} ${option.lastName}`}
          >
            {`${option.firstName} ${option.lastName}`}
          </MenuItem>
        ))}
          </TextField>
          {supplier.isDirty && supplier.isEmpty && (
            <div style={{ color: "red" }}>Поле не может быть пустым</div>
          )}
          <SupplierPopover/>

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
            Добавить материал
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

          <TextField
            variant="outlined"
            margin="normal"
            required
            select
            fullWidth={true}
            id="outlined-select-currency"
            label="Бренд"
            name="Brand"
            value={brandName.value}
            onChange={(e) => brandName.onChange(e)}
            onBlur={(e) => brandName.onBlur(e)}
          >
          {brand.brand[0] &&
          brand.brand.map((option) => (
            <MenuItem key={option.id} value={option.brandName}>
              {option.brandName}
            </MenuItem>
          ))}
          </TextField>
          {brandName.isDirty && brandName.isEmpty && (
            <div style={{ color: "red" }}>Поле не может быть пустым</div>
          )}
          <BrandPopover/>

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
          !brandName.inputValid ||
          !typeObj.inputValid ||
          !serialNumber.inputValid
        }
      >
        Добавить оборудование
      </Button>
        </div>
      )}
    </Container>
  );
});
export default NewMaterial;
