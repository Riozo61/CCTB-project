import React from "react";
import { observer } from "mobx-react-lite";
import AppButtons from "../../components/Project/buttons";
import ProjectList from "../../components/Project/ProjectList";
import { Box, Toolbar} from "@mui/material";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    textDecoration: "none",
    color: "white",
    borderRadius: theme.spacing(0.5),
    background: "green",
    margin: theme.spacing(2),
    padding: theme.spacing(1),

  },
  header2: {
    flexGrow: 1,
    marginBottom: 25
  },
  toolBar: {
    height: theme.spacing(5),

  },
  box: {
    margin: 15,
  },
}));

const Projects = observer(() => {
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <Toolbar className={classes.toolBar}>
        <Typography variant="h4" className={classes.header2}>
          Проекты
        </Typography>
        <div>
          <AppButtons className={classes.button} />
        </div>
      </Toolbar>
      <Box className={classes.box}>
        <ProjectList />
      </Box>
    </Box>
  );
});

export default Projects;
