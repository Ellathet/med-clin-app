
import { parseCookies } from "nookies";
import MedicIndex from "../components/MedicIndex";

export default function myAppointments(props) {
    const user = props.user;

    if(user.TYPE === 'P') {
        return (
            <div>

            </div>
        )
    }else {
        return (
            <MedicIndex user={user}/>
        )
    }

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