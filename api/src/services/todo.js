import { Todo } from '../models/todo';

export default class TodoService {

    static async getTodos(query, page, limit) {
        const options = {
            page,
            limit
        };
        try {
            const todos = await Todo.paginate(query, options);
            return todos;
        } catch (e) {
            throw Error(`Error while Paginating Todos: ${e}`);
        }
    }
    
    static async createTodo(todo) {
        const newTodo = new Todo({
            title: todo.title,
            description: todo.description,
            date: new Date(),
            status: todo.status
        });
        //w
        try {
            const savedTodo = await newTodo.save();
            return savedTodo;
        } catch (e) {
            throw Error("Error while Creating Todo");
        }
    }
    
    static async updateTodo(todo) {
        const id = todo.id;
        var item;
        try {
            item = await Todo.findById(id);
        } catch (e) {
            throw Error("Error occured while Finding the Todo");
        }
        if (!item) {
            return false;
        }
        item.title = todo.title;
        item.description = todo.description;
        item.status = todo.status;
        try {
            const savedTodo = await item.save();
            return savedTodo;
        } catch (e) {
            throw Error("And Error occured while updating the Todo");
        }
    }
    
    static async deleteTodo(id) {
        try {
            console.log(`deleting ${id}`);
            const deleted = await Todo.remove({
                _id: id
            });
            if (deleted.result.n === 0) {
                throw Error("Todo Could not be deleted");
            }
            return deleted;
        } catch (e) {
            throw Error(`Error Occured while Deleting the Todo : ${e}`);
        }
    }
}