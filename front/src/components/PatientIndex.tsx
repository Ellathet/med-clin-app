import styles from '../styles/Painel.module.css'

import FunctionSearchInput from "../components/FunctionSearchInput";

import { useContext, useEffect, useState } from "react";
import SearchInput from "../components/SearchInput";

import { AuthContext } from '../contexts/AuthContext';

import Router from 'next/router'

import { FaFileMedical, FaUserCircle } from 'react-icons/fa'
import { api } from "../services/api";
import { GrFormClose } from "react-icons/gr";

export default function MedicIndex(data) {

const { setMedic } = useContext(AuthContext)
const [ text, setText ] = useState('')
const [ fun, setFun ] = useState('')
const [ peoples, setPeoples ] = useState<User | undefined>(undefined)
const [ isUserInfos, setIsUserInfos] = useState(false)

const user = data.user

    useEffect(() => {
        if(user.TYPE === 'P') {
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
        }
       
       }, [text, fun])

//Modal com as informações do usuário
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

    return (
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
    )
}