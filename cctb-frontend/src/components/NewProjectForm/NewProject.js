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


const NewProject = observer(() => {
  const { project } = useContext(Context);
  const history = useHistory("");

  const [projectName, setProjectName] = useState("");
  const [status, setStatus] = useState("");
  const [contract, setContract] = useState("");
  const [estimation, setEstimation] = useState("");
  const [file, setFile] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [projManager, setProjManager] = useState("");
  const [customer, setCustomer] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [payment, setPayment] = useState('');
  const [currency, setCurrency] = useState('');

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
    { value: "company",
      label:'Компания'
},
  {value: 'individual', label: 'Физ.лицо'}
  ];

  const paymentMethods = [
    {value: 'cashless', label: 'Безналичная'},
    {value: 'cash', label: 'Наличная'}
  ];

  const currencies = [
    {value: '$', label: '$'},
    {value: '€', label: '€'},
    {value: '₽', label: '₽'},
  ]

  const click = async () => {
    try {
    let data;

    data = await createNewProject(
      projectName,
      status,
      contract,
      estimation,
      file,
      dateStart,
      dateEnd,
      projManager,
      customer,
      customerName,
      payment,
      currency
    );
    project.setProject({
      projectName: projectName,
      status: status,
      contract: contract,
      estimation: estimation,
      file: file,
      dateStart: dateStart,
      dateEnd: dateEnd,
      projManager: projManager,
      customer: customer,
      customerName: customerName,
      payment: payment,
      currency: currency

    });
    if(data) {
      history.push(PROJECTS_ROUTE);
      console.log(data)
    }
    else{
      console.log(data)
    }
  } catch(e) {
    console.log(e)
  }
  
  };

  return (
    <Container style={{ marginLeft: 10, marginRight: 10 }}>
    <div>
    <h2>Создание нового проекта</h2>
      <TextField
        fullWidth={true}
        id="outlined-basic"
        label="Название проекта"
        variant="outlined"
        margin="normal"
        required
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
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
        value={status}
        onChange={(e) => setStatus(e.target.value)}
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
        value={contract}
        onChange={(e) => setContract(e.target.value)}
      />
      <TextField
        label="Расчет"
        fullWidth={false}
        variant="outlined"
        margin="normal"
        required
        name="numberformat"
        id="formatted-numberformat-input"
        type='number'
        value={estimation}
        onChange={(e) => setEstimation(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        select
        style={{width: 150, marginLeft: 10}}
        id="outlined-select-currency"
        label="Валюта"
        name="status"
        autoComplete="status"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
      >
        {currencies.map((option) => (
          <MenuItem key={option.value} value={option.label}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
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
          value={dateStart}
          onChange={(e) => setDateStart(e.target.value)}
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
          value={dateEnd}
          onChange={(e) => setDateEnd(e.target.value)}
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
        value={projManager}
        onChange={(e) => setProjManager(e.target.value)}
      >
        {projManagers.map((option) => (
          <MenuItem key={option.value} value={option.label}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
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
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
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
        label={customer === 'Компания' ? 'Название компании' : 'ФИО'}
        variant="outlined"
        margin="normal"
        required
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
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
        value={payment}
        onChange={(e) => setPayment(e.target.value)}
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
      >
        Создать проект
      </Button>
      
    </Container>
  );
});
export default NewProject;
