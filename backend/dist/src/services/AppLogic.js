"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLogic = void 0;
const mockdata_1 = require("../mockdata/mockdata");
class AppLogic {
    constructor(wsHandler) {
        this.wsHandler = wsHandler;
    }
    static getInstance(newWsHandler) {
        if (!AppLogic.instance && newWsHandler) {
            AppLogic.instance = new AppLogic(newWsHandler);
        }
        return AppLogic.instance;
    }
    handleLogin(user, socket) {
        this.wsHandler.login(socket, user);
        this.wsHandler.sendMessage(socket, { type: "LOGIN", payload: user });
        this.handleUserList();
        this.handleStudentList(socket);
    }
    handleLogout(socket) {
        this.wsHandler.login(socket, undefined);
        this.handleUserList();
    }
    handleStudentList(socket) {
        const user = this.wsHandler.getUser(socket);
        let payload;
        if ((user === null || user === void 0 ? void 0 : user.role) === "Teacher") {
            payload = mockdata_1.mockdata;
        }
        else {
            payload = mockdata_1.mockdata.filter(s => s.name === (user === null || user === void 0 ? void 0 : user.name));
        }
        this.wsHandler.sendMessage(socket, { type: "STUDENT_LIST", payload });
    }
    handleUserList() {
        this.wsHandler.sendToAll({ type: "USER_LIST", payload: this.wsHandler.getUsers("Student") }, "Teacher");
    }
}
exports.AppLogic = AppLogic;
