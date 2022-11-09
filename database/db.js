import Realm from "realm";

// Declare Schema
class ToDoSchema extends Realm.Object {}
ToDoSchema.schema = {
    name: 'ToDo1',
    
    properties: {
        _id : 'int',
        Title: 'string',
        Due_Date: 'string',
        Status:'string'
    },
    primaryKey:'_id',
};

// Create realm
let realm = new Realm({schema: [ToDoSchema], schemaVersion: 1});

getPrimaryKeyId=(model)=>{
    if (realm .objects(model).max("_id")) {
      return realm.objects(model).max("_id") + 1;
    }
    return 1;
}

// Export the realm
export default realm;





let addTodo=(_Title,_Due_Date)=>{
    realm.write(() => {
      const book = realm.create('ToDo1', {
        _id : getPrimaryKeyId("ToDo1"),
        Title:_Title,
        Due_Date:_Due_Date,
        Status:'Pending'
      });
    });
  }

let updateToDo=async (_id,status)=>{
   console.log("Id INSIDE ToDo Function",_id,status)
  await realm.write(async () => {
    const oldTodo = realm.objects('ToDo1').filter(Obj => Obj._id === _id)[0];

    oldTodo.Status = status;
  });
 }


let getAllToDo = () => {
    return realm.objects('ToDo1');
}
let deleteToDo=(_id)=>{
realm.write(() =>
  realm.delete(
    realm.objects('ToDo1').filter(Obj => Obj._id == _id),
  ),
)
};

let getFilteredToDo = (Status) => {
  return realm.objects('ToDo1').filtered("Status =" + "'"+`${Status}`+"'");
}


export {
  getAllToDo,addTodo,deleteToDo,getFilteredToDo,updateToDo
}