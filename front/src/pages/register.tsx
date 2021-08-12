import { GetServerSideProps } from "next";
import { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { AuthContext } from '../contexts/AuthContext';
import styles from '../styles/Register.module.css'
import { parseCookies } from 'nookies'
import { GrFormNextLink } from 'react-icons/gr'
import { parseISO, isBefore, isAfter} from 'date-fns';
import InputMask from 'react-input-mask'
import Select from 'react-select'
import options from '../functionoptions'

interface FormData { 
  name: string;
  email: string,
  emailConfirm: string,
  password: string,
  passwordConfirm: string,
}

export default function Register() {

  const [ emptyEmailColor, setEmptyEmailColor ] = useState('')
  const [ emptyPasswordColor, setEmptyPasswordColor ] = useState('')

  const { signIn, isAuthenticated} = useContext(AuthContext);

  const { register, handleSubmit, control } = useForm()

  const [isForm, setIsForm] = useState(false)
  const toggle = () =>  setIsForm(!isForm)

  const [error, setError ] = useState('')

  async function handleSignIn(data : FormData) {

    const {name, birthDate, email, emailConfirm, rg, cpf, password, confirmPassword} = data

    console.log(name, birthDate, email, emailConfirm, rg, cpf, password, confirmPassword)

    const bDate = parseISO(birthDate)

    function I8years(years) {
      var date = new Date(); 
      date.setFullYear(date.getFullYear() + years);
      return date;    
  }

    if(name.length < 3) {
      setError('Por favor preencha o campo nome corretamente')
    } else if(isBefore(bDate,I8years(18)) === false) {
      setError('Você precisa ter mais de 18 anos')
    } else if( email.length < 1 || email !== emailConfirm) {
      setError('Os E-mails não batem')
    } else if ( rg > 12 || rg < 9) {
      setError('RG não é valido')
    } else if (cpf > 11 || cpf < 11) {
      setError('CPF não é valido')
    } else if (password !== confirmPassword) {
      setError('Senhas não conferem')
    } else {
      setError('')
      console.log('Sucess')
    }

    console.log(data)

  }

  const colourStyles = {
    control: styles => ({
      ...styles, 
      backgroundColor: '#C8E4F5', 
      color: '#4D4D4D', 
      borderRadius: '0.5rem', 
      border: 'none'}), 
  }

  function formHandler() {

    if(isForm === true ) {
      return (
        <>
        <div className={`${styles.inputContainer} ${styles.buttonInputContainer}`}>
          <label htmlFor="">Qual sua especialidade?</label>

        <Controller 
                   control={control}
                   defaultValue={null}
                   name="medicFunction"
                   render={({ onChange, value, name, ref }) => (
                       <Select
                           inputRef={ref}
                           options={options}
                           value={options.find(c => c.value === value)}
                           onChange={val => onChange(val.value)}
                           styles={colourStyles}
                       />
                   )}
        /> 

        </div>
        <div className={styles.buttons}>
         <button className={styles.enter} type="submit" form="register">
            Proximo <GrFormNextLink/>
         </button>
        </div>
        </>
      )
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
        <form className={styles.form} id="register" onSubmit={handleSubmit(handleSignIn)}>
          <h1>Dados Pessoais</h1>
          <div className={styles.dualInputContainer}>
            <div className={styles.inputContainer}>
              <label htmlFor="name">Nome Completo</label>
              <input type="text" id="name" {...register('name')}/>
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="date"> Dia do Aniversario</label>
              <input type="date" id="date" {...register('birthDate')}/>
            </div>
          </div>
          <div className={styles.dualInputContainer}>
            <div className={styles.inputContainer}>
              <label htmlFor="email">E-mail</label>
              <input type="email" id="email" {...register('email')}/>
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="emailConfirm"> Confirmar E-mail</label>
              <input type="email" id="emailConfirm" {...register('emailConfirm')}/>
            </div>
          </div>
          <div className={styles.dualInputContainer}>
            <div className={styles.inputContainer}>
              <label htmlFor="rg">RG</label>
              <InputMask type="text" id="rg" mask="99.999.999-9" {...register('rg')}/>
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="cpf">CPF</label>
              <InputMask type="text" id="cpf" mask="999.999.999-99" {...register('cpf')}/>
            </div>
          </div>
          <div className={styles.dualInputContainer}>
              <div className={styles.inputContainer}>
                <label htmlFor="password" >Senha *</label>
                <input type="password" id="password" minLength={8} {...register('password')}/>
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="confirmPassword">Confirmar Senha *</label>
                <input type="password" id="password" {...register('confirmPassword')}/>
              </div>
            </div>
          <div>
            <div className={`${styles.inputContainer} ${styles.buttonInputContainer}`}>
              <label htmlFor="type">O que você procura?</label>
                <div className={styles.buttons}>
                  <button className={styles.functionButton} onClick={toggle}>
                    Sou médico
                  </button>
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

/* export const getServerSideProps: GetServerSideProps = async (ctx) => {

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

} */