"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleContactSubmitController = void 0;
const admin_contact_services_1 = require("../services/admin.contact.services");
const handleContactSubmitController = async (req, res) => {
    const result = await (0, admin_contact_services_1.insertTheContactData)(req.body);
    if (result) {
        return res.status(201).json({
            success: true,
            message: "Submitted your form successfully",
        });
    }
    else {
        return res.status(500).json({ success: false, message: result });
    }
};
exports.handleContactSubmitController = handleContactSubmitController;
//# sourceMappingURL=admin.contact.Controller.js.map