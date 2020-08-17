/* eslint-disable react-hooks/exhaustive-deps */
import './search.css';
import Input from '../input/Input';
import React, { useState, useEffect } from 'react';

const Search = props => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const nameResultLeftOrder = props.orderLeft.filter(order => 
      order.client.toLowerCase().indexOf(searchTerm.toLowerCase()) === 0
    );
    const tableResultLeftOrder = props.orderLeft.filter(order => 
      order.table.toLowerCase().includes(searchTerm)
    );
    const nameResultRightOrder = props.orderRight.filter(order => 
      order.client.toLowerCase().indexOf(searchTerm.toLowerCase()) === 0
    );
    const tableResultRightOrder = props.orderRight.filter(order => 
      order.table.toLowerCase().includes(searchTerm)
    );

    nameResultLeftOrder.length !== 0 ? props.onChangeLeftOrder(nameResultLeftOrder) : props.onChangeLeftOrder(tableResultLeftOrder);
    nameResultRightOrder.length !== 0 ? props.onChangeRightOrder(nameResultRightOrder) : props.onChangeRightOrder(tableResultRightOrder);

  }, [searchTerm]);

  const handleChange = e => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className='search'>
      <label htmlFor='search' className='search-label'>Pesquisar: </label>
      <Input type='text' value={searchTerm} placeholder='Cliente ou mesa' onChange={handleChange} className='search-input'/>
    </div>
  )
}

export default Search;