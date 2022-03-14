import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import useInput from "../Validations/Hooks/useInput";
import { Context } from "../..";
import { useHistory } from "react-router";
import { Button, Container, MenuItem, TextField, Typography } from "@mui/material";
import { createNewCosts } from "../../http/axios/costsAPI";
import { COSTS_ROUTE } from "../../utils/consts";
import { getProjects } from "../../http/axios/projectAPI";

const NewCosts = observer(() => {
  const { cost } = useContext(Context);
  const history = useHistory("");
  const { project } = useContext(Context);

  useEffect(() => {
    getProjects().then((data) => {
      project.setProject(data.rows);
    });
  }, []);

  const projectName = useInput("", { isEmpty: true, minLength: 1 });
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
        currency: currency.value,
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
    <Container style={{ marginLeft: "auto", marginRight: "auto", marginTop: 20, marginBottom: 20, maxWidth: 800}}>
    
      <Typography variant="h5">Затраты</Typography>
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
            ? "Слишком короткое название\n"
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
        required
        select
        fullWidth
        id="outlined-select-currency"
        label="Тип"
        name="type"
        value={type.value}
        onChange={(e) => type.onChange(e)}
        onBlur={(e) => type.onBlur(e)}
        error={
          (!type.inputValid ? true : false) && (!type.isDirty ? false : true)
        }
        component="pre"
        helperText={`${
          type.isDirty && type.isEmpty ? "Поле не может быть пустым\n" : ""
        }`}
      >
        {types.map((option) => (
          <MenuItem key={option.value} value={option.label}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

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
        error={
          (!estimation.inputValid ? true : false) &&
          (!estimation.isDirty ? false : true)
        }
        component="pre"
        helperText={`${
          estimation.isDirty && estimation.isEmpty
            ? "Поле не может быть пустым\n"
            : ""
        }${
          estimation.isDirty && estimation.minValueError
            ? "Значение не может быть\nотрицательным или равно 0"
            : ""
        }`}
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
        error={
          (!currency.inputValid ? true : false) &&
          (!currency.isDirty ? false : true)
        }
        component="pre"
        helperText={`${
          currency.isDirty && currency.isEmpty
            ? "Поле не может быть пустым\n"
            : ""
        }`}
      >
        {currencies.map((option) => (
          <MenuItem key={option.value} value={option.label}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

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
        error={
          (!description.inputValid ? true : false) &&
          (!description.isDirty ? false : true)
        }
        component="pre"
        helperText={`${
          description.isDirty && description.isEmpty
            ? "Поле не может быть пустым\n"
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
          !type.inputValid || !estimation.inputValid || !description.inputValid
        }
      >
        Подтвердить
      </Button>
    </Container>
  );
});

export default NewCosts;
