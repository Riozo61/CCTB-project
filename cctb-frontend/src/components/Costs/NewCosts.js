import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import useInput from "../Validations/Hooks/useInput";
import { Context } from "../..";
import { useHistory } from "react-router";
import { Button, Container, MenuItem, TextField } from "@mui/material";
import { createNewCosts } from "../../http/axios/costsAPI";
import { COSTS_ROUTE } from "../../utils/consts";

const NewCosts = observer(() => {
  const { cost } = useContext(Context);
  const history = useHistory("");

  const type = useInput("", { isEmpty: true });
  const estimation = useInput("", {
    isEmpty: true,
    minValue: 0,
    maxValue: 100000,
  });
  const description = useInput("", {
    isEmpty: true,
    minLength: 2,
    maxLength: 256,
  });

  const types = [
    {
      value: "mat/eq",
      label: "Материалы и оборудование",
    },
    {
      value: "tools/mech",
      label: "Инструменты и маханизмы",
    },
    {
      value: "transport",
      label: "Транспорт",
    },
    {
      value: "salary",
      label: "Зарплата рабочих и инженеров",
    },
    {
      value: "subcontractor",
      label: "Субподрядчик",
    },
  ];
  const click = async () => {
    try {
      let data;
      data = await createNewCosts(
        type.value,
        estimation.value,
        description.value
      );
      cost.setCost({
        type: type.value,
        estimation: estimation.value,
        description: description.value,
      });
      if (data) {
        history.push(COSTS_ROUTE);
      } else {
        console.log(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container style={{ marginLeft: "auto", marginRight: "auto" }}>
      <h2>Затраты</h2>
      <TextField
        variant="outlined"
        margin="normal"
        required
        select
        fullWidth
        id="outlined-select-currency"
        label="Тип"
        name="type"
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
      <TextField
        fullWidth={true}
        style={{ marginRight: 10 }}
        id="outlined-basic"
        label="Расчет"
        variant="outlined"
        margin="normal"
        type="number"
        required
        value={estimation.value}
        onChange={(e) => estimation.onChange(e)}
        onBlur={(e) => estimation.onBlur(e)}
      />
                {estimation.isDirty && estimation.isEmpty && (
            <div style={{ color: "red" }}>Поле не может быть пустым</div>
          )}
          {estimation.isDirty && estimation.minValueError && (
            <div style={{ color: "red" }}>
              Значение не может быть отрицательным или равно 0
            </div>
          )}
          {estimation.isDirty && estimation.maxValueError && (
            <div style={{ color: "red" }}>Слишком большое значение</div>
          )}

      <TextField
        fullWidth={true}
        style={{ marginRight: 10 }}
        id="outlined-basic"
        label="Описание"
        variant="outlined"
        margin="normal"
        type="text"
        value={description.value}
        onChange={(e) => description.onChange(e)}
        onBlur={(e) => description.onBlur(e)}
      />
                {description.isDirty && description.isEmpty && (
            <div style={{ color: "red" }}>Поле не может быть пустым</div>
          )}
          {description.isDirty && description.maxValueError && (
            <div style={{ color: "red" }}>Слишком длинное описание</div>
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
          !type.inputValid || !estimation.inputValid || !description.inputValid
        }
      >
        Подтвердить
      </Button>
    </Container>
  );
});

export default NewCosts;
