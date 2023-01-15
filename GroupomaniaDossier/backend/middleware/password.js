const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

passwordSchema
.is().min(9)                                    
.is().max(20)                                  
.has().uppercase(1)                              
.has().lowercase()                             
.has().digits(1)
.has().symbols(1)                    
.has().not().spaces()                           
.is().not().oneOf(['Passw0rd', 'Password123', 'Azerty', 'Azerty123']);

module.exports = (req, res, next) => {
    if(passwordSchema.validate(req.body.password)) {
        next()
    } else {
        return res.status(400).json({ error : 'Votre mot de passe doit contenir au minimum 8 caractères dont 1 chiffre, une majuscule et un caractère spécial'}),
        console.log('Votre mot de passe doit contenir au minimum 8 caractères dont 1 chiffre, une majuscule et un caractère spécial')
    }
}