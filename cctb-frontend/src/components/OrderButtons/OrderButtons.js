import React from "react";
import Button from "@mui/material/Button";
import { Popover, Stack } from "@mui/material";
import NewOrder from "../NewOrderForm/NewOrder";


const style = {
  marginRight: 20,
};
const OrderButtons = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;


  return (
      <div>
      <Stack direction="row" spacing={2}>
        <div style={{ marginBottom: 40 }}>
          <Button
            variant="contained"
            onClick={handleClick}
            color="success"
            style={style}
          >
            Создать новую заявку
          </Button>
        </div>
        <div>
          <Popover
          style={{width:600, padding: '15px 40px'}}
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
              <NewOrder />
          </Popover>
        </div>
        <div>
          <Button
            variant="contained"
            onClick={() => console.log("click")}
            color="error"
            style={style}
            disabled={false}
          >
            Удалить заявку
          </Button>
        </div>
      </Stack>
      </div>
    );
  
}

export default OrderButtons