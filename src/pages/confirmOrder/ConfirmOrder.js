import './confirmOrder.css';
import { Link } from 'react-router-dom';
import Button from '../../components/button/Button';
import React from 'react';

export default function confirmOrder() {
  return (
    <div className='confirm-request'>
      <div>
        <p>PEDIDO REGISTRADO</p>
      </div>
      <div className='btn-confirms'>
        <Button>
          <Link to="/Hall" className='btn-order'>Próximo Pedido</Link>
        </Button>
      </div>
    </div>
  );
}