import { AuthenticationUseCase } from '@/application/auth/AuthenticationUseCase'
import { makeFakeHasherCompare } from '@/tests/mocks/cryptography/Hasher.mock'
import { makeTokenMock } from '@/tests/mocks/cryptography/TokenMock'
import { makeFakeUsersRepository } from '@/tests/mocks/repositories/UsersRepository.mock'

const makeSut = () => {
    const usersRepository = makeFakeUsersRepository()
    const hasherCompare = makeFakeHasherCompare()
    const tokenMock = makeTokenMock()
    const sut = new AuthenticationUseCase(usersRepository, hasherCompare, tokenMock)
    return { sut, usersRepository, hasherCompare, tokenMock }
}

describe('AuthenticationUseCase', () => {
    describe('auth()', () => {
        test('Should throw if Hasher throws', async () => {
            const { sut, hasherCompare } = makeSut()

            jest.spyOn(hasherCompare, 'compare').mockReturnValueOnce(Promise.reject(new Error('')))

            const res = sut.auth({ email: 'any_email@email.com', password: 'any_password' })
            expect(res).rejects.toThrow()
        })
        test('Should throw if Token throws', async () => {
            const { sut, tokenMock } = makeSut()

            jest.spyOn(tokenMock, 'encrypt').mockReturnValueOnce(Promise.reject(new Error('')))

            const res = sut.auth({ email: 'any_email@email.com', password: 'any_password' })
            expect(res).rejects.toThrow()
        })

        test('Should return null if usersRepository returns null', async () => {
            const { sut, usersRepository } = makeSut()
            jest.spyOn(usersRepository, 'queryOne').mockReturnValueOnce(null as any)
            const accessToken = await sut.auth({ email: 'any_email@email.com', password: 'any_password' })
            expect(accessToken).toBe(null)
        })
        test('Should return null if HashComparer returns false', async () => {
            const { sut, hasherCompare } = makeSut()
            jest.spyOn(hasherCompare, 'compare').mockReturnValueOnce(new Promise((resolve) => resolve(false)))
            const accessToken = await sut.auth({ email: 'any_email@email.com', password: 'any_password' })
            expect(accessToken).toBeNull()
        })

        test('Should return user on success', async () => {
            const { sut } = makeSut()
            const res = await sut.auth({ email: 'any_email@email.com', password: 'any_password' })
            expect(res.id).toBeTruthy()
        })
    })

    describe('verifySession', () => {
        test('should throw if invalid token', async () => {
            const { sut, usersRepository } = makeSut()

            jest.spyOn(usersRepository, 'queryOne').mockReturnValueOnce(Promise.resolve(null))
            const res = sut.verifySession('token')
            expect(res).rejects.toThrow()
        })
        test('should throw if invalid token', async () => {
            const { sut, tokenMock } = makeSut()

            jest.spyOn(tokenMock, 'decrypt').mockReturnValueOnce(Promise.resolve(null))
            const res = sut.verifySession('token')
            expect(res).rejects.toThrow()
        })
        test('should return a user on success', async () => {
            const { sut } = makeSut()

            const res = await sut.verifySession('token')
            expect(res.email).toBeTruthy()
        })
    })
    describe('logout', () => {
        test('should throw if repository throws', async () => {
            const { sut, usersRepository } = makeSut()

            jest.spyOn(usersRepository, 'update').mockReturnValueOnce(Promise.reject(new Error('')))
            const res = sut.logout('token')
            expect(res).rejects.toThrow()
        })
        test('should return true on success', async () => {
            const { sut } = makeSut()

            const res = await sut.logout('token')
            expect(res).toBeTruthy()
        })
    })
})
