const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../model/Users');
const secret = "309b161a-5c19-4952-bef1-546829211287";
const {OAuth2Client} = require('google-auth-library');
const { validationResult } = require('express-validator');


const authController = {
    login: async (request, response) => {
        const errors=validationResult(request);
        if(!errors.isEmpty){
            return response.status(401).json({errors:errors.array()});
        }
        //These values are here because of express.json() middleware
        try {
            const { username, password } = request.body;

            const data = await Users.findOne({ email: username });
            if (!data) {
                return response.status(401).json({ message: 'Invalid Credentials' });
            }
            const isMatch = await bcrypt.compare(password, data.password);

            if (!isMatch) {
                return response.status(401).json({ message: 'Invalid Credentials' });
            }

            const userDetails = {
                id: data._id,
                name: data.name,
                email: data.email,
                role:data.role? data.role:'admin',
                adminId: data.adminId
            };
            const token = jwt.sign(userDetails, process.env.JWT_SECRET, { expiresIn: '1h' });

            response.cookie('jwtToken', token, {
                httpOnly: true,
                secure: true,
                domain: 'localhost',
                path: '/'
            });
            response.json({ message: 'User authenticated', userDetails: userDetails });
        } catch (error) {
            console.log(error);
            response.status(500).json({error:'Internal server error'});
        }
    },

    logout: (request, response) => {
        response.clearCookie('jwtToken');
        response.json({ message: 'User logged out succesfully' });
    },

    isUserLoggedIn: (request, response) => {
        const token = request.cookies.jwtToken;

        if (!token) {
            return response.status(401).json({ message: 'Unauthorized access' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (error, userDetails) => {
            if (error) {
                return response.status(401).json({ message: 'Unauthorized access' });
            } else {
                return response.json({ userDetails: userDetails });
            }
        });
    },

    register:async(request,response)=>{
        try{
            const {username,password,name}=request.body;
            const data= await Users.findOne({email:username});
            if(data){
                return response.status(401).json({message:'User already exists'});
            }
            const encryptedPassword=await bcrypt.hash(password,10);

            const user = new Users({
                email:username,
                password:encryptedPassword,
                name:name,
                role:'admin'
            });

            await user.save();
            response.status(200).json({message:'User registered'});
        }catch(error){
            console.log(error);
            return response.status(500).json({message:'Internal server error'});
        }
    },

    googleAuth:async(request,response)=>{
        const {idToken}=request.body;
        if(!idToken){
            return response.status(400).json({message:'Invalid request'});
        }

        try{
            const googleClient=new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
            const googleResponse=await googleClient.verifyIdToken({
                idToken:idToken,
                audience:process.env.GOOGLE_CLIENT_ID
            });

            const payload=googleResponse.getPayload();
            const {sub:googleId,email,name}=payload;

            let data=await Users.findOne({email:email});
            if(!data){
                data= new Users({
                    email:email,
                    name:name,
                    isGoogleUser:true,
                    googleId:googleId,
                    role:'admin'
                });

                await data.save();
            }

            const user={
                id:data._id? data._id:googleId,
                username:email,
                name:name,
                role: data.role? data.role:'admin'
            };

            const token=jwt.sign(user,process.env.JWT_SECRET,{expiresIn:'1h'});
            response.cookie('jwtToken',token,{
                httpOnly:true,
                secure:true,
                domain:'localhost',
                path:'/'
            });

            response.json({message:'User authenticated',userDetails:user});
        }catch(error){
                console.log(error);
                return response.status(500).json({error: 'Internal server error'});
        }
    }
};

module.exports = authController;