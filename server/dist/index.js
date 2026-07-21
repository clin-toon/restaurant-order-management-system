"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_js_1 = __importDefault(require("./config/db.js"));
const auth_Route_js_1 = __importDefault(require("./routes/auth.Route.js"));
const food_routes_js_1 = __importDefault(require("./routes/food.routes.js"));
const admin_route_js_1 = __importDefault(require("./routes/admin.route.js"));
const order_routes_js_1 = __importDefault(require("./routes/order.routes.js"));
const errorHandler_js_1 = require("./middlewares/errorHandler.js");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const ratelimiter_js_1 = require("./middlewares/ratelimiter.js");
const port = process.env.PORT || 8000;
const app = (0, express_1.default)();
db_js_1.default
    .connect()
    .then(() => {
    console.log("Connected to database successully ");
})
    .catch((error) => console.log(error));
// middlewares
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000"],
    credentials: true,
}));
app.use(ratelimiter_js_1.apiLimiter);
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use("/api", auth_Route_js_1.default);
app.use("/api", food_routes_js_1.default);
app.use("/api/admin/", admin_route_js_1.default);
app.use("/api/order", order_routes_js_1.default);
app.use(errorHandler_js_1.errorHandler);
app.get("/", (req, res) => {
    res.json({ success: "true", message: "Hello Word " });
});
app.listen(port, () => {
    console.log(`Server started at port number ${port}`);
});
//# sourceMappingURL=index.js.map