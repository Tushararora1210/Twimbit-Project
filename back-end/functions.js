const jwt=require('jsonwebtoken');

function extractaccesstoken(data){
    token=data.split('&')[0];
    for(var i=0;i<token.length;i++)
    {
        if(token[i]=="=")
        {
            return token.substring(i+1);
        }
    }
    return "";
    }
function isLoggedin(req,res,next)
{
    const token = req.cookies.access_token;
    
    if (!token) {
      return res.status(401).send("Please Login First");
    }
    try {
      const data = jwt.verify(token, process.env.tokenkey);
      req.userId = data.user_id;
      return next();
    } catch {
      return res.status(401).send("Invalid Credentials");
    }
};

module.exports={extractaccesstoken,isLoggedin};