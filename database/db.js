import Realm from "realm";

// Declare Schema
class ToDoSchema extends Realm.Object {}
ToDoSchema.schema = {
    name: 'ToDoo1',
    
    properties: {
        _id : 'int',
        Title: 'string',
        Due_Date: 'string'
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
      const book = realm.create('ToDoo1', {
        _id : getPrimaryKeyId("ToDoo1"),
        Title:_Title,
        Due_Date:_Due_Date
      });
    });
  }

let getAllToDo = () => {
    return realm.objects('ToDoo1');
}
let deleteToDo=(_id)=>{
realm.write(() =>
  realm.delete(
    realm.objects('ToDoo1').filter(Obj => Obj._id == _id),
  ),
)
};

export {
  getAllToDo,addTodo,deleteToDo
}