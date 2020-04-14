const express=require('express');
const router=express.Router();

router.get('/login',(req,res)=>{
    res.render('../views/login');
});

router.get('/register',(req,res)=>{
    res.render('../views/register');
});


//Register Handle

router.post('/register',(req,res)=>{
    const {name, email, password, password2} =req.body;    
    let errors=[];
    if(!email || !name || !password || !password2){
        errors.push({msg:'Fill please'});
    }
    if(password!=password2){
        errors.push({msg:'password doesnt match'});
    }

    if(errors.length>0){
        res.render('register',{
          errors,
          name,
          email,
          password,
          password2      
       })}
        else{
            res.send('pass');
        }
    }
);

module.exports=router;