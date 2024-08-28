"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const app_1 = require("../dist/modules/user/app");
const app_2 = require("../dist/modules/itinerary/app");
require('dotenv').config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.set('PORT', process.env.PORT || 3000);
app.set("BASE_URL", process.env.BASE_URL || "localhost");
const dbConfig = require("../dist/database/config/db");
app.use('/api', app_1.UserModule, app_2.ItineraryModule);
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).send("Hello");
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}));
const initializeDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // await prisma.$queryRaw`SELECT 1;`;
        console.log("Database connection successful");
    }
    catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1); // Exit the process with an error code
    }
});
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield initializeDatabase(); // Ensure the database is connected
        const port = app.get('PORT');
        server.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    }
    catch (error) {
        console.error('Error starting server:', error);
    }
});
startServer();
