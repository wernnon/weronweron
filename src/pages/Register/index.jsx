import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {auth} from '../../firebaseConnection';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import './register.css'


function Register() {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const navigate = useNavigate();
    async function handleRegister(e){
      e.preventDefault();
      if(email !== '' && password !==''){
        await createUserWithEmailAndPassword(auth,email,password)
      .then(()=>{
        navigate('/admin',{replace:true})
      })
      .catch(()=>{
        console.log("Erro ao fazer login")
      })
    }
  }
    
    return (
      <div className='home-container'>
        <h1>Cadastre-se</h1>
        <span>Vamos criar sua conta.</span>
        <form className='form' onSubmit={handleRegister}>
          <input type="email" placeholder='seuemail@server.com'
          value={email} onChange={(e)=>setEmail(e.target.value)}/> <br/>
          <input type="password" placeholder='******'
          value={password}onChange={(e)=>setPassword(e.target.value)}/> <br/>
          <button type="submit">Cadastrar</button>
        </form>
        <Link className="button-Link" to={'/'}>
          Já possui uma conta? Faça login
        </Link>
      </div>
    )
  }
  
  export default Register;
  