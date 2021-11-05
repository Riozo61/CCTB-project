import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../../index';
import OrderItem from './OrderItem';
import { useHistory } from 'react-router';

const OrderList = observer( () => {
  const { order } = useContext(Context);
  const history = useHistory();
  console.log(history)

  return (
    <div>
      {order.order.map((ord) => (
          <OrderItem key={ord.id} order={ord}/>
      ))}
    </div>
  )
}
)


export default OrderList
