
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies'
import Router from "next/router"

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
    signIn: (data : SignInData) => Promise<void>
    signUp: (data : SignUpData) => Promise<void>
    error: number;
}

interface SignUpData {

} 
interface SignInData {
    email: string;
    password: string;
}

const url = "http://localhost:3333"

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({children}) {

    const [user, setUser ] = useState<User | null>(null)
    const [error, setError ] = useState(200)

    const isAuthenticated = !!user;

    async function recoverUserInfos(token) {
        return axios.get(`${url}/me`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    useEffect(() => {
        
        const { 'medClin-token': token } = parseCookies()

        if(token) {
            recoverUserInfos(token).then(response =>{setUser(response.data)})
        }

    })

    async function signIn({email, password} : SignInData ) {

        axios.get(`${url}/login`, {
            auth: {
                username: email ,
                password: password
            },
        }).then((response)=> {

            setCookie(undefined, "medClin-token", response.data.token, {
                maxAge: 60 * 60 * 24, // 24 Horas
            })

            setUser(response.data.people[0])

            Router.push('/appointments')

        }).catch((error)=>{

        })
    
    }

    async function signUp({name, birthDate, email, rg, cpf, password, medicFunction, type} : any) {
        axios.post(`${url}/people`, {
            
            name: name,
            fun: medicFunction,
            type: type,
            email: email,
            cpf: cpf,
            rg: rg, 
            birth: birthDate,
            password: password,
            
        }).then((response) => {
            
            setCookie(undefined, "medClin-token", response.data.token, {
                maxAge: 60 * 60 * 24, //24 horas
            })

            setUser(response.data.people[0])

            Router.push('/appointments')


        }).catch((error) =>{
            
        })

    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            signIn,
            user,
            error,
            signUp

        }}>
            {children}
        </AuthContext.Provider>
    )
}