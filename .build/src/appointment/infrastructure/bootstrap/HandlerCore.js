"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppointmentController_1 = require("../controller/AppointmentController");
const AppointmentModule_1 = require("../controller/AppointmentModule");
const HandlerCore = (appContext, action) => {
    const appointmentController = appContext.select(AppointmentModule_1.AppointmentModule).get(AppointmentController_1.AppointmentController);
    if (appointmentController[action]) {
        return appointmentController;
    }
};
exports.default = HandlerCore;
