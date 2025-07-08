const Links = require("../model/Links");
const Users = require("../model/Users");

const linksController={
    create:async(request,response)=>{
        const {campaign_title,original_url,category}=request.body;
        try{
            const user = await Users.findById({_id: request.user.id});
            if(user.credits<1){
                return response.status(400).json({
                    code: 'INSUFFICIENT_FUNDS',
                    message:"Insufficient Credits"});
            }

            const link=new Links({
                campaignTitle: campaign_title,
                originalUrl: original_url,
                category: category,
                user: request.user.role === 'admin'? request.user.id: request.user.adminId
            });

            await link.save();

            user.credits-=1;
            await user.save();

            response.status(200).json({
                data:{id: link._id},
                message:'Link Created'
            })
        }catch(error){
            console.log(error);
            return response.status(500).json({error:"Internal server error"})
        }
    },

    getAll:async(request,response)=>{
        try{
            const userId = request.user.role === 'admin'? request.user.id:request.user.adminId;
            const links=await Links
                    .find({user: userId})
                    .sort({createdAt: -1});
            return response.json({data: links});
        }catch(error){
            console.log(error);
            return response.status(500).json({error:"Internal server error"})
        }
    },

    getById:async(request,response)=>{
        try{
            const linkId = request.params.id;
            if(!linkId){
                return response.status(401).json({error:"Link id is required"});
            }

            const link = await Links.findById(linkId);
            if(!link){
                return response.status(404).json({error:"Link does not exist with the given id"});
            }

            const userId = request.user.role === 'admin'?request.user.id:request.user.adminId;
            if(link.user.toString() !== userId){
                return response.status(403).json({error:"Unauthorized access"})
            }

            response.json({data: link});
        }catch(error){
            console.log(error);
            return response.status(500).json({error:"Internal server error"})
        }
    },

    update:async(request,response)=>{
        try{
            const linkId = request.params.id;
            if(!linkId){
                return response.status(401).json({error:"Link id is required"});
            }

            let link = await Links.findById(linkId);
            if(!link){
                return response.status(404).json({error:"Link does not exist with the given id"});
            }
           
            const {campaign_title,original_url,category}=request.body;
            link=await Links.findByIdAndUpdate(linkId,{
                campaignTitle: campaign_title,
                originalUrl: original_url,
                category: category
            },{new: true});

            response.json({data: link});
        }catch(error){
            console.log(error);
            return response.status(500).json({error:"Internal server error"})
        }
    },

    delete:async(request,response)=>{
        try{
            const linkId = request.params.id;
            if(!linkId){
                return response.status(401).json({error:"Link id is required"});
            }

            let link = await Links.findById(linkId);
            if(!link){
                return response.status(404).json({error:"Link does not exist with the given id"});
            }
            const userId = request.user.role === 'admin'?request.user.id:request.user.adminId;
            if(link.user.toString() !== userId){
                return response.status(403).json({error:"Unauthorized access"})
            }

            await link.deleteOne();
            response.json({message: 'Link deleted'});
        }catch(error){
            console.log(error);
            return response.status(500).json({error:"Internal server error"})
        }
    },

    redirect:async(request,response)=>{
        try{
            const linkId = request.params.id;
            if(!linkId){
                return response.status(401).json({error:"Link id is required"});
            }

            let link = await Links.findById(linkId);
            if(!link){
                return response.status(404).json({error:"Link does not exist with the given id"});
            }
            
            link.clickCount+=1;
            await link.save();

            response.redirect(link.originalUrl);
        }catch(error){
            console.log(error);
            return response.status(500).json({error:"Internal server error"})
        }
    }
};

module.exports = linksController;