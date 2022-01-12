import { Button, Container, MenuItem, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { ORDERS_ROUTE } from "../../utils/consts";
import { observer } from "mobx-react-lite";
// import { createNewOrder } from "../../http/orderAPI";
import { createNewOrder } from "../../http/axios/orderAPI";
import { Context } from "../..";
import useInput from "../Validations/Hooks/useInput";
import { useEffect } from "react";
import { getProjects } from "../../http/axios/projectAPI";
import { getPartnerMember } from "../../http/axios/partnerAPI";
import BrandPopover from "./BrandPopover";
import { getBrand } from "../../http/axios/brandAPI";

const NewOrder = observer(() => {
  const { order } = useContext(Context);
  const history = useHistory("");
  const {project} = useContext(Context)
  const {partnerMember} = useContext(Context);
  const {brand} = useContext(Context);

  useEffect(() => {
    getProjects().then(data => {project.setProject(data.rows)});
    getPartnerMember().then(data => {partnerMember.setPartnerMember(data.rows)});
    getBrand().then(data => {brand.brand.setBrand(data.rows)})
    
  },
  
  [])
  const suppliers = [];
  if (partnerMember.partnerMember[0]){
    partnerMember.partnerMember.forEach((element) => {
      if (element.rolePartner === "Поставщик") {
        suppliers.push(element);
      }
    });
  }
  
  const orderName = useInput("", {
    isEmpty: true,
    minLength: 2,
  });
  const supplier = useInput("", { isEmpty: true });
  const projectName = useInput("", { isEmpty: true, minLength: 1});
  const measure = useInput("", { isEmpty: true });
  const [photo, setPhoto] = useState("");
  const shopName = useInput("", { isEmpty: true, minLength: 1});
  const brandName = useInput("", { isEmpty: true });
  const quantity = useInput("", {
    isEmpty: true,
    minValue: 0,
  });

  const brands = [];
  if (brand.brand[0]){
    brand.brand.forEach((element) => {
      if (element.brandName) {
        brands.push(element);
      }
    });
  }


  const measures = [
    { value: "number", label: "шт" },
    { value: "ton", label: "т" },
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
        projectName.value,
        measure.value,
        photo,
        shopName.value,
        brandName.value,
        quantity.value
      );

      order.setOrder({
        orderName: orderName.value,
        supplier: supplier.value,
        project: projectName.value,
        measure: measure.value,
        photo: photo.value,
        shopName: shopName.value,
        brand: brandName.value,
        quantity: quantity.value,
      });

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
        value={projectName.value}
        onChange={(e) => projectName.onChange(e)}
        onBlur={(e) => projectName.onBlur(e)}
      >
        {project.project[0] && project.project.map((option) => (
          <MenuItem key={option.id} value={option.projectName}>
            {option.projectName}
          </MenuItem>
        ))}
      </TextField>
      {projectName.isDirty && projectName.isEmpty && (
        <div style={{ color: "red" }}>Поле не может быть пустым</div>
      )}
      {projectName.isDirty && projectName.minLengthError && (
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
        {brands.map((option) => (
          <MenuItem key={option.value} value={option.label}>
            {option.label}
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
          <MenuItem key={option.id} value={`${option.firstName} ${option.lastName}`}>
            {`${option.firstName} ${option.lastName}`}
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
          !projectName.inputValid ||
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
