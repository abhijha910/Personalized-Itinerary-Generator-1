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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItineraryService = void 0;
const itinerary_interface_1 = require("../../../database/interface/itinerary.interface");
const user_interface_1 = __importDefault(require("../../../database/interface/user.interface"));
const mailingService_1 = require("../../../utils/mailingService");
const pdfConverter_1 = __importDefault(require("../../../utils/pdfConverter"));
class ItineraryService {
    saveItinerary(itineraryData, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const NewItinerary = {
                userId: userId,
                budget: itineraryData.budget,
                noOfDays: itineraryData.noOfDays,
                traveler: itineraryData.traveler,
                location: itineraryData.location,
                hotels: itineraryData.hotels,
                itinerary: itineraryData.itinerary
            };
            try {
                const user = yield user_interface_1.default.findById(userId);
                if (!user) {
                    throw new Error('User not found');
                }
                const newItinerary = new itinerary_interface_1.ItineraryModel(NewItinerary);
                // Generate the PDF
                const itineraryWithStringId = Object.assign(Object.assign({}, newItinerary), { _id: newItinerary._id.toString() });
                // console.log("Itineraary: ",itineraryWithStringId);
                const response = yield newItinerary.save();
                const filePath = yield (0, pdfConverter_1.default)(itineraryWithStringId, user.name);
                // console.log(filePath)
                yield (0, mailingService_1.emailService)({
                    email: user.email,
                    name: user.name
                }, filePath, `Travel-Itinerary-${user._id}.pdf`);
                return response;
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log("Error in itinerary-service:", error.message);
                    throw error;
                }
                else {
                    throw new Error("Error occures");
                }
            }
        });
    }
    getAnItinerary(tripId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const trip = yield itinerary_interface_1.ItineraryModel.findById(tripId);
                if (!trip) {
                    throw new Error("Itinerary not found");
                }
                const _a = trip.toObject(), { _id } = _a, rest = __rest(_a, ["_id"]);
                return Object.assign({ _id: _id.toString() }, rest);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log("Error in itinerary-service:", error.message);
                    throw error;
                }
                else {
                    throw new Error("Error occures");
                }
            }
        });
    }
    getUsersItinerary(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const itineraries = yield itinerary_interface_1.ItineraryModel.find({ userId });
                return itineraries.map(doc => (Object.assign(Object.assign({}, doc.toObject()), { _id: doc._id.toString() })));
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log("Error in itinerary-service:", error.message);
                    throw error;
                }
                else {
                    throw new Error("Error occures");
                }
            }
        });
    }
}
exports.ItineraryService = ItineraryService;
