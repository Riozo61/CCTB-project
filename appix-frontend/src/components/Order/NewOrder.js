import { Button, Container, MenuItem, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { ORDERS_ROUTE } from "../../utils/consts";
import { observer } from "mobx-react-lite";
import { createNewOrder } from "../../http/axios/orderAPI";
import { Context } from "../..";
import useInput from "../Validations/Hooks/useInput";
import { useEffect } from "react";
import { getProjects } from "../../http/axios/projectAPI";
import { getPartnerMember } from "../../http/axios/partnerAPI";
import BrandPopover from "../Popover/BrandPopover";
import { getBrand } from "../../http/axios/brandAPI";
import SupplierPopover from "../Popover/SupplierPopover";
import ShopPopover from "../Popover/ShopPopover";
import { getShop } from "../../http/axios/shopAPI";

const NewOrder = observer(() => {
  const { order } = useContext(Context);
  const history = useHistory("");
  const { project } = useContext(Context);
  const { partnerMember } = useContext(Context);
  const { brand } = useContext(Context);
  const {shop} = useContext(Context);

  useEffect(() => {
    getProjects().then((data) => {
      project.setProject(data.rows);
    });
    getPartnerMember().then((data) => {
      partnerMember.setPartnerMember(data.rows);
    });
    getBrand().then((data) => {
      brand.setBrand(data.rows);
    });
    getShop().then((data) => {
      shop.setShop(data.rows)
    })
  }, []);
  const suppliers = [];
  partnerMember.partnerMember.forEach((element) => {
    if (element.rolePartner === "Поставщик") {
      suppliers.push(element);
    }
  });

  const orderName = useInput("", {
    isEmpty: true,
    minLength: 2,
  });
  const supplier = useInput("", { isEmpty: true });
  const projectName = useInput("", { isEmpty: true, minLength: 1 });
  const measure = useInput("", { isEmpty: true });
  const [photo, setPhoto] = useState("");
  const shopName = useInput("", { isEmpty: true, minLength: 1 });
  const brandName = useInput("", { isEmpty: true });
  const quantity = useInput("", {
    isEmpty: true,
    minValue: 0,
  });

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
    <Container style={{ marginLeft: "auto", marginRight: "auto", marginTop: 20, marginBottom: 20, maxWidth: 800}}>
      <Typography variant="h5">Создание новой заявки</Typography>
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
        error={
          (!orderName.inputValid ? true : false) &&
          (!orderName.isDirty ? false : true)
        }
        component="pre"
        helperText={`${
          orderName.isDirty && orderName.isEmpty
            ? "Поле не может быть пустым\n"
            : ""
        }${
          orderName.isDirty && orderName.minLengthError
            ? "Слишком короткое название"
            : ""
        }`}
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
        value={projectName.value}
        onChange={(e) => projectName.onChange(e)}
        onBlur={(e) => projectName.onBlur(e)}
        error={
          (!projectName.inputValid ? true : false) &&
          (!projectName.isDirty ? false : true)
        }
        component="pre"
        helperText={`${
          projectName.isDirty && projectName.isEmpty
            ? "Поле не может быть пустым\n"
            : ""
        }${
          projectName.isDirty && projectName.minLengthError
            ? "Слишком короткое название"
            : ""
        }`}
      >
        {project.project.map((option) => (
          <MenuItem key={option.id} value={option.projectName}>
            {option.projectName}
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
        value={brandName.value}
        onChange={(e) => brandName.onChange(e)}
        onBlur={(e) => brandName.onBlur(e)}
        error={
          (!brandName.inputValid ? true : false) &&
          (!brandName.isDirty ? false : true)
        }
        component="pre"
        helperText={`${
          brandName.isDirty && brandName.isEmpty
            ? "Поле не может быть пустым"
            : ""
        }`}
      >
        {brand.brand.map((option) => (
          <MenuItem key={option.id} value={option.brandName}>
            {option.brandName}
          </MenuItem>
        ))}
      </TextField>
      <BrandPopover />

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
        error={
          (!supplier.inputValid ? true : false) &&
          (!supplier.isDirty ? false : true)
        }
        component="pre"
        helperText={`${
          supplier.isDirty && supplier.isEmpty
            ? "Поле не может быть пустым"
            : ""
        }`}
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
      <SupplierPopover />

      <TextField
        variant="outlined"
        margin="normal"
        select
        required
        fullWidth
        id="outlined-basic"
        label="Название магазина"
        name="shop"
        value={shopName.value}
        onChange={(e) => shopName.onChange(e)}
        onBlur={(e) => shopName.onBlur(e)}
        error={
          (!shopName.inputValid ? true : false) &&
          (!shopName.isDirty ? false : true)
        }
        component="pre"
        helperText={`${
          shopName.isDirty && shopName.isEmpty
            ? "Поле не может быть пустым"
            : ""
        }`}
      >
        {shop.shop.map((option) => (
          <MenuItem key={option.id} value={option.shopName}>
            {option.shopName}
          </MenuItem>
        ))}
      </TextField>
      <ShopPopover/>

      <div>
        <TextField
          fullWidth={false}
          style={{ marginRight: 10, width: 220 }}
          id="outlined-basic"
          label="Количество"
          variant="outlined"
          margin="normal"
          required
          type="number"
          value={quantity.value}
          onChange={(e) => quantity.onChange(e)}
          onBlur={(e) => quantity.onBlur(e)}
          error={
            (!quantity.inputValid ? true : false) &&
            (!quantity.isDirty ? false : true)
          }
          component="pre"
          helperText={`${
            quantity.isDirty && quantity.isEmpty
              ? "Поле не может быть пустым\n"
              : ""
          }${
            quantity.isDirty && quantity.minValueError
              ? "Значение не может быть\nотрицательным или равно 0"
              : ""
          }`}
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
          error={
            (!measure.inputValid ? true : false) &&
            (!measure.isDirty ? false : true)
          }
          component="pre"
          helperText={`${
            measure.isDirty && measure.isEmpty
              ? "Поле не может быть пустым"
              : ""
          }`}
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
        disabled={
          !orderName.inputValid ||
          !supplier.inputValid ||
          !projectName.inputValid ||
          !measure.inputValid ||
          !shopName.inputValid ||
          !brandName.inputValid ||
          !quantity.inputValid
        }
      >
        Создать заявку
      </Button>
    </Container>
  );
});
export default NewOrder;
