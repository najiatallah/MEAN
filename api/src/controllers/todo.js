import TodoService from '../services/todo';

export default class TodoController {

    static async getTodos(req, res, next) {
        const page = req.query.page ? req.query.page : 1;
        const limit = req.query.limit ? req.query.limit : 10;
        try {
            const todos = await TodoService.getTodos({}, page, limit);
            return res.status(200).json({
                status: 200,
                data: todos,
                message: "Succesfully Todos Received"
            });
        } catch (e) {
            return res.status(400).json({
                status: 400,
                message: e.message
            });
        }
    }
    
    static async createTodo(req, res, next) {
        const todo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status
        };
        try {
            const createdTodo = await TodoService.createTodo(todo);
            return res.status(201).json({
                status: 201,
                data: createdTodo,
                message: "Succesfully Created ToDo"
            });
        } catch (e) {
            return res.status(400).json({
                status: 400,
                message: "Todo Creation was Unsuccesfull"
            });
        }
    }
    
    static async updateTodo(req, res, next) {
        if (!req.body._id) {
            return res.status(400).json({
                status: 400,
                message: "Id must be present"
            });
        }
        const id = req.body._id;
        const todo = {
            id,
            title: req.body.title ? req.body.title : null,
            description: req.body.description ? req.body.description : null,
            status: req.body.status ? req.body.status : null
        };
        try {
            const updatedTodo = await TodoService.updateTodo(todo);
            return res.status(200).json({
                status: 200,
                data: updatedTodo,
                message: "Succesfully Updated Tod"
            });
        } catch (e) {
            return res.status(400).json({
                status: 400,
                message: e.message
            });
        }
    }
    
    static async removeTodo(req, res, next) {
        const id = req.params.id;
        try {
            const deleted = await TodoService.deleteTodo(id);
            return res.status(204).json({
                status: 204,
                message: "Succesfully Todo Deleted"
            });
        } catch (e) {
            return res.status(400).json({
                status: 400,
                message: e.message
            });
        }
    }

}

