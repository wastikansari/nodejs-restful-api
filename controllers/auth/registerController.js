import Joi from "joi";
import { User, RefreshToken } from "../../models";
import bcrypt from "bcrypt";
import JwtService from "../../services/JwtService";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import { REFRESH_SECRET } from "../../config";


const RegisterController = {
  async register(req, res, next) {
    console.log('RegisterController register ');
    console.log(req.body);
   

    // Validation
    const registerSchema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error } = registerSchema.validate(req.body);
    console.log(error);
    if (error) {
      return next(error);
    }
    // check if user is in the database already
    try {
      const existEmail = await User.exists({ email: req.body.email });
   
      if (existEmail) {
        return next(
          CustomErrorHandler.alreadyExist("This email is already taken.")
        );
      }
    } catch (err) {
      return next(err);
    }
    const { name, email, password } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
  

    // database model
    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    let access_token;
    let refresh_token;
    try {
      const result = await user.save();
      console.log(result);

      // Token
      access_token = JwtService.sign({ _id: result._id, role: result.role },"1y" );
      refresh_token = JwtService.sign( { _id: result._id, role: result.role }, "1y", REFRESH_SECRET );

      // database whitelist
      await RefreshToken.create({ token: refresh_token });
    } catch (err) {
      return next(err);
    }

    res.status(200).json({ status: true, access_token });
  },
};

export default RegisterController;
