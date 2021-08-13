import { GetServerSideProps } from "next"
import { parseCookies } from 'nookies'
import { useContext } from "react";

import { AuthContext } from '../contexts/AuthContext';

export default function Appointments() {

  const { user } = useContext(AuthContext);

    return (
      <>
        <div/>
        <div>
          { user?.TYPE == "M" ? (
            <div>
              {user?.NAME}
            </div>
          ) : ( 
            <div>
              <span>{user?.NAME}</span>
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