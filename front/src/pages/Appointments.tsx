import { GetServerSideProps } from "next"
import { parseCookies } from 'nookies'
import { useContext, useEffect } from "react";

import { AuthContext } from '../contexts/AuthContext';
import { api } from "../services/api";

import styles from '../styles/Appointments.module.css'

export default function Appointments() {
 
  const { user } = useContext(AuthContext);

  async function medicSearch(fun : string) {
    api.post(`/people/medic`, {
      fun: fun
  }).then((response) => {
    return response.data
  }).catch((error) => {
    console.log(error)
  })
}

medicSearch("all")
    return (
      <>
        <div className={styles.header}/>
        <div className={styles.container}>
          { user?.TYPE == "M" ? (
            <div>
              {user?.NAME}
            </div>
          ) : ( 
            <div>
            </div>
          )}           
        </div>
      </>
    )
  }

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { ['medClin-token']: token} = parseCookies(ctx)

  if(!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }

}