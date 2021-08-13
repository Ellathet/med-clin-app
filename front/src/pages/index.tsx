import { AuthContext } from '../contexts/AuthContext';
import styles from '../styles/Login.module.css'

import { GetServerSideProps } from "next";
import { useContext, useState } from 'react';

import axios from 'axios';

import { parseCookies } from 'nookies';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import  Router  from 'next/router';
interface FormData { 
  email: string,
  password: string,
}

const url = "http://localhost:3333"

export default function Home() {

  const [email, setEmail] = useState('')
  const { signIn } = useContext(AuthContext);

  const schema = yup.object().shape({
    email: yup.string()
              .email('É preciso inserir um E-mail valido')
              .required('É preciso inserir o E-mail')
               .test('emailNotFound', 'Não existe nenhum usuário com esse E-mail', (value) => {
                
                setEmail(value)
                
                return new Promise((res, rej) => {
                  axios.get(`${url}/login`, {
                    auth: {
                        username: value 
                    },
                }).catch((error)=>{
        
                    if(error.response.status === 404) res(false)
                    else res(true)
                })
                })
              })  ,
    password: yup.string()
                 .required('É preciso inserir a senha')
                 .min(7, 'Sua senha deve conter no mínimo 8 caracteres')
                 .test(' ', 'Senha incorreta', (value) => {
                  return new Promise((res, rej) => {
                    axios.get(`${url}/login`, {
                      auth: {
                          username: email,
                          password: value
                      },
                  }).catch((error)=>{
          
                      if(error.response.status === 401) res(false)
                      else res(true)
                  })
                  })
                }) ,
  })

  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema)
  })

  async function handleSignIn(data : FormData ) {

      try {
        await signIn(data)
      } catch (error) {
        console.log(error)
      }
  }

  return (
    <div>
      <div className={styles.header}></div>
      <div className={styles.container}>
        <form className={styles.form} id="login" onSubmit={handleSubmit(handleSignIn)}>
          <h1>Entrar</h1>
            <div className={styles.inputContainer}>
              <label htmlFor="email"> Email </label> 
              <input type="email" id="email" {...register('email')}/>
              {errors.email && <span>{errors.email?.message}</span>}
            </div>
            <div className={styles.inputContainer}>    
              <label htmlFor="password"> Senha </label>
              <input type="password" id="password" {...register('password')}/>  
              {errors.password && <span>{errors.password?.message}</span>}
            </div>
            <div className={styles.buttons}>
              <button className={styles.register} onClick={()=> Router.push('/register')}>
                Registre-se
              </button>
              <button type="submit" form="login" className={styles.enter}>
                Entrar
              </button>
            </div>
        </form>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { ['medClin-token']: token} = parseCookies(ctx)

  if(token) {
    return {
      redirect: {
        destination: '/appointments',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }

}