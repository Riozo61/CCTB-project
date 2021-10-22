import { Container, Typography } from '@mui/material';
import React from 'react';

const OrderPage = () => {
  const description =[
    {id: 1, name: 'Заявка 1', _material: [
      {id: 1, nameMat: 'Гвозди', quantity: 10},
      {id: 2, nameMat: 'Цемент', quantity: 200},
      {id: 3, nameMat: 'Молоток', quantity: 1},
    ]},
    {id: 2, name: 'Заявка 2', _material: [
      {id: 1, nameMat: 'Кирпич', quantity: 10},
      {id: 2, nameMat: 'Краска', quantity: 10},
      {id: 3, nameMat: 'Обои', quantity: 200},
      {id: 4, nameMat: 'Кисть малярная', quantity: 2},
  ]}

  ]
  return (
    <Container>
      <Typography>
        <div>
          {description.map(info =>
          <Typography key={info.id}>
            {info.name}: {info._material}
          </Typography>
          )}
        </div>
      </Typography>
    </Container>
  )
}

export default OrderPage

