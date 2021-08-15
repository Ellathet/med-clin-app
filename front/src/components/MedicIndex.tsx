import { useEffect, useState } from 'react'
import { api } from '../services/api'
import styles from '../styles/Painel.module.css'

export default function PatientIndex(data) {

    const user = data.user

    const [ appointments, setAppointments ] = useState()

    console.log(appointments)

    useEffect(() => {
        api.get('/appointment/medic', {
            params: {
              search_id: user.ID,
            }
          }).then((response) => {
            console.log(response.data)
            setAppointments(response.data)
          })
    }, [])

    return (
        <>
        <div className={styles.header}/>
        <div className={styles.container}>
          <h2>Suas consultas agendadas</h2>
          <ul>
          {/* {appointments.map((appointment) => {
            return (
              <>
                <li key={appointment.ID}>

                </li>
              </>
            )
          })} */}
          </ul>
        </div>
        </>
    )
}