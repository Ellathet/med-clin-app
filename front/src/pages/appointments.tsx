import { GetServerSideProps } from "next"
import Router  from "next/router"
import { destroyCookie, parseCookies } from "nookies"
import { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import styles from '../styles/Appointment.module.css'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { differenceInDays, parseISO } from 'date-fns'

import * as yup from 'yup';
import { api } from "../services/api"
import { useState } from "react"
import { GrFormClose } from "react-icons/gr"

export default function Appointment(props) {

    const user = props.user;
    const [medic, setMedic] = useState(props.medic);
    const [ isConfirmModal, setIsConfirmModal ] = useState(false)

    useEffect(() => {
        if(!medic) {
            Router.push('/')
        }
    }, [medic])

    const schema = yup.object().shape({
        description: yup.string()
                        .max(32, "Você atingiu o limite de 32 caracteres"),
        scheduling: yup.date()
                        .nullable()
                        .required("Você precisa informar a data do seu Nascimento")
                        .test("yearsOld", "Você não pode marcar uma consulta ontem", (value) => {
                            return differenceInDays(new Date(), new Date(value)) < 1 ;
                        }),
    })

   const { register, handleSubmit,  formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { medic: medic?.NAME, patient: user.NAME }
    })

   function handleAppointment(data) {

    api.post("/appointment", {
        medic_id: medic.ID,
        patient_id: user.ID,
        medic_name: data.medic,
        patient_name: data.patient,
        scheduling: data.scheduling,
        description: data.description ? data.description : null,
    }).then((response) => {
     if(response.status === 200) {
      setIsConfirmModal(true)
      } 
    }).catch((error)=> {
      console.log(error)
    }) 

   }

   function resetMedicCookie () {
      destroyCookie(null, 'medClin-medic')
      setMedic(null)
   }

   function confirmModal() {
     if(isConfirmModal) {
       return (
        <div className={styles.modalBackground}>
          <GrFormClose onClick={() => {setIsConfirmModal(false); resetMedicCookie()}} className={styles.closeButton}/>
          <div className={styles.modalContainer}>
            <span>Sua consulta foi registrada!</span>
          <div className={styles.modalButtons}>
            <button onClick={()=> Router.push("/painel")}>Voltar a Pagina Inicial!</button>
          </div>
          </div>
        </div>
       )
     }else return null
   }

   return (
    <>
    {confirmModal()}
        <div className={styles.header}/>
        <div className={styles.container}>
            <h2>Agendamento de consulta</h2>
            <h3>Consulta de {medic?.FUNCTION}</h3>
            <form action="" id="appointment" className={styles.form}onSubmit={handleSubmit(handleAppointment)}>
                <div className={styles.inputContainer}>
                    <label htmlFor="description"> Descrição</label>
                    <input type="text" id="description" {...register('description')}/>
                    {errors.description && <span>{errors.description?.message}</span>}
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor="">Médico</label>
                    <input type="text" id="medic" disabled defaultValue={medic?.NAME}/>
                    {errors.medic && <span>{errors.medic?.message}</span>}
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor="">Paciente</label>
                    <input type="text" id="patient" defaultValue={user.NAME} disabled/>
                    {errors.patient && <span>{errors.patient?.message}</span>}
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor="">Data da Consulta*</label>
                    <input type="date" id="scheduling" {...register('scheduling')}/>
                    {errors.scheduling && <span>{errors.scheduling?.message}</span>}
                </div>
                <div className={styles.buttonContainer}>
                  <button className={styles.functionButton} onClick={() => {setIsConfirmModal(true)}} type="submit">Agendar</button>
                  <button className={`${styles.functionButton} ${styles.cancelButton}`} onClick={()=> {resetMedicCookie ()}} type="button">Cancelar</button>
                </div>
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
          user: JSON.parse(user),
          medic: JSON.parse(medic)
      }
    }
  } 