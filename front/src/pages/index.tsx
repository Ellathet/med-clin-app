import { RiLogoutBoxFill } from 'react-icons/ri'
import { FaFileMedical, FaBookMedical } from 'react-icons/fa'
import styles from '../styles/Home.module.css'
import Router from 'next/router'
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'
import { parseCookies } from 'nookies'

export default function Home(props) {

    const user = props.user

    const { singOut } = useContext(AuthContext)

    return (
        <div className={styles.container}>
            <h1>Menu</h1>
            <div className={styles.main}>
                <div className={styles.menuButton} onClick={() => Router.push('/myappointments')}>
                    <FaBookMedical className={styles.icons}/>
                    <span>Suas Consultas</span>
                </div>
                {user.TYPE === "P" ? (                
                <div className={styles.menuButton} onClick={() => {Router.push('/painel')}}>
                    <FaFileMedical className={styles.icons}/>
                    <span>Marcar Consulta</span>
                </div>
                ) : (null)}

                <div className={styles.menuButton} onClick={() => singOut()}>
                    <RiLogoutBoxFill className={styles.icons}/>
                    <span>Sair</span>
                </div>
            </div>
        </div>
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
  
    return {
      props: {
        user: JSON.parse(user)
      }
    }
  
  }