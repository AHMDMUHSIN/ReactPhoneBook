import schema from './user.model.js'


export async function addTask(req,res){
    const {name,number}=req.body
    res.status(201).send(schema.create({name,number}));
}

export async function getTask(req,res){
    let task=await schema.find()
    res.status(200).send(task)
}

export function delTask(req,res)
{
    const{id}=req.params;
    const data=schema.deleteOne({_id:id})
    data.then((resp)=>{
        res.status(200).send(resp)
    }).catch((error)=>{
        res.status(404).send(error)
    })
}