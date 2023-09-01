"use strict";
exports.__esModule = true;
exports.Role = exports.SettingMode = exports.SettingsEnum = void 0;
var SettingsEnum;
(function (SettingsEnum) {
    SettingsEnum[SettingsEnum["Orders"] = 0] = "Orders";
})(SettingsEnum = exports.SettingsEnum || (exports.SettingsEnum = {}));
var SettingMode;
(function (SettingMode) {
    SettingMode[SettingMode["On"] = 0] = "On";
    SettingMode[SettingMode["Off"] = 1] = "Off";
})(SettingMode = exports.SettingMode || (exports.SettingMode = {}));
var Role;
(function (Role) {
    Role["Customer"] = "customer";
    Role["Admin"] = "admin";
})(Role = exports.Role || (exports.Role = {}));
