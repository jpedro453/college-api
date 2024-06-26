import { IUser } from '@/domain/User'
import { ISignUp, ISignUpDTO } from '@/interfaces/domain/useCases/auth/SignUp'

export const makeSignUpUseCaseStub = (): ISignUp => {
    class SignUpUseCaseStub implements ISignUp {
        async signUp(registerData: ISignUpDTO): Promise<IUser> {
            return Promise.resolve({
                _id: 'any_id',
                name: 'any_name',
                email: 'any_email@email.com',
                roles: ['student'],
                points: 0
            })
        }
        getUserByEmail(email: string): Promise<IUser> {
            return Promise.resolve(null)
        }
    }
    return new SignUpUseCaseStub()
}
