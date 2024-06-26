import { GetQuestionsCategoryByIdUseCase } from '@/application/questionsCategories/GetQuestionsCategoryByIDUseCase'
import { makeFakeQuestionsCategoryRepo } from '@/tests/mocks/repositories/QuestionsCategoryRepository.mock'

const makeSut = () => {
    const questionsCategoryRepository = makeFakeQuestionsCategoryRepo()
    const sut = new GetQuestionsCategoryByIdUseCase(questionsCategoryRepository)
    return { sut, questionsCategoryRepository }
}

describe('GetQuestionCategoryByIdUseCase', () => {
    test('Should throw if repository throws', async () => {
        const { sut, questionsCategoryRepository } = makeSut()
        jest.spyOn(questionsCategoryRepository, 'getByField').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = sut.get('12344565677')
        expect(res).rejects.toThrow()
    })
    test('Should return a category on success', async () => {
        const { sut } = makeSut()

        const res = await sut.get('12344565677')
        expect(res._id).toBeTruthy()
    })
})
