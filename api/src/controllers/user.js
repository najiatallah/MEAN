import UserService from '../services/user';

export default class UserController {

    static async register(req, res, next) {
        try {
            const user = await UserService.register(req.body);
            return res.status(200).json({
                status: 200,
                data: user,
                message: "Succesfully Created User"
            });
        } catch (e) {
            return res.status(400).json({
                status: 400,
                message: e.message
            });
        }
    }

    static async getUsers(req, res, next) {
        const page = req.query.page ? req.query.page : 1;
        const limit = req.query.limit ? req.query.limit : 10;
        try {
            const users = await UserService.getUsers({}, page, limit);
            return res.status(200).json({
                status: 200,
                data: users,
                message: "Succesfully Users Received"
            });
        } catch (e) {
            return res.status(400).json({
                status: 400,
                message: e.message
            });
        }
    }

    static async getUserById(req, res, next) {
        const id = req.params.id;
        try {
            const user = await UserService.getUserById(id);
            return res.status(200).json({
                status: 200,
                data: user,
                message: "Succesfully User Received"
            });
        } catch (e) {
            return res.status(400).json({
                status: 400,
                message: e.message
            });
        }
    }

    static async login(req, res, next) {
        if (req.user == "error"){
            return res.status(200).json({
                status: 400,
                message: req.authInfo.message
            });
        }
        const token = await UserService.generateToken(req.user);
        return res.status(200).json({
            status:200,
            token: `JWT ${ token }`,
            user: req.user
        });

    }

}