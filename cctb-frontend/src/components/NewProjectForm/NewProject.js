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

    })
  }, []);

  const projectName = useInput("", {
    isEmpty: true,
    minLength: 2,
  });
  const status = useInput("", { isEmpty: true, minLength: 1});
  const contract = useInput("", { isEmpty: true, minLength: 1});
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
            name="currency"
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
        {(Date.parse(dateStart.value) >= Date.parse(dateEnd.value)) && (
          <div style={{ color: "red" }}>Дата начала работ не может быть позже, чем дата конца работ</div>
        )}
        {(((Date.now()) - 86400000) >= Date.parse(dateStart.value)) && (
          <div style={{ color: "red" }}>Дата начала работ не может быть раньше сегодняшнего дня</div>
        )}
        {((Date.parse(dateEnd.value) - Date.parse(dateStart.value)) >= 86400000*365*5) && (
          <div style={{ color: "red" }}>Дата конца работ не может превышать более 5 лет</div>
        )}
        {((dateEnd.isDirty && dateEnd.isEmpty) || (dateStart.isDirty && dateStart.isEmpty)) && (
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
          {member.member[0] && member.member.map((option) => (
            <MenuItem key={option.id} value={`${option.firstName} ${option.lastName}`}>
              {`${option.firstName} ${option.lastName}`}
            </MenuItem>
          ))}
        </TextField>
        {projManager.isDirty && projManager.isEmpty && (
          <div style={{ color: "red" }}>Поле не может быть пустым</div>
        )}
        <ProjectPopover/>
        

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
        label={customer.value === "Компания" ? "Название компании" : "ФИО"}
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
          !currency.inputValid || 
          !dateEnd.inputValid ||
          !dateStart.inputValid ||
          (Date.parse(dateStart.value) >= Date.parse(dateEnd.value)) ||
          ((Date.now()) - 86400000) >= Date.parse(dateStart.value) ||
          ((Date.parse(dateEnd.value) - Date.parse(dateStart.value)) >= 86400000*365*5)
        }
      >
        Создать проект
      </Button>
    </Container>
  );
});
export default NewProject;
