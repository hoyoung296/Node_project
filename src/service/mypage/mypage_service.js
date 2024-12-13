const dao = require("../../database/mypage/mypage_dao");

const getUserInfo = async (userId) => {
    try {
        const user = await dao.getUserInfo(userId);
        return user;
    } catch(err) {
        throw new Error("Error getting user information: " + err.message);
    }
};

const updatePersonalInfo = async (userId, id, pwd, name, addr, phone, email) => {
    try {
        return await dao.updatePersonalInfo(userId, id, pwd, name, addr, phone, email);
    } catch (err) {
        throw new Error("Error updating personal information: " + err.message);
    }
};

const updateStatusMessage = async (userId, statusMessage) => {
    try {
        await dao.updateStatusMessage(userId, statusMessage);
    } catch (err) {
        throw new Error("Error updating status message: " + err.message);
    }
};

const updateProfilePic = async (userId, profilePic) => {
    try {
        await dao.updateProfilePic(userId, profilePic);
    } catch (err) {
        throw new Error("Error updating profile picture: " + err.message);
    }
};

const deleteUser = async (userId) => {
    try {
        await dao.deleteUser(userId);
    } catch(err) {
        throw new Error("Error deleting user: " + err.message);
    }
};

module.exports = {getUserInfo, updatePersonalInfo, updateStatusMessage, updateProfilePic, deleteUser};