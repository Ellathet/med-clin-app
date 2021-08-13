import { GetServerSideProps } from "next";
import { useContext, useState } from 'react';

import InputMask from 'react-input-mask'

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';

import { parseCookies } from 'nookies'
import { GrFormNextLink } from 'react-icons/gr'
import { parseISO, differenceInYears} from 'date-fns';
import axios from 'axios';

import { AuthContext } from '../contexts/AuthContext';
import styles from '../styles/Register.module.css'
import options  from '../functionoptions'

interface optionsData {
  value: string;
  label: string;
}
interface FormData { 
  name: string;
  email: string,
  emailConfirm: string,
  password: string,
  passwordConfirm: string,
  birthDate: string,
  rg: string,
  cpf: string,
  confirmPassword: string,
  medicFunction: string,
}

const url = "http://localhost:3333"

export default function Register() {


  const { signUp, user} = useContext(AuthContext);

  console.log(user)

  const schema = yup.object().shape({
    name: yup.string()
             .required("Você precisa informar um nome")
             .matches(/^[A-Za-z ]*$/, 'Insira um nome valido'),
    birthDate: yup.date()
                  .required("Você precisa informar a data do seu Nascimento")
                  .test("yearsOld", "Você deve ter mais de 18 anos", (value) => {
                      return differenceInYears(new Date(), new Date(value)) >= 18;
                  }),
    email: yup.string()
              .email("Insira um e-mail valido")
              .required("Você precisa inserir um e-mail")
              .test('emailNotFound', 'Esse e-mail já está cadastrado', (value) => {              
                
                return new Promise((res, rej) => {
                  axios.get(`${url}/login`, {
                    auth: {
                        username: value 
                    },
                }).catch((error)=>{
        
                    if(error.response.status !== 404) res(false)
                    else res(true)
                })
                })
              }),
    emailConfirm: yup.string()
                     .oneOf([yup.ref("email"), null], "Os e-mails não batem"),
    rg: yup.string()
           .required("Você precisa informar um RG"),
    cpf: yup.string()
            .required("Você precisa informa um CPF"),
    password: yup.string()
                 .required("Você precisa informar uma senha")
                 .min(7, "Sua senha deve conter pelo menos 7 caracteres"),
    confirmPassword: yup.string()
                        .oneOf([yup.ref("password"), null], "As senhas não batem"),
    medicFunction: yup.string(),
  })


  const { register, handleSubmit,  formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const [isForm, setIsForm] = useState(false)
  const toggle = () =>  setIsForm(!isForm)

  async function handleSignUp(data : FormData) {

    const {name, birthDate, email, rg, cpf, password, medicFunction} = data

      const registerData = {

        name: name,
        birthDate: parseISO(birthDate),
        email: email,
        rg: rg,
        cpf: cpf,
        password: password,
        medicFunction: medicFunction,
        type: isForm ? 'M' : 'P'  

      }

      signUp(registerData)
    }

  function formHandler() {

    if(isForm === true ) {
      return (
        <>
        <div className={`${styles.inputContainer} ${styles.buttonInputContainer}`}>
          <label htmlFor="">Qual sua especialidade?</label>
          <select {...register('medicFunction')}>
            {options.map((option, index) => {
              return (
                <option value={option.value}>{option.label}</option>
              )
            })}
          </select>
          {errors.medicFunction && <span>{errors.medicFunction?.message}</span>}

        </div>
        <div className={styles.buttonNext}>
         <button className={styles.next} type="submit" form="register">
            Proximo <GrFormNextLink/>
         </button>
        </div>
        </>
      )
    }

  }

  return (
    <div>
      <div className={styles.header}></div>
      <div className={styles.container}>
        <form className={styles.form} id="register" onSubmit={handleSubmit(handleSignUp)}>
          <h1>Dados Pessoais</h1>
          <div className={styles.dualInputContainer}>
            <div className={styles.inputContainer}>
              <label htmlFor="name">Nome Completo</label>
              <input type="text" id="name" {...register('name')}/>
              {errors.name && <span>{errors.name?.message}</span>}
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="date"> Dia do Aniversario</label>
              <input type="date" id="date" {...register('birthDate')}/>
              {errors.date && <span>{errors.date?.message}</span>}
            </div>
          </div>
          <div className={styles.dualInputContainer}>
            <div className={styles.inputContainer}>
              <label htmlFor="email">E-mail</label>
              <input type="email" id="email" {...register('email')}/>
              {errors.email && <span>{errors.email?.message}</span>}
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="emailConfirm"> Confirmar E-mail</label>
              <input type="email" id="emailConfirm" {...register('emailConfirm')}/>
              {errors.emailConfirm && <span>{errors.emailConfirm?.message}</span>}
            </div>
          </div>
          <div className={styles.dualInputContainer}>
            <div className={styles.inputContainer}>
              <label htmlFor="rg">RG</label>
              <InputMask type="text" id="rg" mask="99.999.999-9" {...register('rg')}/>
              {errors.rg && <span>{errors.rg?.message}</span>}
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="cpf">CPF</label>
              <InputMask type="text" id="cpf" mask="999.999.999-99" {...register('cpf')}/>
              {errors.cpf && <span>{errors.cpf?.message}</span>}
            </div>
          </div>
          <div className={styles.dualInputContainer}>
              <div className={styles.inputContainer}>
                <label htmlFor="password" >Senha *</label>
                <input type="password" id="password" minLength={8} {...register('password')}/>
                {errors.password && <span>{errors.password?.message}</span>}
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="confirmPassword">Confirmar Senha *</label>
                <input type="password" id="password" {...register('confirmPassword')}/>
                {errors.confirmPassword && <span>{errors.confirmPassword?.message}</span>}
              </div>
            </div>
          <div>
            <div className={`${styles.inputContainer} ${styles.buttonInputContainer}`}>
              <label htmlFor="type">O que você procura?</label>
                <div className={styles.buttons}>
                  <div className={`${styles.medicButton} ${styles.functionButton}`} onClick={toggle}>
                    Sou médico
                  </div>
                  <button className={styles.functionButton} type="submit" form="register" onClick={() => setIsForm(false)}>
                    Quero me Consultar
                  </button>
                </div>
            </div>
          </div>
            <div>
              {formHandler()}
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