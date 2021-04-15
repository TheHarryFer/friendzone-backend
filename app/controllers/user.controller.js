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

exports.getUsername = (req, res) => {
	User.getUser(
		req.params.user_id, (err, user) => {
			if (err) 
				return res.status(500).send({ message: err.message });
			if (user)
				return res.status(200).send({ username: user.username });
		}
	)
};

exports.getUserDetail = (req, res) => {
	User.getUser(
		req.params.user_id, (err, user) => {
			if (err) 
				return res.status(500).send({ message: err.message });
			if (user)
				return res.status(200).send({ 
                    username: user.username,
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    phone: user.phone,
                    gender_id: user.gender_id,
                    birthdate: user.birthdate,
                    profile_pic: user.profile_pic,
                    bio: user.bio
                });
		}
	)
};

exports.editUser = (req, res) => {
    User.editUser(
        req.body, (err, message) => {
            if(err) 
                return res.status(500).send({ message: err.message });
            if(message)
                return res.status(200).send({ message: message});
        }
    )
}