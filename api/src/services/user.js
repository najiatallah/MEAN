import { User } from "../models/user";
import bcrypt from 'bcrypt';
import config from '../config/development';
import jwt from 'jsonwebtoken';

export default class UserService {

    static async register(userObj) {
        const myUser = new User({
            firstName: userObj.firstName,
            lastName: userObj.lastName,
            email: userObj.email,
            username: userObj.username
        });
        try {
            const alreadyExist = await User.findOne({
                username: userObj.username
            });
            myUser.password = await this.hashPassword(userObj.password);
            const item = await myUser.save();
            return item;
        } catch (e) {
            throw Error(`Error while Creating a User: ${e}`);
        }
    }

    static async authenticate(email, password) {
        let result = {
            status:null,
            user:null,
            message:null
        };
        try{
            const user = await this.getUserByEmail(email);

            if (!user){
                result.status = 500;
                result.message = "Could not find user";
                return result;
            } 

            if (await this.comparePassword(password, user.password)) {
                result.status = 200;
                result.user = user;
                return result;
            }
            else {
                result.status = 500;
                result.message = "Invalid username or password";
                return result;
            }
        } catch (e){
            throw Error(`Error while authenticating the user: ${e}`);
        }
    }

    static async getUsers(query, page, limit) {
        const options = {
            page,
            limit
        };
        try {
            const users = await User.paginate(query, options);
            return users;
        } catch (e) {
            throw Error(`Error while Paginating Users: ${e}`);
        }
    }

    static async getUserById(id) {
        try {
            const user = await User.findById(id);
            return user;
        } catch (e) {
            throw Error(`Error while finding the User: ${e}`);
        }
    }

    static async getUserByEmail(email) {
        try {
            const user = await User.findOne({
                email: email
            });
            return user;
        } catch (e) {
            throw Error(`Error while finding the User: ${e}`);
        }
    }

    static async comparePassword(userPassword, storedPassword) {
        try {
            return await bcrypt.compare(String(userPassword), String(storedPassword));
        } catch (e) {
            throw Error(`Error while finding the User: ${e}`);
        }
    }

    static async hashPassword(password) {
        try {
            return await bcrypt.hash(String(password), 10);
        } catch (e) {
            throw Error(`Error while finding the User: ${e}`);
        }
    }

    static deserialize(user) {
        if (!user || typeof user !== 'object') {
            return null;
        }
        const userInfo = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            created: user.created,
        };
        return userInfo;
    }

    static async generateToken(user) {
        try {
            return await jwt.sign({data: user}, config.secret, {
                expiresIn: 604800
            });
        } catch (e) {
            throw Error(`Error while generating token:  ${e}`);
        }
    }

}