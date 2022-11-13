var jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJwYXNzd29yZCI6ImFkaGR1ZW5zZiIsImFkbWluX2FjY2VzcyI6ZmFsc2V9.cikRAPMY7Bqx5jnQF2hKsvOq7kmatF_YsmUbX6Qz-JE"
var aws_token = "arn:aws:iam::123456789012:mfa/user"
var amazontoken = "AKIAYVP4CIPPERUVIFXG"
var password= "124hsy3731"

const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
  
const app = express();
  

   function user1() {
  var user = document.getElementById('uname').value
  var contrasena = document.getElementById('psw').value
  if (user == "M@lwy" && contrasena == "Ciud_Dig_10") {
    alert('Acceso Autorizado')
    window.location.href = "historia4.html";
  } 
  else {
    alert('Acceso denegado')
  }
   }

// Set up Global configuration access
dotenv.config();
  
let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT} ...`);
});
  
// Main Code Here  //
// Generating JWT
app.post("/user/generateToken", (req, res) => {
    // Validate User Here
    // Then generate JWT Token
  
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: 12,
    }
  
    const token = jwt.sign(data, jwtSecretKey);
  
    res.send(token);
});
  
// Verification of JWT
app.get("/user/validateToken", (req, res) => {
    // Tokens are generally passed in header of request
    // Due to security reasons.
  
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
  
    try {
        const token = req.header(tokenHeaderKey);
  
        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
            return res.send("Successfully Verified");
        }else{
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
});
