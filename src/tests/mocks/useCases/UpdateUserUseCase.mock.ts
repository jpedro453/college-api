import { IUser } from '@/domain/User'
import { IUserSchema } from '@/interfaces/application/schemas/UserSchema'
import { IUpdateUser } from '@/interfaces/domain/useCases/users/UpdateUser'
import { makeFakeUserModel } from '../models/UserModel.mock'

export const makeFakeUpdateUser = (): IUpdateUser => {
    class UpdateUserStub implements IUpdateUser {
        async update(data: Partial<IUserSchema>): Promise<IUser> {
            const user = makeFakeUserModel()
            for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key) && data[key] !== null) {
                    user[key] = data[key]
                }
            }
            return Promise.resolve(user)
        }
    }
    return new UpdateUserStub()
}
