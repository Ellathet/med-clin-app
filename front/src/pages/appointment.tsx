import { GetServerSideProps } from "next"
import Router  from "next/router"
import { parseCookies } from "nookies"
import { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import styles from '../styles/Appointment.module.css'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { differenceInYears } from 'date-fns'

import * as yup from 'yup';

export default function Appointment(props) {

    const user = props.user[0];

    const { medic } = useContext(AuthContext)

    useEffect(() => {
        if(!medic) {
            Router.push('/')
        }
    }, [])

    const schema = yup.object().shape({
        description: yup.string()
                        .required()
                        .max(32),
        medic: yup.string()
                  .required(),
        patient: yup.string(), 
        scheduling: yup.date()
                        .required("Você precisa informar a data do seu Nascimento")
                        .test("yearsOld", "Você deve ter mais de 18 anos", (value) => {
                            return differenceInYears(new Date(), new Date(value)) >= 18;
                        }),
    })

   const { register, handleSubmit,  formState: { errors } } = useForm({
    resolver: yupResolver(schema)
    })

   function handleAppointment(data) {

   }

   return (
    <>
        <div className={styles.header}/>
        <div className={styles.container}>
            <h2>Agendamento de consultas</h2>
            <form action="" id="appointment" onSubmit={handleSubmit(handleAppointment)}>
            <h3>Consulta de {medic?.FUNCTION}</h3>
                <div>
                    <label htmlFor="description"> Descrição</label>
                    <input type="text" id="description" {...register('description')}/>
                </div>
                <div>
                    <label htmlFor="">Médico</label>
                    <input type="text" id="medic" disabled value={medic?.NAME} {...register('medic')}/>
                </div>
                <div>
                    <label htmlFor="">Paciente</label>
                    <input type="text" id="patient" value={user.NAME} disabled {...register('patient')}/>
                </div>
                <div>
                    <label htmlFor="">Data da Consulta</label>
                    <input type="date" id="scheduling" {...register('scheduling')}/>
                </div>
                <button type="submit">Agendar</button>
            </form>
        </div>
    </>
   )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { ['medClin-user']: user} =  await parseCookies(ctx)
    const { ['medClin-medic']: medic} = await parseCookies(ctx)
    const { ['medClin-token']: token} = await parseCookies(ctx)

    if(!token) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        }
      }
    }

    if(medic === "null") {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      }
    }
  
    return {
      props: {
          user: JSON.parse(user)
      }
    }
  } 