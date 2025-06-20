const jwt=require('jsonwebtoken');
const secret="309b161a-5c19-4952-bef1-546829211287"

const authController={
    login:(request,response)=>{
        //These values are here because of express.json() middleware
        const {username,password}=request.body;
        if(username==='admin' && password==='admin'){
            const userDetails={
                name:"John Cena",
                email:"john@cena.com"
            };
            const token=jwt.sign(userDetails,secret,{expiresIn:'1h'});

            response.cookie('jwtToken',token,{
                httpOnly:true,
                secure:true,
                domain:'localhost',
                path:'/'
            });
            response.json({message: 'User authenticated',userDetails:userDetails});
        }else{
            response.status(401).json({message:'Invalid credentials'});
        }
    },

    logout:(request,response)=>{
        response.clearCookie('jwtToken');
        response.json({message:'User logged out succesfully'});
    },

    isUserLoggedIn:(request,response)=>{
        const token=request.cookies.jwtToken;

        if(!token){
            return response.status(401).json({message:'Unauthorized access'});
        }

        jwt.verify(token,secret,(err,userDetails)=>{
            if(err){
                return response.status(401).json({message:'Unauthorized access'});
            }else{
                return response.json({userDetails:userDetails});
            }
        });
    },
};

module.exports=authController;