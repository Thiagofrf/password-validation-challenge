const errorMessages = {
    required: "*Esse campo é obrigatório",
    inputLength: "Senha deve conter 6 dígitos",
    passwordAdjacent: "Senha deve conter 2 dígitos adjacentes iguais",
    passwordSequence: "Senha deve conter dígitos numa sequência crescente ou de mesmo valor",
    passwordValue: "Senha deve estar entre os números 184759 e 856920",
}

function validateInputFilled(name: string, value: string) {
    if(name === 'userName') {
        return value.length >= 3
    }

    if(name === 'userEmail') {
        if (value.slice(-1) === '@') return false // Verifico se o último caracter digitado é @
        if (Array.from(value)[0] === '@') return false// Verifico se o primeiro caracter é @
        if (!value.includes('@')) return false // Verifico se a string possui @, se não, precisa ser barrada

        return value.length >= 3
    }

    if(name === 'userPassword') {
        return value.length > 5
    }

    return false
}

function validatePasswordAdjacent(value: string) {
    const arrayOfDigits = Array.from(value, Number)
    const hasDuplicate = (new Set(arrayOfDigits)).size !== arrayOfDigits.length;

    return hasDuplicate
}

function validatePasswordSequence(value: string) {
    const arrayOfDigits = Array.from(value, Number)

    if(arrayOfDigits.length > 5) {
        let hasSequence: boolean = true;
        
        arrayOfDigits.map((num, index) => {
            if(arrayOfDigits[index - 1] > num) {
                hasSequence = false;
            }
        })

        return hasSequence
    }

    return false
}

function validatePasswordValue(value: string) {
    let valueToNum: number = Number(value);

    if (valueToNum >= 184759 && valueToNum <= 856920) {
        return true
    }

    return false
}

export const validateFields = {
    validateUserName: (name: string, value: string) => {
        if(!validateInputFilled(name, value)) {
            return errorMessages.required;
        }
        return ''
    },

    validateUserEmail: (name: string, value: string) => {
        const validEmail = 
            !validateInputFilled(name, value) 

        if(validEmail) {
            return errorMessages.required;
        }
        return ''
    },

    validateUserPassword: (name: string, value: string) => {
        const errors = [];

        if (!validateInputFilled(name, value)) {
            errors.push(errorMessages.inputLength)
        }

        if (!validatePasswordAdjacent(value)) {
            errors.push(errorMessages.passwordAdjacent)
        }

        if (!validatePasswordSequence(value)) {
            errors.push(errorMessages.passwordSequence)
        }

        if (!validatePasswordValue(value)) {
            errors.push(errorMessages.passwordValue)
        }

        return errors.length > 0 ? errors : ['Senha válida!'];
    }
}