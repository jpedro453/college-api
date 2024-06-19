import { UpdateQuestionsCategoryUseCase } from '@/application/questionsCategories/UpdateQuestionsCategoryUseCase'
import { makeFakeQuestionsCategoryRepo } from '@/tests/mocks/repositories/QuestionsCategoryRepository.mock'

const makeSut = () => {
    const repository = makeFakeQuestionsCategoryRepo()
    const sut = new UpdateQuestionsCategoryUseCase(repository)

    return { sut, repository }
}

describe('UpdateQuestionsCategoryUseCase', () => {
    test('should throw if repository returns null on getByID()', async () => {
        const { sut, repository } = makeSut()

        jest.spyOn(repository, 'getByID').mockReturnValueOnce(Promise.resolve(null))

        const res = sut.update({
            _id: 'id',
            title: 'title category',
            slug: 'title_category',
            image: 'image_url'
        })
        expect(res).rejects.toThrow()
    })

    test('should throw if repository returns a category on getBySlug()', async () => {
        const { sut, repository } = makeSut()

        jest.spyOn(repository, 'getBySlug').mockReturnValueOnce(
            Promise.resolve({
                _id: 'id',
                title: 'title category',
                slug: 'title_category',
                image: 'image_url',
                created_at: new Date()
            })
        )

        const res = sut.update({
            _id: 'id',
            title: 'title category',
            slug: 'title_category',
            image: 'image_url'
        })

        expect(res).rejects.toThrow()
    })

    test('should throw if repository throws', async () => {
        const { sut, repository } = makeSut()

        jest.spyOn(repository, 'getBySlug').mockReturnValueOnce(Promise.resolve(null))
        jest.spyOn(repository, 'getByID').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = sut.update({
            _id: 'id',
            title: 'title category',
            slug: 'title_category',
            image: 'image_url'
        })
        expect(res).rejects.toThrow()
    })
    test('should return a updated category on success', async () => {
        const { sut, repository } = makeSut()
        jest.spyOn(repository, 'getBySlug').mockReturnValueOnce(Promise.resolve(null))

        const res = await sut.update({
            _id: 'id',
            title: 'title category updated',
            slug: 'title-category-updated',
            image: 'image_url'
        })
        expect(res.title).toBe('title category updated')
        expect(res.slug).toBe('title-category-updated')
    })
})
