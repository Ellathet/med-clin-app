import { GetServerSideProps } from "next"
import { parseCookies } from 'nookies'
import { useState } from "react";

import { FaFileMedical, FaUserCircle } from 'react-icons/fa'

import { useContext, useEffect } from "react";
import SearchInput from "../components/SearchInput";

import { AuthContext } from '../contexts/AuthContext';
import { api } from "../services/api";

import styles from '../styles/Appointments.module.css'
import FunctionSearchInput from "../components/FunctionSearchInput";

export default function Home() {
 
  const [text, setText] = useState('')
  const [fun, setFun] = useState('')
  const [ peoples, setPeoples ] = useState({})

  useEffect(() => {

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

    return (
      <>
        <div className={styles.header}/>
          <div className={styles.container}>
            <div className={styles.containerHeader}>
               <SearchInput value={text} onChange={(search) => setText(search)}/>  
               <FunctionSearchInput value={fun} onChange={(fun) => setFun(fun)}/>         
            </div>
            { peoples.data && (
              <ul>
                {peoples.data.map((people) => (
                  <li key={people.ID}>
                    <div>
                      <h2>{people.NAME}</h2>
                      <span>{people.FUNCTION}</span>
                    </div>
                    <div>
                      <FaFileMedical/>
                      <FaUserCircle/>
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

/* export const getServerSideProps: GetServerSideProps = async (ctx) => {

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

} */