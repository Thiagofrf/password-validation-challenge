import axios from "axios"

interface Data {
    name: string,
    email: string, 
    password: string
}

export const registerService = {
    includeUser: async (data: Data) => {
        axios.post(
            `https://teste/api/PasswordValidation`,
            data
        )
        .catch((err) => {
            console.error(err)
        })
    }
}