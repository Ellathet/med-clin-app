
import { api } from '../services/api';
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
    medic: User | null;
    signIn: (data : SignInData) => Promise<void> 
    signUp: (data : SignUpData) => Promise<void>
    setUser: any;
    setMedic: any;
    recoverUserInfos: any; 
}
interface SignUpData {

} 
interface SignInData {
    email: string;
    password: string;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({children}) {

//Usuário da pagina de consultas

const [user, setUser ] = useState<User | null>(null) 
const [medic, setMedic ] = useState<User | null>(null) 

 useEffect(() => {

    setCookie(undefined, "medClin-medic", medic)

}, [medic])

useEffect(() => {

    setCookie(undefined, "medClin-user", JSON.stringify(user) )

    const { 'medClin-user': userCookie } = parseCookies()

}, [user]) 

 const isAuthenticated = !!user; 

     async function recoverUserInfos(token : string) {
        return api.get(`/me`,{
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

    }, [])  

    async function signIn({email, password} : SignInData ) {

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

            Router.push('/')

        })
    
    } 

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
  
            setCookie(undefined, "medClin-token", response.data.token, {
                maxAge: 60 * 60 * 24, //24 horas
            })

            setUser(response.data) 

            api.defaults.headers['Authorization'] = `Bearer ${response.data.token}` 
 
            Router.push('/')

        })

    }

    return (
        <AuthContext.Provider value={{
        isAuthenticated,
            signIn,
            medic,
            user,
            setMedic,
            setUser,
            signUp, 
            recoverUserInfos 
        }}>
            {children}
        </AuthContext.Provider>
    )
}