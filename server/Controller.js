import ToDoList from './Model.js';

export const add = (req, res) => {
  console.log(req.body);
  ToDoList.create({ listItem: req.body.listItem })
    .then((res) => {
      res.status(201).json({ message: 'Success' });
    })
    .catch((err) => {
      res.json(err);
    });
};

export const list = (req, res) => {
  ToDoList.find()
    .then((response) => {
      res.status(200).json(response).end();
    })
    .catch((err) => {
      res.json(err);
    });
};

export const edit = (req, res) => {
  ToDoList.updateOne(
    { _id: req.body.id },
    { $set: { listItem: req.body.listItem } }
  ).then((response) => {
    res.status(200).json({ message: 'Success' });
  })
  .catch((err)=>{
    res.json(err)
  })
};

export const deleteItem = (req, res) => {
    console.log(34353);
    ToDoList.deleteOne({_id:req.query.id})
    .then((response)=>{
        console.log(response);
        res.status(200).json(response)
    })
    .catch((err)=>{
        console.log(err);
        res.json(err)
    })
}
