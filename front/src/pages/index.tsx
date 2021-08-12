import { GetServerSideProps } from "next";
import Router from "next/router"
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../contexts/AuthContext';
import styles from '../styles/Login.module.css'
import { parseCookies } from 'nookies'


interface FormData { 
  email: string,
  password: string,
}

export default function Home() {

  const [ emptyEmailColor, setEmptyEmailColor ] = useState('')
  const [ emptyPasswordColor, setEmptyPasswordColor ] = useState('')

  const { signIn, isAuthenticated} = useContext(AuthContext);

  const { register, handleSubmit } = useForm()

  async function handleSignIn(data : FormData ) {

    setEmptyEmailColor("")
    setEmptyPasswordColor("")

    if(data.email === "" && data.password === "" ) {
      setEmptyEmailColor('#F9BABA')
      setEmptyPasswordColor('#F9BABA')
    } else if (data.email === "") {
      setEmptyEmailColor('#F9BABA')
    } else if (data.password === "") {
      setEmptyPasswordColor('#F9BABA')
    } else {
      try {
        await signIn(data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div>
        <style>
          {`
            #email { background-color: ${emptyEmailColor};}
            #password { background-color: ${emptyPasswordColor};}
          `}
        </style>
      <div className={styles.header}></div>
      <div className={styles.container}>
        <form className={styles.form} id="login" onSubmit={handleSubmit(handleSignIn)}>
          <h1>Entrar</h1>
            <div className={styles.inputContainer}>
              <label htmlFor="email"> Email</label> 
              <input type="email" id="email" {...register('email')}/>
            </div>
            <div className={styles.inputContainer}>    
              <label htmlFor="password"> Senha </label>
              <input type="password" id="password" {...register('password')}/>  
            </div>
            <div className={styles.buttons}>
              <button className={styles.register}>
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
        destination: '/Appointments',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }

}