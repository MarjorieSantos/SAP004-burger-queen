import React, { useState } from 'react';
import Img from '../imagem/Img';
import Button from '../button/Button';
import ModalHamburger from '../modalHamburger/Modal';
import './menu.css';
import firebase from '../../configure-firebase';

const Menu = () => {
  const [menuAllDay, setMenuAllDay] = useState(null);
  const [menuBreakfast, setMenuBreakfast] = useState(null);
  const [optionBurger, setOptionBurger] = useState(false);
  const [currentMenu, setCurrentMenu] = useState('allDay');
  const [orders, setOrdens] = useState([]);

  const breakfast = (e) => {
    e.preventDefault()
    setCurrentMenu('breakfast')
    firebase
      .firestore()
      .collection('breakfast')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => { setMenuBreakfast(doc.data()) });
      });
  };

  const allDay = (e) => {
    e.preventDefault();
    setCurrentMenu('allDay')
    firebase
      .firestore()
      .collection('allday')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => { setMenuAllDay(doc.data()) });
      });
  };

  const showModal = (e) => {
    e.preventDefault();
    setOptionBurger(!optionBurger);
  }
  const getOrders = (name) => {
    orders === name ? setOrdens() : setOrdens([...orders] + name);
  };

  return (
    <section className='menu'>
      <div className='div-menu'>
        <div className='buttons-options-menu'>
          <Button name='Matinal' className='option-menu-food' handleClick={breakfast} />
          <Button name='Almoço/Janta' className='option-menu-food' handleClick={allDay} />
        </div>
        <div className='menu-principal bg-color'>
          <div className='bg-color'>
            {currentMenu === 'allDay' &&
              <div className='border-menu'>
                {menuAllDay && menuAllDay.burger.map(item => (
                  <div className='divs-option-menu' key={item.name}>
                    <div className='only-option-menu' onClick={() => getOrders(item.name)}>
                      <Img src={item.img} alt={item.alt} />
                      <p>{item.name}</p>
                      <p>R$ {item.price}</p>
                    </div>
                  </div>
                ))}
                {menuAllDay && menuAllDay.startes.map(item => (
                  <div className='divs-option-menu' key={item.name}>
                    <div className='only-option-menu' onClick={() => { getOrders(item.name) }}>
                      <Img src={item.img} alt={item.alt} />
                      <p>{item.name}</p>
                      <p>R$ {item.price}</p>
                    </div>
                  </div>
                ))}
                {menuAllDay && menuAllDay.drinks.map(item => (
                  <div className='divs-option-menu' key={item.name}>
                    <div className='only-option-menu' onClick={() => { getOrders(item.name) }}>
                      <Img src={item.img} alt={item.alt} />
                      <p>{item.name}</p>
                      <p>R$ {item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            }
            {currentMenu === 'breakfast' &&
              <div className='border-menu'>
                {menuBreakfast && menuBreakfast.grilled.map(item => (
                  <div className='divs-option-menu' key={item.name}>
                    <div className='only-option-menu' onClick={() => { getOrders(item.name) }}>
                      <Img src={item.img} alt={item.alt} />
                      <p>{item.name}</p>
                      <p>R$ {item.price}</p>
                    </div>
                  </div>
                ))}
                {menuBreakfast && menuBreakfast.drinks.map(item => (
                  <div className='divs-option-menu' key={item.name}>
                    <div className='only-option-menu' onClick={() => { getOrders(item.name) }}>
                      <Img src={item.img} alt={item.alt} />
                      <p>{item.name}</p>
                      <p>R$ {item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            }
          </div>
        </div>
      </div>
      <div className='requests bg-color'>
        <div className='requests-quantity'>
          <p>PEDIDOS</p>
          <div className='orders'><p>{orders}</p></div>
        </div>
        <div className='total'>
          <span>Total: </span>
        </div>
        <Button name='PEDIR' />
      </div>
      <ModalHamburger show={optionBurger} closeModal={((e) => e, showModal)} />
    </section>
  );
};

export default Menu;