import React, { useContext } from 'react'
import { observer } from "mobx-react-lite";
import useInput from "../Validations/Hooks/useInput";
import { Context } from "../..";
import { useHistory } from "react-router";

const NewCosts = observer(() => {
  const { cost } = useContext(Context);
  const history = useHistory("");

const type = useInput('', { isEmpty: true })

  return (
    <div>
      
    </div>
  )
})

export default NewCosts
