import { useState } from 'react';
import { validateFields } from '../../utils/validateFields';
import { registerService } from '../../services/sendRegister';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadingIcon from '../../assets/loading.gif'
import './Form.scss'

interface Errors {
    userNameError: string,
    userEmailError: string;
    userPasswordErrors: string[]
}
interface ApiResult {
    resultMessage: string,
    dataResult: boolean
}

const initialErrors: Errors = {
    userNameError: '',
    userEmailError: '',
    userPasswordErrors: [],
}

const Form = () => {
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [errors, setErrors] = useState<Errors>(initialErrors)
    const [apiResult, setApiResult] = useState<ApiResult>()
    const [loading, setLoading] = useState(false)

    const isSubmitDisabled = errors.userEmailError === '' && errors.userNameError === '' && errors.userPasswordErrors[0] === 'Senha válida!'

    async function submitHandler () {
        setLoading(true);

        const userData = {
            "name": userName,
            "email": userEmail,
            "password": userPassword
        }

        const sendValues = async () => {
            try {
                await registerService.includeUser(userData)
                setApiResult({
                    resultMessage: 'Resultado enviado com sucesso!',
                    dataResult: true
                })
            } catch (err) {
                console.error(err)
                setApiResult({
                    resultMessage: 'Falha ao enviar resultado. Tente novamente.',
                    dataResult: false
                })
            }
        }

        await sendValues()
        setLoading(false)
    }

    return (
        <>
            <div className='c-form'>
                <h1 className='c-form__title'>Valide sua senha</h1>
                <form 
                    className='c-form__content'
                    onSubmit={(event) => event?.preventDefault()}
                >
                    <fieldset>
                        <label htmlFor="userName">
                            <input 
                                type="text" 
                                placeholder="Nome" 
                                required
                                className='c-form__content--input'
                                name='userName'
                                aria-label='userName'
                                onChange={(event) => {
                                    const errorMessage = validateFields.validateUserName(event.target.name, event.target.value)
                                    setErrors(prevErrors => ({
                                        ...prevErrors, userNameError: errorMessage
                                    }));
                                    setUserName(event.target.value)
                                }}
                                value={userName}
                            />
                            {errors.userNameError && 
                                <ErrorMessage>
                                    {errors.userNameError}
                                </ErrorMessage>
                            }
                        </label>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="userEmail">
                            <input 
                                type="email" 
                                placeholder="Email" 
                                required
                                className='c-form__content--input'
                                name='userEmail'
                                aria-label='userEmail'
                                onChange={(event) => {
                                    const errorMessage = validateFields.validateUserEmail(event.target.name, event.target.value)
                                    setErrors(prevErrors => ({
                                        ...prevErrors, userEmailError: errorMessage
                                    }));
                                    setUserEmail(event.target.value)
                                }}
                                value={userEmail}
                            />
                            {errors.userEmailError && 
                                <ErrorMessage>
                                    {errors.userEmailError}
                                </ErrorMessage>
                            }
                        </label>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="userPassword">
                            <input 
                                type="text" 
                                placeholder="Senha" 
                                required
                                className='c-form__content--input'
                                name='userPassword'
                                aria-label='userPassword'
                                onChange={(event) => {
                                    const errorMessages = validateFields.validateUserPassword(event.target.name, event.target.value)
                                    setErrors(prevErrors => ({
                                        ...prevErrors, userPasswordErrors: errorMessages
                                    }));
                                    setUserPassword(event.target.value)
                                }}
                                value={userPassword}
                            />
                            {errors.userPasswordErrors.length > 0 && errors.userPasswordErrors[0] !== 'Senha válida!' && (
                                <ul className='c-form__content--input-errors'>
                                    <p>Senha inválida</p>
                                    {errors.userPasswordErrors.map((error, index) => (
                                        <li key={index}>
                                            <ErrorMessage key={index}>
                                                {error}
                                            </ErrorMessage>
                                        </li>
                                    ))}
                                </ul>
                            )}  
                            {errors.userPasswordErrors.length > 0 && errors.userPasswordErrors[0] === 'Senha válida!' && 
                                (
                                    <p className='c-form__content--input-valid'>Senha válida!</p>  
                                )
                            }
                            
                        </label>
                    </fieldset>

                    <div className='c-form__content--submit-container'>
                        {apiResult && 
                            <div className='c-form__content--result'>
                                <p 
                                    className={apiResult.dataResult ? 'c-form__content--result-positive' : 'c-form__content--result-negative'}>
                                    {apiResult.resultMessage}
                                </p>
                            </div>
                        }

                        <button 
                            type="submit"
                            className='c-form__content--submit'
                            onClick={(event) => {
                                event.preventDefault();
                                submitHandler()
                            }}
                            disabled={!isSubmitDisabled}
                        >
                            {loading ?  
                                <img src={LoadingIcon} />
                            : 
                                'Enviar'
                            }
                        </button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default Form;