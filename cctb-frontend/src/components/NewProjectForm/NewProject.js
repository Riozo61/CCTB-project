import {
  Button,
  Container,
  Input,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { forwardRef, useContext, useState } from "react";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";
import { createNewProject } from "../../http/projectAPI";
import { Context } from "../..";
import { useHistory } from "react-router";
import { PROJECTS_ROUTE } from "../../utils/consts";
import { observer } from "mobx-react-lite";
const NewProject = observer(() => {
  const NumberFormatCustom = forwardRef(function NumberFormatCustom(
    props,
    ref
  ) {
    const { onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        prefix="$"
      />
    );
  });
  const [values, setValues] = useState({
    numberformat: "",
  });

  NumberFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

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
      payment
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
      payment: payment

    });
    if(data) {
      history.push(PROJECTS_ROUTE);
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
          <MenuItem key={option.value} value={option.value}>
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
      {/* Не работает, если вводить цифры подряд, вводятся только по одной и курсор пропадает */}
      <TextField
        label="Расчет"
        value={values.numberformat}
        onChange={handleChange}
        fullWidth={true}
        variant="outlined"
        margin="normal"
        required
        name="numberformat"
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
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
          <MenuItem key={option.value} value={option.value}>
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
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      </div>

      <TextField
        fullWidth={true}
        id="outlined-basic"
        label={customer === 'company' ? 'Название компании' : 'ФИО'}
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
          <MenuItem key={option.value} value={option.value}>
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
