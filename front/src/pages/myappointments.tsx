
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import MedicIndex from "../components/MedicIndex";
import PatientIndex from "../components/PatientIndex"
import { api } from "../services/api";
import styles from '../styles/Painel.module.css'

export default function myAppointments(props) {
    const user = props.user;

    return (
      <>
        <div className={styles.header}/>
          <div className={styles.container}>
            <h2>Suas consultas agendadas</h2>
            {user.TYPE === "M" ? (
              <>
                <MedicIndex user={user} appointments = {props.appointments}/>
              </>
            ) : (
              <>
                <PatientIndex user={user} appointments = {props.appointments}/>
              </>
            )}
        </div>
      </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    //Busca o token no Cookies
    const { ['medClin-token']: token} = parseCookies(ctx)
    //Busca os dados do user no Cookies
    const { ['medClin-user']: user} = parseCookies(ctx)

    if(!token) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        }
      }
    }

    let appointments 

    await api.get('/appointment/medic', {
            params: {
              search_id: JSON.parse(user).ID,
              search_param: JSON.parse(user).TYPE,
            }
          }).then((response) => {
            appointments = response.data
          })

    await new Promise((resolve, reject) => {
        setTimeout(resolve, 500)
      }) 
    
    return {
      props: {
        appointments: appointments,
        user: JSON.parse(user)
      }
    }
  
  }
