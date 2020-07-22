import React, { useState } from "react";
import './register.css';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import firebase from '../../configure-firebase';

export default function Register() {
  //ter um tipo de useState para cada tipo de informação que iremos armazenar
  //assim ao salvar as informações, salvaremos uma por fez, ficando mais fácil de entender
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [jobTitle, setJoTitle] = useState('');
  let [showErroNameEmpty, setErrorNameEmpty] = useState(false);
  let [showErroEmailInvalid, setErrorEmailInvalid] = useState(false);
  let [showErroPassword, setErrorPassword] = useState(false);

  //quando der tudo certo vai guardar as informações do usuário lá no firebase, e quando não ser, vai pegar aquele errinhoq ue ao próprio firebase retorna e verificar
  //se houver algum erro, irá executar a função e mostrar a mensagem personalizada que está abaixo de cada input
  function validForm() {
    setErrorNameEmpty(false);
    setErrorPassword(false);
    setErrorEmailInvalid(false);

    let isValid = true;
    if (!username) {
      setErrorNameEmpty(true);
      isValid = false;
    }
    if (!password) {
      setErrorPassword(true);
      isValid = false;
    }
    if (!email) {
      setErrorEmailInvalid("email obrigatório");
      isValid = false;
    }
    if (!(/\S+@\S+\.\S+/.test(email))) {
      setErrorEmailInvalid('Formato de e-mail inválido');
    }
    return isValid;
  }

  const creatUser = (e) => {
    e.preventDefault();
    const isValid = validForm();
    if (isValid) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          firebase
            .firestore()
            .collection('users').add({
              username,
              email,
              jobTitle,
              userUid: firebase.auth().currentUser.uid,
            });
        }).catch((err) => {
          alert(err.message)
        })
    };

  }

  return (
    <form className='form-register modal-main overlay'>
      <div className='inputs-text'>
        <Input type='text' name='username' placeholder='nome' id='name-login' onChange={(e) => setUsername(e.target.value)} />
        {showErroNameEmpty && (
          <p>Por favor, preencha seu nome</p>
        )}
        <Input type='email' required name='email' placeholder='email@exemple.com' id='email-register' onChange={(e) => setEmail(e.target.value)} />
        {showErroEmailInvalid && (
          <p>{showErroEmailInvalid}</p>
        )}
        <Input type='password' name='password' placeholder='senha' id='password-register' onChange={(e) => setPassword(e.target.value)} />
        {showErroPassword && (
          <p>Sua senha deve ter mais de 6 dígitos.</p>
        )}
      </div>
      <div className='select-role'>
        <label htmlFor='kitchen'>COZINHA</label>
        <Input type='radio' className='radio-button' name='jobTitle' id='kitchen' value='kitchen' onChange={(e) => setJoTitle(e.target.value)} />
        <label htmlFor='hall'>SALÃO</label>
        <Input type='radio' className='radio-button' name='jobTitle' id='hall' value='hall' onChange={(e) => setJoTitle(e.target.value)} />
      </div>
      <div className='btn-confirms'>
        <Button id='btn-cancel' className='button' name='Cancelar' />
        <Button id='btn-confirm' className='button' name='Confirmar' handleClick={creatUser} />
      </div>
    </form>
  )
}