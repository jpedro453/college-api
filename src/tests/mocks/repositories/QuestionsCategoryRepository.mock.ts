import { IQuestionsCategory } from '@/domain/QuestionsCategory'
import { IQuestionsCategoryRepository } from '@/interfaces/application/repositories/QuestionsCategoryRepository'
import { IGetQuestionsCategoriesDTO } from '@/interfaces/domain/useCases/questionsCategory/GetQuestionsCategories'

export const makeFakeQuestionsCategoryRepo = (): IQuestionsCategoryRepository => {
    class QuestionsCategoryRepo implements IQuestionsCategoryRepository {
        async getAll(data?: IGetQuestionsCategoriesDTO): Promise<IQuestionsCategory[]> {
            return Promise.resolve([
                {
                    id: 'any_id',
                    title: data ? data.search : 'titulo',
                    slug: 'title_category',
                    image: 'image_url',
                    created_at: new Date()
                }
            ])
        }
        async getBySlug(slug: string): Promise<IQuestionsCategory> {
            return Promise.resolve({
                id: 'any_id',
                title: 'title category',
                slug: 'title_category',
                image: 'image_url',
                created_at: new Date()
            })
        }
        async createCategory(title: string, slug: string, image?: string): Promise<IQuestionsCategory> {
            return Promise.resolve({
                id: 'any_id',
                title: 'title category',
                slug: 'title_category',
                image: 'image_url',
                created_at: new Date()
            })
        }
    }
    return new QuestionsCategoryRepo()
}