import { GetServerSideProps } from "next"
import { format } from 'date-fns'
import { useState } from "react";
import { parseCookies } from 'nookies';

import Router from 'next/router'

import { FaFileMedical, FaUserCircle } from 'react-icons/fa'
import { GrFormClose } from 'react-icons/gr'

import { useContext, useEffect } from "react";
import SearchInput from "../components/SearchInput";

import { AuthContext } from '../contexts/AuthContext';
import { api } from "../services/api";

import styles from '../styles/Home.module.css'
import FunctionSearchInput from "../components/FunctionSearchInput";
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

export default function Home(props) {
 
  const user  = props.user[0];
  const { setMedic, medic } = useContext(AuthContext)
  const [text, setText] = useState('')
  const [fun, setFun] = useState('')
  const [ peoples, setPeoples ] = useState<User | undefined>(undefined)
  const [ isUserInfos, setIsUserInfos] = useState(false)

  useEffect(() => {

    if( peoples === undefined) {
      api.get('/people/medic', {
        params: {
          search_function: fun,
        }
      }).then((response) => {
          setPeoples(response)
      })
    } 

    if (text || fun) {
        api.get('/people/medic', {
          params: {
            search_function: fun,
            search_name: text
          }
        }).then((response) => {
            setPeoples(response)
        })
      } 

  }, [text, fun])

  function UserInfos() {

    if(isUserInfos) {
      return (
        <div className={styles.modalBackground}>
          <GrFormClose onClick={() => setIsUserInfos(false)} className={styles.closeButton}/>
          <div className={styles.modalContainer}>
            <h2>Dados do Usuário</h2>
            <span>Id: <b>{user?.ID}</b></span> <br/>
            <span>Nome: <b>{user?.NAME}</b></span> <br/>
            <span>Data de Nascimento: <b>{user?.BIRTH}</b></span> <br/>
            <span>E-Mail: <b>{user?.EMAIL}</b></span> <br/>
            <span>RG: <b>{user?.RG}</b></span> <br/>
            <span>CPF: <b>{user?.CPF}</b></span> <br/> 
            <span>Tipo de registro: <b>{user?.TYPE === 'M' ? (<>Médico</>) : (<>Paciente</>) }</b> </span> <br/>
            {user?.TYPE === 'M' ? (
                <>
                      <span>Especialidade: <b>{user?.FUNCTION}</b></span> <br/>
                </>
            ) : null}
            <span>Usuário cadastrado em: <b>{user?.created_at}</b></span> <br/>
          </div>
        </div>
      )
    } else (null)

  }

  //Pagina que o paciente tem acesso

    if (user.TYPE === 'P') return (
      <>
        {UserInfos()}
        <div className={styles.header}/>
          <div className={styles.container}>
            <div className={styles.containerHeader}>
              <h2>Busque seu medico</h2>
              <div className={styles.searchHeader} >
                <SearchInput value={text} onChange={(search) => setText(search)}/>  
                <FunctionSearchInput value={fun} onChange={(fun) => setFun(fun)}/>     
              </div>
            </div>
            { peoples?.data && (
              <ul className={styles.userList}>
                {peoples?.data.map((people) => (
                  <li key={people.ID} >
                    <div>
                      <h2>{people.NAME}</h2>
                      <span>{people.FUNCTION}</span>
                    </div>
                    <div className={styles.userFunctions}>
                      <FaFileMedical className={styles.functionButtons} onClick={() => {setMedic(people); Router.push('/appointment') }}/>
                      <FaUserCircle className={styles.functionButtons} onClick={()=> {setIsUserInfos(true); setMedic(people)}}/>
                    </div>
                  </li>
                )
                )}
              </ul>
            )
            }
          </div>
      </>
    ); 
//Pagina que o médico tem acesso
    else if (user.TYPE === 'M') return (
      <>
      <div className={styles.header}/>
      <div className={styles.container}>

      </div>
      </>
    )
  }

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { ['medClin-token']: token} = parseCookies(ctx)
  const { ['medClin-user']: user} = parseCookies(ctx)

  if(!token) {
    return {
      redirect: {
        destination: '/login',
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