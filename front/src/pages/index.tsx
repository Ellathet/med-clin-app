import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../contexts/AuthContext';

interface FormData { 
  email: string,
  password: string,
}

export default function Home() {

  const { signIn } = useContext(AuthContext);

  const { register, handleSubmit } = useForm()

  async function handleSignIn(data : FormData ) {
    try {
      await signIn(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <form id="login" onSubmit={handleSubmit(handleSignIn)}>
        <label htmlFor="email"> Email</label> 
        <input type="email" id="email" {...register('email')}/>
        <label htmlFor="password"> Senha </label>
        <input type="password" id="password" {...register('password')}/>
        <div>
          <div>
            Registre-se
          </div>
          <button type="submit" form="login">
            Entrar
          </button>
        </div>
      </form>
    </div>
  )
}
