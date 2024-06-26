import { IQuestion } from '@/domain/Question'
import { IQuestionSchema } from '../schemas/QuestionSchema'

export interface IQuestionsRepository {
    createQuestion(question: Omit<IQuestion, '_id'>, correct: number): Promise<IQuestionSchema>
}
