const Contact = require('../models/contact');

const add = async (req,res)=>{
    
    try{
        
        let contact = new Contact(req.body);
        contact.image = filename;
        let savedContact = await contact.save(); 
        res.status(200).send(savedContact);
        filename = '';
    }
    catch(error) {
        res.status(500).send(error);
        
    }

}
const del = async (req, res) => {
    try{
       
        let result = await Contact.findByIdAndDelete({_id: req.params.id});
        res.status(200).send(result);
    }
    catch(error) {
        res.status(500).send(error);
    }
}

const getByIdUser =async (req,res)=>{
    try{
        let {iduser} = req.params;
        let result = await Contact.find({idUser: iduser});
        res.status(200).send(result);
    }
    catch(error) {
        res.status(500).send(error);
    }
}

const getById = async (req,res)=>{
    try{
       
        let result = await Contact.findById({_id: req.params.id});
        res.status(200).send(result);
    }
    catch(error) {
        res.status(500).send(error);
    }
}

const update = async (req,res)=>{
    try {
        let {id}=req.params;
        let data = req.body;

        if(filename.length>0){
            data.image = filename;
        
        }
        let result = await Contact.findByIdAndUpdate({_id:id},data);
        res.status(200).send(result);
        filename='';
    }
    catch(error) {
        res.status(500).send(error);
    }
}

module.exports = {
    add,
    del,
    getById,
    getByIdUser,
    update
}