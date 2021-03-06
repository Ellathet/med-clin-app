import { AuthContext } from '../contexts/AuthContext';
import styles from '../styles/Login.module.css'

import { GetServerSideProps } from "next";
import { useContext, useState } from 'react';

import { api } from '../services/api';

import { parseCookies } from 'nookies';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import  Router  from 'next/router';
interface FormData { 
  email: string,
  password: string,
}

export default function Login() {

  const [email, setEmail] = useState('')
  const { signIn } = useContext(AuthContext);

//Validação de campos com o yup e React-Form
  const schema = yup.object().shape({
    email: yup.string()
              .email('É preciso inserir um E-mail valido')
              .required('É preciso inserir o E-mail')
               .test('emailNotFound', 'Não existe nenhum usuário com esse E-mail', (value) => {
                
                setEmail(value)
                
                return new Promise((res, rej) => {
                  api.get(`/login`, {
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
                    api.get(`/login`, {
                      auth: {
                          username: email,
                          password: value
                      },
                  }).then((response) => {

                      if(response.status === 401 ) res(false)
                      else res(true)

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
        await signIn(data)
  }

  return(
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
              <div className={`${styles.registerButton} ${styles.functionButton}`} onClick={()=> Router.push('/register')}>
                Registre-se
              </div>
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

  //Não é possível importar o user, porque o usuário não foi logado, é possível fazer um &&, porém não é necessário

  await new Promise((resolve, reject) => {
    setTimeout(resolve, 500)
  }) 

  const { ['medClin-token']: token} = parseCookies(ctx)

  if(token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {
    }
  }

}  