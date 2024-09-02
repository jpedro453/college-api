import { RolesPreHandler } from '@/presentation/preHandlers/RolesPreHandler'
import { FastifyInstance } from 'fastify'
import { makeAuthUseCase } from '../factories/use-cases/AuthUseCasesFactory'
import {
    makeCreateQuestionController,
    makeGetQuestionsController
} from '../factories/controllers/QuestionsControllersFactory'

export default function questionsRoutes(app: FastifyInstance) {
    const adminPrehandler = new RolesPreHandler(['admin'], makeAuthUseCase())
    const studentPreHandler = new RolesPreHandler(['student', 'admin', 'editor', 'manager'], makeAuthUseCase())

    app.post('/api/questions', { preHandler: adminPrehandler.handle.bind(adminPrehandler) }, async (req, res) => {
        const controller = makeCreateQuestionController()
        const { statusCode, body } = await controller.handle(req)

        return res.code(statusCode).send(body)
    })

    app.get('/api/questions', { preHandler: studentPreHandler.handle.bind(studentPreHandler) }, async (req, res) => {
        const controller = makeGetQuestionsController()
        const { statusCode, body } = await controller.handle(req)

        return res.code(statusCode).send(body)
    })
}