import { Button, Container, MenuItem, TextField, Typography } from "@mui/material";
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
import ShopPopover from "../Popover/ShopPopover";
import { getShop } from "../../http/axios/shopAPI";

const NewMaterial = observer(() => {
  const { material } = useContext(Context);
  const { equipment } = useContext(Context);
  const history = useHistory("");
  const { brand } = useContext(Context);
  const { partnerMember } = useContext(Context);
  const {shop} = useContext(Context)

  useEffect(() => {
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
  if (partnerMember.partnerMember[0]) {
    partnerMember.partnerMember.forEach((element) => {
      if (element.rolePartner === "Поставщик") {
        suppliers.push(element);
      }
    });
  }

  const type = useInput("", { isEmpty: true, minLength: 1 });
  const name = useInput("", { isEmpty: true, minLength: 1 });

  const supplier = useInput("", { isEmpty: true });
  const measure = useInput("", { isEmpty: true });
  const shopName = useInput("", { isEmpty: true, minLength: 1 });
  const quantity = useInput("", {
    isEmpty: true,
    minValue: 0,
  });

  const brandName = useInput("", { isEmpty: true });
  const typeObj = useInput("", { isEmpty: true, minLength: 1});
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
        material.addMaterial({
          type: type.value,
          name: name.value,
          supplier: supplier.value,
          measure: measure.value,
          shopName: shopName.value,
          quantity: quantity.value,
          brand: brandName.value,
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
    <Container style={{ marginLeft: "auto", marginRight: "auto", marginTop: 20, marginBottom: 20, maxWidth: 800}}>
      <Typography variant='h5'>Добавление на склад</Typography>

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
        error={
          (!type.inputValid ? true : false) && (!type.isDirty ? false : true)
        }
        component="pre"
        helperText={`${
          type.isDirty && type.isEmpty ? "Поле не может быть пустым" : ""
        }`}
      >
        {types.map((option) => (
          <MenuItem key={option.value} value={option.label}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

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
            error={
              (!name.inputValid ? true : false) &&
              (!name.isDirty ? false : true)
            }
            component="pre"
            helperText={`${
              name.isDirty && name.isEmpty ? "Поле не может быть пустым\n" : ""
            }${
              name.isDirty && name.minLengthError
                ? "Слишком короткое название"
                : ""
            }`}
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
              !brandName.inputValid ||
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
            error={
              (!name.inputValid ? true : false) &&
              (!name.isDirty ? false : true)
            }
            component="pre"
            helperText={`${
              name.isDirty && name.isEmpty ? "Поле не может быть пустым\n" : ""
            }${
              name.isDirty && name.minLengthError
                ? "Слишком короткое название"
                : ""
            }`}
          />

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
            error={
              (!typeObj.inputValid ? true : false) &&
              (!typeObj.isDirty ? false : true)
            }
            component="pre"
            helperText={`${
              typeObj.isDirty && typeObj.isEmpty
                ? "Поле не может быть пустым\n"
                : ""
            }${
              typeObj.isDirty && typeObj.minLengthError
                ? "Слишком короткое название"
                : ""
            }`}
          />

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
            error={
              (!serialNumber.inputValid ? true : false) &&
              (!serialNumber.isDirty ? false : true)
            }
            component="pre"
            helperText={`${
              serialNumber.isDirty && serialNumber.isEmpty
                ? "Поле не может быть пустым\n"
                : ""
            }${
              serialNumber.isDirty && serialNumber.minLengthError
                ? "Слишком короткий серийный номер"
                : ""
            }`}
          />

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
