const express=require('express');
const router=express.Router();

const User=require('../models/User');
const bcrypt=require('bcryptjs');
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
       });
    }else{
            // res.send('pass');
            //VALIDATION
            User.findOne({email:email})
            .then(user=>{
                if(user){
                    //user existt
                    errors.push({msg:'Username exist already'});
                    res.render('register',{
                        errors,
                        name,
                        email,
                        password,
                        password2      
                     });}
                else{
                    const newUser=new User({
                        name,
                        email,
                        password
                    });
                    //Hash the password
                    bcrypt.genSalt(10,(err,salt)=> bcrypt.hash(newUser.password,salt,(err,hash)=>{
                        if(err) throw err;
                        // password encoded
                        newUser.password=hash;
                        newUser.save()
                            .then(user=>{
                                res.redirect('/users/login');
                            })
                                .catch(err=>console.log(err));
                    }));
                }
            });

        }
    }
);

module.exports=router;