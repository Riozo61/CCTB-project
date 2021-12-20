import {
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
// import { createNewProject } from "../../http/projectAPI";
import { createNewProject } from "../../http/axios/projectAPI";

import { Context } from "../..";
import { useHistory } from "react-router";
import { PROJECTS_ROUTE } from "../../utils/consts";
import { observer } from "mobx-react-lite";
import useInput from "../Validations/Hooks/useInput";

const NewProject = observer(() => {
  const { project } = useContext(Context);
  const history = useHistory("");

  const projectName = useInput("", {
    isEmpty: true,
    minLength: 2,
    maxLength: 30,
  });
  const status = useInput("", { isEmpty: true, minLength: 2, maxLength: 30 });
  const contract = useInput("", { isEmpty: true, minLength: 2, maxLength: 30 });
  const estimation = useInput("", {
    isEmpty: true,
    minValue: 0,
    maxValue: 100000,
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
    minLength: 2,
    maxLength: 40,
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
  const projManagers = [
    { value: "manager1", label: "Руководитель 1" },
    { value: "manager2", label: "Руководитель 2" },
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
      <div>
        <h2>Создание нового проекта</h2>
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
        />
        {projectName.isDirty && projectName.isEmpty && (
          <div style={{ color: "red" }}>Поле не может быть пустым</div>
        )}
        {projectName.isDirty && projectName.minLengthError && (
          <div style={{ color: "red" }}>Слишком короткое название</div>
        )}
        {projectName.isDirty && projectName.maxLengthError && (
          <div style={{ color: "red" }}>Слишком длинное название</div>
        )}

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
        >
          {statuses.map((option) => (
            <MenuItem key={option.value} value={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        {status.isDirty && status.isEmpty && (
          <div style={{ color: "red" }}>Поле не может быть пустым</div>
        )}
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
        />
        {contract.isDirty && contract.isEmpty && (
          <div style={{ color: "red" }}>Поле не может быть пустым</div>
        )}
        {contract.isDirty && contract.minLengthError && (
          <div style={{ color: "red" }}>Слишком короткое название</div>
        )}
        {contract.isDirty && contract.maxLengthError && (
          <div style={{ color: "red" }}>Слишком длинное название</div>
        )}
        <div>
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
          {contract.isDirty && contract.isEmpty && (
            <div style={{ color: "red" }}>Поле не может быть пустым</div>
          )}

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
            InputLabelProps={{
              shrink: true,
            }}
          />
          {dateStart.isDirty && dateStart.isEmpty && (
            <div style={{ color: "red" }}>Поле не может быть пустым</div>
          )}

          <TextField
            margin="normal"
            id="date"
            label="Окончание работ"
            type="date"
            sx={{ width: 220 }}
            value={dateEnd.value}
            onChange={(e) => dateEnd.onChange(e)}
            onBlur={(e) => dateEnd.onBlur(e)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        {dateEnd.isDirty && dateEnd.isEmpty && (
          <div style={{ color: "red" }}>Поле не может быть пустым</div>
        )}

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
        >
          {projManagers.map((option) => (
            <MenuItem key={option.value} value={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        {projManager.isDirty && projManager.isEmpty && (
          <div style={{ color: "red" }}>Поле не может быть пустым</div>
        )}

        <Typography>Заказчик</Typography>
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
        >
          {varCustomers.map((option) => (
            <MenuItem key={option.value} value={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        {customer.isDirty && customer.isEmpty && (
          <div style={{ color: "red" }}>Поле не может быть пустым</div>
        )}
      </div>

      <TextField
        fullWidth={true}
        id="outlined-basic"
        label={customer === "Компания" ? "Название компании" : "ФИО"}
        variant="outlined"
        margin="normal"
        required
        value={customerName.value}
        onChange={(e) => customerName.onChange(e)}
        onBlur={(e) => customerName.onBlur(e)}
      />
      {customerName.isDirty && customerName.isEmpty && (
        <div style={{ color: "red" }}>Поле не может быть пустым</div>
      )}
      {customerName.isDirty && customerName.minLengthError && (
        <div style={{ color: "red" }}>Слишком короткое название</div>
      )}
      {customerName.isDirty && customerName.maxLengthError && (
        <div style={{ color: "red" }}>Слишком длинное название</div>
      )}

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
      >
        {paymentMethods.map((option) => (
          <MenuItem key={option.value} value={option.label}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      {payment.isDirty && payment.isEmpty && (
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
          !currency.inputValid
        }
      >
        Создать проект
      </Button>
    </Container>
  );
});
export default NewProject;
