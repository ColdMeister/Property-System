import express, {Application, Request, Response, NextFunction} from 'express';
import {v4} from 'uuid';


//const app: Application = express();
const uuId = v4();
const router = express.Router();
const members = require('../../Members');

// Get all members
router.get('/', (req:Request, res:Response): any => {
    res.json(members);
});

//Single member
router.get('/:id',(req:Request, res:Response): any => { 
    //res.send(req.params.id);
    const found = members.some((member:any) => member.id === parseInt(req.params.id ));

    if(found){
        res.json(members.filter((member:any) => member.id === parseInt(req.params.id )));
    }else{
        res.status(400).json({msg: `No member of that id of ${req.params.id}`});
    }
    
});

//Create a member
router.post('/',(req:Request, res:Response): any => {
    //res.send(req.body);
    const newMember = {
        id: uuId,
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if(!newMember.name || !newMember.email){
        return res.status(400).json({ msg:'Please include a name and email' });
    }

    members.push(newMember);

    res.json(members);
    //res.redirect('/');
});


// Update a member
router.put('/:id',(req:Request, res:Response): any => { 
    //res.send(req.params.id);
    const found = members.some((member:any) => member.id === parseInt(req.params.id ));

    if(found){
        const updMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;

                res.json({ msg: 'Member updated', member });
            }
        });
    }else{
        res.status(400).json({msg: `No member of that id of ${req.params.id}`});
    }
    
});

// Delete a member
router.delete('/:id',(req:Request, res:Response): any => { 
    //res.send(req.params.id);
    const found = members.some((member:any) => member.id === parseInt(req.params.id ));

    if(found){
        res.json({
            msg: 'Member deleted', 
            members: members.filter((member:any) => member.id !== parseInt(req.params.id ))
        });
    }else{
        res.status(400).json({msg: `No member of that id of ${req.params.id}`});
    }
    
});




module.exports = router;