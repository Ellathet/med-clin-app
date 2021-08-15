import { GetServerSideProps } from "next"
import { parseCookies } from 'nookies';

import { api } from "../services/api";

import PatientIndex from "../components/PatientIndex";
interface User {
  ID: number;
  NAME: string;
  FUNCTION: string | null;
  TYPE: string;
  EMAIL: string;
  CPF: string;
  RG: string;
  BIRTH: string | null;
  PASSWORD: string;
  created_at:string;
  update_at:string;
}

export default function painel(props) {
 
  const user = props.user

//Pagina que o paciente tem acesso
    if (user.TYPE === 'P') return (
      <PatientIndex user={user}/>
    ); 

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

  if(JSON.parse(user).TYPE === 'M') {
    return {
      redirect: {
        destination: '/myappointments',
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