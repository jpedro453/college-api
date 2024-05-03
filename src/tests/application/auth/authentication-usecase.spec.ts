import { AuthenticationUseCase } from '@/application/auth/AuthenticationUseCase'
import { IHashComparer } from '@/interfaces/application/cryptography/Hasher'
import { IToken } from '@/interfaces/application/cryptography/Token'
import { IUsersRepository } from '@/interfaces/application/repositories/UsersRepository'
import { makeFakeHasherCompare } from '@/tests/mocks/cryptography/Hasher.mock'
import { makeTokenMock } from '@/tests/mocks/cryptography/TokenMock'
import { makeFakeUsersRepository } from '@/tests/mocks/repositories/UsersRepository.mock'

interface ISut {
    hasherCompare: IHashComparer
    tokenMock: IToken
    usersRepository: IUsersRepository
    sut: AuthenticationUseCase
}

const makeSut = (): ISut => {
    const usersRepository = makeFakeUsersRepository()
    const hasherCompare = makeFakeHasherCompare()
    const tokenMock = makeTokenMock()
    const sut = new AuthenticationUseCase(usersRepository, hasherCompare, tokenMock)
    return { sut, usersRepository, hasherCompare, tokenMock }
}

describe('AuthenticationUseCase', () => {
    test('Should throw if Users Repository throws', async () => {
        const { sut, usersRepository } = makeSut()

        jest.spyOn(usersRepository, 'updateUser').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = sut.auth({ email: 'any_email@email.com', password: 'any_password' })
        expect(res).rejects.toThrow()
    })
    test('Should throw if Hasher throws', async () => {
        const { sut, hasherCompare } = makeSut()

        jest.spyOn(hasherCompare, 'compare').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = sut.auth({ email: 'any_email@email.com', password: 'any_password' })
        expect(res).rejects.toThrow()
    })
    test('Should throw if Token throws', async () => {})
})