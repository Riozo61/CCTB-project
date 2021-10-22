// import { Button, Card, Container, TextField } from "@mui/material";
// import DateTimePicker from '@mui/lab/DateTimePicker';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import React from "react";

// const NewProject = () => {
//   const [value, setValue] = React.useState(new Date(''));

//   const handleChange = (newValue) => {
//     setValue(newValue);
//   return (
//     <Container>
//       <Card style={{ width: 600 }}>
//         <div>
//           <form noValidate>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               id="nameProject"
//               label="Название проекта"
//               name="nameProject"
//               autoComplete="nameProject"
//               autoFocus
//               value=""
//               onChange=""
//             />
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               name="owner"
//               label="Заказчик"
//               id="owner"
//               value=""
//               onChange=""
//             />
//             <LocalizationProvider dateAdapter={AdapterDateFns}>
//             <DateTimePicker
//             label="Date&Time picker"
//             value={value}
//             onChange={handleChange}
//             renderInput={(params) => <TextField {...params} />}
//             />
//             </LocalizationProvider>

//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="primary"
//               className="submit"
//             >
//               Создать заявку
//             </Button>
//           </form>
//         </div>
//       </Card>
//     </Container>
//   );
// };
// };

// export default NewProject;
