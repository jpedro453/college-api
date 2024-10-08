import { RolesPreHandler } from '@/presentation/preHandlers/RolesPreHandler'
import { FastifyInstance } from 'fastify'
import { makeAuthUseCase } from '../factories/use-cases/AuthUseCasesFactory'
import {
    makeCreateQuestionController,
    makeDeleteQuestionController,
    makeGetQuestionByIDController,
    makeGetQuestionsController,
    makeUpdateQuestionController
} from '../factories/controllers/QuestionsControllersFactory'

export default function questionsRoutes(app: FastifyInstance) {
    const adminPrehandler = new RolesPreHandler(['admin', 'manager'], makeAuthUseCase())
    const studentPreHandler = new RolesPreHandler(['student', 'admin', 'editor', 'manager'], makeAuthUseCase())

    app.post('/api/questions', { preHandler: adminPrehandler.handle.bind(adminPrehandler) }, async (req, res) => {
        const controller = makeCreateQuestionController()
        const { statusCode, body } = await controller.handle(req)

        return res.code(statusCode).send(body)
    })

    app.get('/api/questions', async (req, res) => {
        const controller = makeGetQuestionsController()
        const { statusCode, body } = await controller.handle(req)

        return res.code(statusCode).send(body)
    })
    app.get('/api/questions/:id', { preHandler: adminPrehandler.handle.bind(adminPrehandler) }, async (req, res) => {
        const controller = makeGetQuestionByIDController()
        const { statusCode, body } = await controller.handle(req)

        return res.code(statusCode).send(body)
    })

    app.put('/api/questions/:id', { preHandler: adminPrehandler.handle.bind(adminPrehandler) }, async (req, res) => {
        const controller = makeUpdateQuestionController()
        const { statusCode, body } = await controller.handle(req)

        return res.code(statusCode).send(body)
    })

    app.delete('/api/questions/:id', { preHandler: adminPrehandler.handle.bind(adminPrehandler) }, async (req, res) => {
        const controller = makeDeleteQuestionController()
        const { statusCode, body } = await controller.handle(req)

        return res.code(statusCode).send(body)
    })
}
