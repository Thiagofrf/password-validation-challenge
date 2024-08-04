import { render, screen } from '@testing-library/react'
import UserEvent from '@testing-library/user-event'
import Form from '../components/Form/Form'


beforeEach(() => {
    render(<Form/>)
})

describe('<Form />', () => {
    it('should show a form with valid inputs', () => {
        const userName = screen.getByRole('textbox', {name: /userName/i});
        const userEmail = screen.getByRole('textbox', {name: /userEmail/i});
        const userPassword = screen.getByRole('textbox', {name: /userPassword/i})
        const submitButton = screen.getByRole('button', {name: /Enviar/i})
    
        expect(userName).toBeInTheDocument();
        expect(userEmail).toBeInTheDocument();
        expect(userPassword).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    })
    
    it('should throw an error if name input length < 3', async () => {
        const userName = screen.getByRole('textbox', {name: /userName/i});
    
        await UserEvent.type(userName, 'TH');
        screen.debug()
        expect(screen.getByRole('errorSpan').textContent = 'Esse campo é obrigatório')
    })

    it('should throw an error if email input length < 3', async () => {
        const userEmail = screen.getByRole('textbox', {name: /userEmail/i});
    
        await UserEvent.type(userEmail, 'TH');
        screen.debug()
        expect(screen.getByRole('errorSpan').textContent = 'Esse campo é obrigatório')
    })

    it('should throw an error if password input length < 6', async () => {
        const userPassword = screen.getByRole('textbox', {name: /userPassword/i});
    
        await UserEvent.type(userPassword, '12345');
        screen.debug()
        expect(screen.findByText('Senha deve conter 6 dígitos'))
    })

    it('should throw an error if password doesnt have a sequence of at least two equal numbers', async () => {
        const userPassword = screen.getByRole('textbox', {name: /userPassword/i});
    
        await UserEvent.type(userPassword, '234567');
        screen.debug()
        expect(screen.findByText('Senha deve conter 2 dígitos adjacentes iguais'))
    })

    it('should throw an error if password have a number lower to the previous one', async () => {
        const userPassword = screen.getByRole('textbox', {name: /userPassword/i});
    
        await UserEvent.type(userPassword, '555553');
        screen.debug()
        expect(screen.findByText('Senha deve conter dígitos numa sequência crescente ou de mesmo valor'))
    })

    it('should throw an error if password value is lower than 184759', async () => {
        const userPassword = screen.getByRole('textbox', {name: /userPassword/i});
    
        await UserEvent.type(userPassword, '184758');
        screen.debug()
        expect(screen.findByText('Senha deve estar entre os números 184759 e 856920'))
    })

    it('should throw an error if password value is lower than higher than 856920', async () => {
        const userPassword = screen.getByRole('textbox', {name: /userPassword/i});
    
        await UserEvent.type(userPassword, '856921');
        screen.debug()
        expect(screen.findByText('Senha deve estar entre os números 184759 e 856920'))
    })
})


