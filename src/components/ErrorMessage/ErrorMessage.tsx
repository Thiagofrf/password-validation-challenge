import { ReactNode } from "react";

type Props = {
    children: ReactNode
}

const ErrorMessage = (props: Props) => {
    return (
        <span 
            className='c-form__content--input-error'
            role="errorSpan"
        >
            {props.children}
        </span>
    )
}

export default ErrorMessage;