import styles from '../styles/RegisterForm.module.css'

export default function RegisterForm() {
    return (
      <div>
          <div className={styles.Header}>
            <h1>Registro</h1>
          </div>
          <div>
            <form action="">
              <div className={styles.name}>
                <label>Nome</label>
                <input type="text"/>
              </div>
              <div className={styles.dualContainer}>
                <div className={styles.password}>
                  <label>Senha</label>
                  <input type="password" />
                </div>
                <div className={styles.password}>
                  <label>Confirmar Senha</label>
                  <input type="password" />
                </div>    
              </div>
              <div className={styles.dualContainer}>
                <div className={styles.date}>
                  <label>Data de Nascimento</label>
                  <input type="date" />
                </div>
                <div className={styles.medicCheck}>
                  <label>Trabalha como médico?</label>
                  <input type="checkbox" />
                  <input type="checkbox" />
                </div>
              </div>
              <div className={styles.dualContainer}>
                <div>
                  <input type="text" />
                  <label htmlFor="">RG</label>
                </div>
                <div>
                  <input type="text" />
                  <label htmlFor="">CPF</label>
                </div>
              </div>
            </form>             
          </div>
      </div>
    )
  }
  