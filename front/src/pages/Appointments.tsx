import { GetServerSideProps } from "next"
import { redirect } from "next/dist/next-server/server/api-utils"
import { parseCookies } from 'nookies'

export default function Appointments() {
    return (
      <div>
          Appointments
      </div>
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