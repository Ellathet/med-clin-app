export function PersonalData() {

    return (
        <>
        <h1>Dados Pessoais</h1>
        <div className={styles.dualInputContainer}>
            <div className={styles.inputContainer}>
              <label htmlFor="name">Nome Completo</label>
              <input type="text" id="name" {...register('name')}/>
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="date"> Dia do Aniversario</label>
              <input type="date" id="date" {...register('birthDate')}/>
            </div>
          </div>
          <div className={styles.dualInputContainer}>
            <div className={styles.inputContainer}>
              <label htmlFor="email">E-mail</label>
              <input type="email" id="email" {...register('email')}/>
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="emailConfirm"> Confirmar E-mail</label>
              <input type="email" id="emailConfirm" {...register('emailConfirm')}/>
            </div>
          </div>
          <div className={styles.dualInputContainer}>
            <div className={styles.inputContainer}>
              <label htmlFor="rg">RG</label>
              <InputMask type="text" id="rg" mask="99.999.999-9" {...register('rg')}/>
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="cpf">CPF</label>
              <InputMask type="text" id="cpf" mask="999.999.999-99" {...register('cpf')}/>
            </div>
          </div>
            <div className={styles.dualInputContainer}>
              <div className={styles.inputContainer}>
                <label htmlFor="password" >Senha</label>
                <input type="password" id="password"  minLength={8} {...register('password')}/>
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="confirmPassword">Confirmar Senha</label>
                <input type="password" id="password" {...register('confirmPassword')}/>
              </div>
            </div>
            </>
    )
}