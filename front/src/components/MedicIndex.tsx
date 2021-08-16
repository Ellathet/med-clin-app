import { format, parseISO } from 'date-fns'
import { useEffect, useState } from 'react'
import { api } from '../services/api'
import { MdCancel } from 'react-icons/md'
import { AiFillClockCircle } from 'react-icons/ai'

import styles from '../styles/components/Indexes.module.css'
import cancelAppointment from '../functions/cancelAppointment'

export default function MedicIndex(data) {

    const user = data.user
    const appointments = data.appointments

    return (
        <>
          <ul className={styles.userList} >
          { appointments.length <= 0 ? (
            <>
              <h2>Você não tem nenhuma consulta agendada</h2>
            </>
          ) : (
            <>
                { appointments.map((appointment) => {
                  return (
                    <>
                      <li key={appointment.ID}>
                        <div>
                          <h2 className={styles.Title}>Consulta de {appointment.SPECIALIST}</h2> 
                          <div className={styles.InputsContainer}>
                            <div className={styles.InputContainer}>
                              <label htmlFor="medicName">Paciente</label>
                              <input type="text" name="medicName" disabled defaultValue={appointment.PATIENT_NAME}/>
                            </div>
                            <div className={styles.InputContainer}>
                              <label htmlFor="date">Dia Agendado</label>
                              <input type="text" name="date" disabled defaultValue={format(parseISO(appointment.SCHEDULING),'dd/MM/yyyy')}/>
                            </div>
                          </div>    
                        </div>
                        <div className={styles.FunctionsMenu}>
                          <MdCancel className={styles.CancelButton} onClick={()=> cancelAppointment(appointment.ID)}/>
                        </div>
                      </li>
                    </>
                  )
                })}
            </>
          )}
          </ul>
        </>
    )
}