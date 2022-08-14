import { ownerModel } from './model.js';
import { asyncHandler } from '../../middlewares/asyncHandler.js';
import jwtService from '../../utils/jwt.js';
import bcrypt from 'bcrypt';


const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export default function authController() {
    const login = asyncHandler(async (req, res, next) => {
        const { email, password } = req.body;
        if (!email || !password || email === "" || password === "") {
            const error = new Error("email and password are required");
            error.statusCode = 400;
            return next(error);
        }

        if (!emailRegexp.test(email)) {
            const error = new Error("invalid email format");
            error.statusCode = 400;
            return next(error);
        }

        const user = await ownerModel.findOne({ email: email }).exec();
        if (!user) {
            const error = new Error("user not found");
            error.statusCode = 404;
            return next(error);
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            const error = new Error("password not correct");
            error.statusCode = 400;
            return next(error);
        }

        const token = jwtService().createToken(user);

        res.status(200).json({
            idToken: token,
        });
    });

    const createOwner = asyncHandler(async (req, res, next) => {
        const { name, email, password, address, contactNumber } = req.body;
        if (!name || !email || !password || name === "" || email === "" || password === "") {
            const error = new Error("name, email, and password are required");
            error.statusCode = 400;
            return next(error);
        }

        if (!emailRegexp.test(email)) {
            const error = new Error("invalid email format");
            error.statusCode = 400;
            return next(error);
        }

        const user = await ownerModel.findOne({ email: email }).exec();
        if (user) {
            const error = new Error("email already exists");
            error.statusCode = 400;
            return next(error);
        }

        bcrypt.hash(password, 10, function (err, hash) {
            let owner = {
                email: email,
                name: name,
                address: address,
                contactNumber: contactNumber,
            };
            owner = new ownerModel({ ...owner, password: hash });

            ownerModel.create(owner).then(() => {
                res.status(200).json({
                    data: "owner created",
                });
            }).catch((err) => {
                res.status(500).json({
                    data: err,
                });
            })
        });
    });

    const resetPassword = asyncHandler(async (req, res, next) => {
        const { email } = req.body;
        if (!email || email === "") {
            const error = new Error("email is required");
            error.statusCode = 400;
            return next(error);
        }

        if (!emailRegexp.test(email)) {
            const error = new Error("invalid email format");
            error.statusCode = 400;
            return next(error);
        }

        const user = await ownerModel.findOne({ email: email }).exec();
        if (!user) {
            const error = new Error("user not found");
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({
            data: "success",
        });
    });

    const getOwner = asyncHandler(async (req, res, next) => {
        const user = await ownerModel.findById(req.context.userId).exec();
        if (!user) {
            const error = new Error('user not found');
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({
            success: true,
            data: {
                name: user.name,
                email: user.email,
                address: user.address,
                contactNumber: user.contactNumber
            },
        });
    });

    const updateOwner = asyncHandler(async (req, res, next) => {
        const { name, address, contactNumber } = new ownerModel(req.body);

        const user = await ownerModel.findById(req.context.userId).exec();

        if (name && name !== "")
            user.name = name;
        if (address && address !== "")
            user.address = address;
        if (contactNumber && contactNumber !== "")
            user.contactNumber = contactNumber;

        const userUpdated = await ownerModel.replaceOne({ _id: user._id }, user);
        if (!userUpdated) {
            const error = new Error('error updating room');
            error.statusCode = 500;
            return next(error);
        };

        res.status(200).json({
            success: true,
            data: "updated",
        });
    });

    return {
        login,
        createOwner,
        resetPassword,
        getOwner,
        updateOwner
    };
}