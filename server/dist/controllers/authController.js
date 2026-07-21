"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactController = exports.handleLogOut = exports.getUserDetails = exports.loginController = exports.registerController = void 0;
const user_services_1 = require("../services/user.services");
const AppError_1 = require("../utils/AppError");
const utils_1 = require("../utils/utils");
const admin_contact_services_1 = require("../services/admin.contact.services");
const registerController = async (req, res) => {
    const { email } = req.body;
    const exists = await (0, user_services_1.isUserAlreadyRegistered)(email, "customers");
    if (exists)
        throw new AppError_1.AppError("User exists ", 409);
    const newCustomer = await (0, user_services_1.createCustomer)(req.body);
    res.status(201).json({
        status: "success",
        message: "Account has been created successfully",
        data: { user: newCustomer },
    });
};
exports.registerController = registerController;
const loginController = async (req, res) => {
    const { email, password } = req.body;
    // 1. Authenticate user via service
    const user = await (0, user_services_1.loginUser)(email, password);
    // 2. Generate Token (Payload usually contains ID and Role)
    const token = (0, utils_1.signToken)({
        id: user.id,
        role: user.role,
        name: user.first_name,
    });
    // 3. Send Response
    res.cookie("accessToken", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 15 * 60 * 1000,
    });
    res.status(200).json({
        success: true,
        message: "Log in successful",
    });
};
exports.loginController = loginController;
const getUserDetails = async (req, res) => {
    res.status(200).json({ data: req.user, success: true });
};
exports.getUserDetails = getUserDetails;
const handleLogOut = async (req, res) => {
    res.clearCookie("accessToken", {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
    });
    res.status(200).json({
        success: true,
        message: "Logged out succesfully",
    });
};
exports.handleLogOut = handleLogOut;
const contactController = async (req, res) => {
    const result = (await (0, admin_contact_services_1.getTheContactStatus)(req.body.email));
    const contactArray = result?.contact;
    const isAlreadyReplied = contactArray?.find((item) => item.status === "replied");
    if ((result?.count > 0 && result?.contact[0].status === "pending") ||
        !isAlreadyReplied) {
        console.log("1st mathced ");
        return res.status(400).json({
            success: false,
            message: "Please wait until your previous contact form is resolved ",
        });
    }
    if (result?.count === 0) {
        console.log("2rd matched");
        const information = await (0, user_services_1.registerContactInfo)(req.body);
        return res.status(201).json({
            success: true,
            message: "Data inserted successfully",
            data: information,
        });
    }
    if (result?.count > 0 && isAlreadyReplied === undefined) {
        console.log("3rd matched");
        const information = await (0, user_services_1.registerContactInfo)(req.body);
        return res.status(201).json({
            success: true,
            message: "Data inserted successfully",
            data: information,
        });
    }
};
exports.contactController = contactController;
//# sourceMappingURL=authController.js.map