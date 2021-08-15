import { api } from '../services/api';
import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from 'nookies'
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
    signIn: (data : SignInData) => Promise<void>;
    signUp: (data : SignUpData) => Promise<void>;
    setUser: any;
    setMedic: any;
    recoverUserInfos: any; 
    singOut: () => void;
}
interface SignUpData {
} 
interface SignInData {
    email: string;
    password: string;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({children}) {

//Dados do usuário
    const [user, setUser ] = useState<User | null>(null) 

//Dados do médico selecionado na pagina de Appointments (Ideal seria criar outro contexto)
    const [medic, setMedic ] = useState<User | null>(null) 

//Verifica se o usuário está autenticado
    const isAuthenticated = !!user; 

//Effect que atualiza os dados do médico
    useEffect(() => {

        setCookie(undefined, "medClin-medic", JSON.stringify(medic))

    }, [medic])

//Função que puxa os dados do usuário pelo Token
     async function recoverUserInfos(token : string) {
        return api.get(`/me`)
    } 

    async function setUserData(userData) {
        setCookie(undefined, "medClin-user", JSON.stringify(userData[0]), {
            maxAge: 60 * 60 * 24, // 24 hours
        })

        console.log(userData[0])

        setUser(userData[0])
    }

//Effect que observa a atualização dos Tokens
    useEffect(() => {
        
        const { 'medClin-token': token } = parseCookies()

        if(token) {
            recoverUserInfos(token).then(response =>{setUserData(response.data)})
        }

    }, [])  

//Função que faz o login 
    async function signIn({email, password} : SignInData ) {

        api.get(`/login`, {
            auth: {
                username: email ,
                password: password
            },
        }).then(async (response)=> {

            //Seta o cookie do token
            setCookie(undefined, "medClin-token", response.data.token, {
                maxAge: 60 * 60 * 24, // 24 hours
            })

            //Seta o cookie com os dados do usuário (Medida paliativa)
            setCookie(undefined, "medClin-user", JSON.stringify(response.data.people[0]), {
                maxAge: 60 * 60 * 24, // 24 hours
            } )

            setUser(response.data.people[0])

            //Redirecionamento da pagina
            Router.push('/')

        })
    
    } 
    
//Função que faz o registro
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

            setUser(response.data.people) 

            setCookie(undefined, "medClin-user", JSON.stringify(response.data.people), {
                maxAge: 60 * 60 * 24, // 24 hours
            })
 
            Router.push('/')

        })

    }
//Função de sair
    async function singOut() {
        await destroyCookie(null, 'medClin-token')
        await destroyCookie(null, 'medClin-user')
        await setUser(null)

        Router.push('/login')
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
            recoverUserInfos,
            singOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}