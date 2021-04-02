const User = require("../models/user.model.js");
const fs = require('fs')
const _profilePicDir = './data/profilePic/'
const path = require('path')

exports.displayPic = (req,res) => {
    User.getProfilePicturePath(
        req.params.user_id, (err, user) => { 
            console.log(req.params.user_id)
            if (err)
                return res.status(500).send({message: err.message});
            if(!user)
                return res.status(404).send({ message: "this user is not found"});
            else {
                console.log(user.profile_pic)
                let fileType = path.extname(user.profile_pic);

                if(fileType === ".png")
                    contentType = "image/png";
                else if(fileType === ".jpg")
                    contentType = "image/jpg"
                else if(fileType === ".jpeg")
                    contentType = "image/jpeg"  
                else 
                    contentType = "text/plain" 

                fs.readFile(_profilePicDir + user.profile_pic, function(error, content) {
                    if (error) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end("Internal server error");
                    }
                    else {
                        res.writeHead(200, { 'Content-Type': contentType });
                        res.end(content);
                    }
                });

            }
        }
    )
}