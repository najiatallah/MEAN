import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const ToDoSchema = mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    status: String
});

ToDoSchema.plugin(mongoosePaginate);
export const Todo = mongoose.model('Todo', ToDoSchema);