import { IHasher } from '@/interfaces/application/cryptography/Hasher'
import { IUsersRepository } from '@/interfaces/application/repositories/UsersRepository'
import { IUser } from '@/domain/User'
import { ISignUpDTO, ISignUp } from '@/interfaces/domain/useCases/auth/SignUp'

export class SignUpUseCase implements ISignUp {
    constructor(private readonly usersRepository: IUsersRepository, private readonly hasher: IHasher) {}

    async signUp(registerData: ISignUpDTO): Promise<IUser> {
        const hashedPassword = await this.hasher.hash(registerData.password)
        registerData.password = hashedPassword

        const createdUser = await this.usersRepository.create(registerData)
        if (createdUser) {
            const { password, discord_confirmed, ...user } = createdUser
            return user
        }
        return null
    }
    async getUserByEmail(email: string): Promise<IUser> {
        const user = await this.usersRepository.getByEmail(email)
        return user
    }
}
