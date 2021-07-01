const User = require("../models/user");
exports.createUser = (req: any, res: any, next: any) =>{
    
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });
    
    user.save().then((result: any) => {
        res.status(201).json({
            message: 'User created!!!',
            result: result
        });
    }).catch((err:any) => {
        res.status(500).json({
                message: "Invalid authentication credentials!"
        });
    });
    
}

exports.getUser = (req: any, res: any, next: any) => {
    let fetchedUser: any;

    User.findOne({ firstName: req.body.firstName, lastName: req.body.lastName }).then((user: any) => {
        if(!user){
            return res.status(401).json({
                message: "Auth failed!"
            }) 
        }
        fetchedUser = user;
    }).then((result:any) => {
        if(!result){
            return res.status(401).json({
                message: "Auth failed!"
            })
        }
        res.status(200).json({
            firstName: fetchedUser.firstName,
            lastName: fetchedUser.lastName
        });
    }).catch((err:any) => {
        return res.status(401).json({
            message: "Invalid authentication credentials!"
        })
    }
    )
}