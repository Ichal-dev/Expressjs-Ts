import { Request, Response } from "express";
import IController from "./ControllerInterface";


let data: any[] = [
    { "id": 1, name: "Ichal" },
    { "id": 2, name: "Callu" },
    { "id": 3, name: "Faisal" },
    { "id": 4, name: "Employee" },
    { "id" : 5, name: "Cical"}
]

class UserController implements IController {
    index(req: Request, res: Response): Response {
       return res.send(data)
    }
    create(req: Request, res: Response): Response {
        const { id, name } = req.body;

        data.push({
            id: id,
            name: name,
        })

        return res.send("Create Sukses")
    }
    show(req: Request, res: Response): Response {
        const { id } = req.params;

        let person = data.find(item => item.id == id)

        return res.send(person)
    }
    update(req: Request, res: Response): Response {
        const { id } = req.params;
        const { name } = req.body

        let person = data.find(item => item.id == id)
        person.name = name

       return res.send("update Sukses")
        
    }
    delete(req: Request, res: Response): Response {
        const { id } = req.params;

        let person = data.filter(item => item.id != id);

        return res.send(person);
    }
    
}

export default new UserController()