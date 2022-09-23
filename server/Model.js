 import mongoose from 'mongoose';
 
const ToDoList = new mongoose.Schema(
  {
    listItem:String
  },
  {
    collection: 'toDoList',
  }
);

export default mongoose.model('toDoList', ToDoList);
