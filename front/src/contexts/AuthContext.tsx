
import { api } from '../services/api';
import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies'
import Router from "next/router"
import { AnyObject } from 'yup/lib/types';
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
interface AuthContextData {
    isAuthenticated: boolean;
    user:User | null;
    /* signIn: (data : SignInData) => Promise<void> */
    signUp: (data : SignUpData) => Promise<void>
    error: number;
    /* recoverUserInfos: any; */
}
interface SignUpData {

} 
interface SignInData {
    email: string;
    password: string;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({children}) {

//JTW Login

/*     const [user, setUser ] = useState<User | null>(null) */

/* const isAuthenticated = !!user; */

/*     async function recoverUserInfos(token : string) {
        return api.get(`/me`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    } */

/*     useEffect(() => {
        
        const { 'medClin-token': token } = parseCookies()

        if(token) {
            recoverUserInfos(token).then(response =>{setUser(response.data)})
        }

    }) */

/*     async function signIn({email, password} : SignInData ) {

        api.get(`/login`, {
            auth: {
                username: email ,
                password: password
            },
        }).then((response)=> {

            setCookie(undefined, "medClin-token", response.data.token, {
                maxAge: 60 * 60 * 24, // 24 hours
            })

            setUser(response.data.people[0])

            Router.push('/appointments')

        })
    
    } */

    async function signUp({name, birthDate, email, rg, cpf, password, medicFunction, type} : any) {
        api.post(`/people`, {
            
            name: name,
            fun: medicFunction,
            type: type,
            email: email,
            cpf: cpf,
            rg: rg, 
            birth: birthDate,
            password: password,
            
        }).then((response) => {
  
            
/*             setCookie(undefined, "medClin-token", response.data.token, {
                maxAge: 60 * 60 * 24, //24 horas
            })
*/
/*             setUser(response.data) */

/*             api.defaults.headers['Authorization'] = `Bearer ${response.data.token}` */
 
            Router.push('/appointments')

        })

    }

    return (
        <AuthContext.Provider value={{
            /* isAuthenticated, */
        /*     signIn, */
       /*      user,
            error, */
            signUp,
        /*     recoverUserInfos */
        }}>
            {children}
        </AuthContext.Provider>
    )
}