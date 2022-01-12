import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import useInput from "../Validations/Hooks/useInput";
import { Context } from "../..";
import { useHistory } from "react-router";
import { Button, Container, MenuItem, TextField } from "@mui/material";
import { createNewCosts } from "../../http/axios/costsAPI";
import { COSTS_ROUTE } from "../../utils/consts";
import { getProjects } from "../../http/axios/projectAPI";

const NewCosts = observer(() => {
  const { cost } = useContext(Context);
  const history = useHistory("");
  const {project} = useContext(Context)

  useEffect(() => {
    getProjects().then(data => {project.setProject(data.rows)});
  },
  [])

  const projectName = useInput("", { isEmpty: true, minLength: 1});
  const type = useInput("", { isEmpty: true });
  const estimation = useInput("", {
    isEmpty: true,
    minValue: 0,
  });
  const currency = useInput("", { isEmpty: true });
  const description = useInput("", {
    isEmpty: true,
    minLength: 1,
  });
  const currencies = [
    { value: "$", label: "$" },
    { value: "€", label: "€" },
    { value: "₽", label: "₽" },
  ];

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
        description.value,
        projectName.value,
        currency.value
      );
      cost.setCost({
        type: type.value,
        estimation: estimation.value,
        description: description.value,
        project: projectName.value,
        currency: currency.value
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
            label="Расчет"
            fullWidth={false}
            variant="outlined"
            margin="normal"
            required
            name="numberformat"
            id="formatted-numberformat-input"
            type="number"
            value={estimation.value}
            onChange={(e) => estimation.onChange(e)}
            onBlur={(e) => estimation.onBlur(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            select
            style={{ width: 150, marginLeft: 10 }}
            id="outlined-select-currency"
            label="Валюта"
            name="status"
            autoComplete="status"
            value={currency.value}
            onChange={(e) => currency.onChange(e)}
            onBlur={(e) => currency.onBlur(e)}
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {((estimation.isDirty && estimation.isEmpty) || (currency.isDirty && currency.isEmpty)) && (
            <div style={{ color: "red" }}>Поле не может быть пустым</div>
          )}

          {estimation.isDirty && estimation.minValueError && (
            <div style={{ color: "red" }}>
              Значение не может быть отрицательным или равно 0
            </div>
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
