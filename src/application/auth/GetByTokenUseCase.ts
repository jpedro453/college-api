import { IUser } from '@/domain/User'
import { IToken } from '@/interfaces/application/cryptography/Token'
import { IUsersRepository } from '@/interfaces/application/repositories/UsersRepository'
import { IGetByToken } from '@/interfaces/domain/useCases/auth/GetByToken'

export class GetByTokenUseCase implements IGetByToken {
    constructor(private readonly usersRepository: IUsersRepository, private readonly token: IToken) {}

    async get(token: string): Promise<IUser> {
        const access_token = await this.token.decrypt(token)
        if (access_token) {
            const data = await this.usersRepository.getByField('access_token', token)
            if (!data) {
                return null
            }
            const { password, ...user } = data
            return user
        }
        return null
    }
}
