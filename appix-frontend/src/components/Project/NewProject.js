import {
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { createNewProject } from "../../http/axios/projectAPI";

import { Context } from "../..";
import { useHistory } from "react-router";
import { PROJECTS_ROUTE } from "../../utils/consts";
import { observer } from "mobx-react-lite";
import useInput from "../Validations/Hooks/useInput";
import { getEmployee } from "../../http/axios/teamAPI";
import ProjectPopover from "../Popover/ProjectPopover";

const NewProject = observer(() => {
  const { project } = useContext(Context);
  const history = useHistory("");
  const { member } = useContext(Context);
  useEffect(() => {
    getEmployee().then((data) => {
      member.setMember(data.rows);
    });
  }, []);

  const projectName = useInput("", {
    isEmpty: true,
    minLength: 2,
  });
  const status = useInput("", { isEmpty: true, minLength: 1 });
  const contract = useInput("", { isEmpty: true, minLength: 1 });
  const estimation = useInput("", {
    isEmpty: true,
    minValue: 0,
  });
  const [file, setFile] = useState("");
  const dateStart = useInput("", {
    isEmpty: true,
  });
  const dateEnd = useInput("", { isEmpty: true });
  const projManager = useInput("", {
    isEmpty: true,
  });
  const customer = useInput("", { isEmpty: true });
  const customerName = useInput("", {
    isEmpty: true,
    minLength: 1,
  });
  const payment = useInput("", { isEmpty: true });
  const currency = useInput("", { isEmpty: true });

  const statuses = [
    {
      value: "offer",
      label: "Ценовое предложение",
    },
    {
      value: "during",
      label: "В работе",
    },
    {
      value: "complete",
      label: "Выполнено",
    },
    {
      value: "waiting",
      label: "В ожидании",
    },
    {
      value: "archive",
      label: "Архивировано",
    },
  ];
  const varCustomers = [
    { value: "company", label: "Компания" },
    { value: "individual", label: "Физ.лицо" },
  ];

  const paymentMethods = [
    { value: "cashless", label: "Безналичная" },
    { value: "cash", label: "Наличная" },
  ];

  const currencies = [
    { value: "$", label: "$" },
    { value: "€", label: "€" },
    { value: "₽", label: "₽" },
  ];

  const click = async () => {
    try {
      let data;

      data = await createNewProject(
        projectName.value,
        status.value,
        contract.value,
        estimation.value,
        file,
        dateStart.value,
        dateEnd.value,
        projManager.value,
        customer.value,
        customerName.value,
        payment.value,
        currency.value
      );
      project.setProject({
        projectName: projectName.value,
        status: status.value,
        contract: contract.value,
        estimation: estimation.value,
        file: file,
        dateStart: dateStart.value,
        dateEnd: dateEnd.value,
        projManager: projManager.value,
        customer: customer.value,
        customerName: customerName.value,
        payment: payment.value,
        currency: currency.value,
      });
      if (data) {
        history.push(PROJECTS_ROUTE);
      } else {
        console.log(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container style={{ marginLeft: "auto", marginRight: "auto" , marginTop: 20, marginBottom: 20, maxWidth: 800}}>
      <div>
        <Typography variant="h5">Создание нового проекта</Typography>
        <TextField
          fullWidth={true}
          id="outlined-basic"
          label="Название проекта"
          variant="outlined"
          margin="normal"
          required
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
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          select
          fullWidth
          id="outlined-select-currency"
          label="Статус"
          name="status"
          autoComplete="status"
          value={status.value}
          onChange={(e) => status.onChange(e)}
          onBlur={(e) => status.onBlur(e)}
          error={
            (!status.inputValid ? true : false) &&
            (!status.isDirty ? false : true)
          }
          component="pre"
          helperText={`${
            status.isDirty && status.isEmpty
              ? "Поле не может быть пустым\n"
              : ""
          }`}
        >
          {statuses.map((option) => (
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
          id="outlined-basic"
          label="Номер договора"
          name="contract"
          autoComplete="contract"
          value={contract.value}
          onChange={(e) => contract.onChange(e)}
          onBlur={(e) => contract.onBlur(e)}
          error={
            (!contract.inputValid ? true : false) &&
            (!contract.isDirty ? false : true)
          }
          component="pre"
          helperText={`${
            contract.isDirty && contract.isEmpty
              ? "Поле не может быть пустым\n"
              : ""
          }${
            contract.isDirty && contract.minLengthError
              ? "Слишком короткое название\n"
              : ""
          }`}
        />
        <div>
          <TextField
            label="Расчет"
            fullWidth={false}
            style={{ width: 400, marginRight: 10 }}
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
                ? "Значение не может быть отрицательным или равно 0\n"
                : ""
            }`}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            select
            style={{ width: 200 }}
            id="outlined-select-currency"
            label="Валюта"
            name="currency"
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
        </div>

        <div>
          <input
            accept="text/*"
            style={{ display: "none" }}
            id="raised-button-file"
            multiple
            type="file"
          />
          <label htmlFor="raised-button-file">
            <Button variant="outlined" component="span">
              Загрузить файл
            </Button>
          </label>
        </div>
        <div>
          <TextField
            margin="normal"
            style={{ marginRight: 20 }}
            id="date"
            label="Начало работ"
            type="date"
            sx={{ width: 220 }}
            value={dateStart.value}
            onChange={(e) => dateStart.onChange(e)}
            onBlur={(e) => dateStart.onBlur(e)}
            error={
              ((!dateStart.inputValid ? true : false) &&
                (!dateStart.isDirty ? false : true)) ||
              Date.parse(dateStart.value) >= Date.parse(dateEnd.value) ||
              Date.now() - 86400000 >= Date.parse(dateStart.value)
            }
            component="pre"
            helperText={`${
              Date.parse(dateStart.value) >= Date.parse(dateEnd.value)
                ? "Дата начала работ не может быть\n позже, чем дата конца работ\n"
                : ""
            }${
              Date.now() - 86400000 >= Date.parse(dateStart.value)
                ? "Дата начала работ не может быть\nраньше сегодняшнего дня\n"
                : ""
            }${
              dateStart.isDirty && dateStart.isEmpty
                ? "Поле не может быть пустым\n"
                : ""
            }`}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            margin="normal"
            id="date"
            label="Окончание работ"
            type="date"
            sx={{ width: 220 }}
            value={dateEnd.value}
            onChange={(e) => dateEnd.onChange(e)}
            onBlur={(e) => dateEnd.onBlur(e)}
            error={
              ((!dateEnd.inputValid ? true : false) &&
                (!dateEnd.isDirty ? false : true)) ||
              Date.parse(dateStart.value) >= Date.parse(dateEnd.value) ||
              Date.parse(dateEnd.value) - Date.parse(dateStart.value) >=
                86400000 * 365 * 5
            }
            component="pre"
            helperText={`${
              Date.parse(dateEnd.value) - Date.parse(dateStart.value) >=
              86400000 * 365 * 5
                ? "Дата конца работ не может превышать более 5 лет\n"
                : ""
            }${
              Date.parse(dateStart.value) >= Date.parse(dateEnd.value)
                ? "Дата начала работ не может быть\nпозже, чем дата конца работ"
                : ""
            }${
              dateEnd.isDirty && dateEnd.isEmpty
                ? "Поле не может быть пустым\n"
                : ""
            }`}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <TextField
          variant="outlined"
          margin="normal"
          required
          select
          fullWidth
          id="outlined-select-currency"
          label="Руководитель проекта"
          name="projManager"
          autoComplete="projManager"
          value={projManager.value}
          onChange={(e) => projManager.onChange(e)}
          onBlur={(e) => projManager.onBlur(e)}
          error={
            (!projManager.inputValid ? true : false) &&
            (!projManager.isDirty ? false : true)
          }
          component="pre"
          helperText={`${
            projManager.isDirty && projManager.isEmpty
              ? "Поле не может быть пустым\n"
              : ""
          }`}
        >
          {member.member.map((option) => (
            <MenuItem
              key={option.id}
              value={`${option.firstName} ${option.lastName}`}
            >
              {`${option.firstName} ${option.lastName}`}
            </MenuItem>
          ))}
        </TextField>
        <ProjectPopover />

        <Typography variant='h6'>Заказчик</Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          select
          fullWidth
          id="outlined-select-currency"
          label="Заказчик"
          name="projManager"
          autoComplete="projManager"
          value={customer.value}
          onChange={(e) => customer.onChange(e)}
          onBlur={(e) => customer.onBlur(e)}
          error={
            (!customer.inputValid ? true : false) &&
            (!customer.isDirty ? false : true)
          }
          component="pre"
          helperText={`${
            customer.isDirty && customer.isEmpty
              ? "Поле не может быть пустым\n"
              : ""
          }`}
        >
          {varCustomers.map((option) => (
            <MenuItem key={option.value} value={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>

      <TextField
        fullWidth={true}
        id="outlined-basic"
        label={customer.value === "Компания" ? "Название компании" : "ФИО"}
        variant="outlined"
        margin="normal"
        required
        value={customerName.value}
        onChange={(e) => customerName.onChange(e)}
        onBlur={(e) => customerName.onBlur(e)}
        error={
          (!customerName.inputValid ? true : false) &&
          (!customerName.isDirty ? false : true)
        }
        component="pre"
        helperText={`${
          customerName.isDirty && customerName.isEmpty
            ? "Поле не может быть пустым\n"
            : ""
        }${
          customerName.isDirty && customerName.minLengthError
            ? "Слишком короткое название\n"
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
        label="Форма оплаты"
        name="payment"
        autoComplete="payment"
        value={payment.value}
        onChange={(e) => payment.onChange(e)}
        onBlur={(e) => payment.onBlur(e)}
        error={
          (!payment.inputValid ? true : false) &&
          (!payment.isDirty ? false : true)
        }
        component="pre"
        helperText={`${
          payment.isDirty && payment.isEmpty
            ? "Поле не может быть пустым\n"
            : ""
        }`}
      >
        {paymentMethods.map((option) => (
          <MenuItem key={option.value} value={option.label}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="success"
        className="submit"
        onClick={click}
        style={{ marginTop: 15 }}
        disabled={
          !projectName.inputValid ||
          !status.inputValid ||
          !contract.inputValid ||
          !estimation.inputValid ||
          !dateStart.inputValid ||
          !dateEnd.inputValid ||
          !projManager.inputValid ||
          !customer.inputValid ||
          !customerName.inputValid ||
          !payment.inputValid ||
          !currency.inputValid ||
          !dateEnd.inputValid ||
          !dateStart.inputValid ||
          Date.parse(dateStart.value) >= Date.parse(dateEnd.value) ||
          Date.now() - 86400000 >= Date.parse(dateStart.value) ||
          Date.parse(dateEnd.value) - Date.parse(dateStart.value) >=
            86400000 * 365 * 5
        }
      >
        Создать проект
      </Button>
    </Container>
  );
});
export default NewProject;
