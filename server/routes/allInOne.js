
const express = require('express');
const router = express.Router();

function allInOne(actionName){
console.log(actionName);
const action = require(`../controllers/${actionName}`);

return(
    
router.get('/', async (req,res,next) => {
    console.log(actionName);
    res.status(200).send({
        data: await action.getAll()
    });
}),
router.post('/add', async (req,res)=>{
                await action.add(req.body)
                .then((result)=>{
                    res.status(201).send({
                        data: result
                    })
                })
                .catch((e)=>{
                    res.status(500).send({
                        error: e
                    })
                });
                
        // })
    }),
router.get('/edit/:id', async (req,res)=>{
            await action.get(parseInt(req.params.id))
                .then((result)=>{
                    res.status(200).send({
                        data: result
                    })
                    
                })
                .catch((e)=>{
                    res.status(500).send({
                        error: e
                    })
                });
    }),
router.put('/edit/:id', async (req,res)=>{
        console.log(req.body);
        await action.edit(req.body, req.params.id)
                .then(result=>{
                    res.status(202).send({
                        data: result
                    })
                })
                .catch(e=>{
                    res.status(204).send({
                        error: e
                    })
                });
    }),
router.delete('/del/:id',async(req,res)=>{
        await action.delete(req.params.id)
            .then(result=>{
                res.status(200).send({
                    message: result
                })
            })
            .catch(e=>{
                res.status(404).send({
                    error: "Error : " + e
                })
            });

    }),
    router.get('/find', async(req,res)=>{
        
        await action.find(req.query.search)
            .then(result => {
                res.status(200).send({
                    category: result
                })
            })
            .catch(e => {
                res.status(404).send({
                    error: "Error : " + e
                })
            });
    })
)

}
module.exports = allInOne;
// export default allInOne;