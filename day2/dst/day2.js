"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var FILE_NAME = 'input.txt';
function parseListFile(fileName) {
    var file = fs.readFileSync(fileName, 'utf-8');
    var as_arr = file.split("\n");
    return as_arr;
}
var Password = /** @class */ (function () {
    function Password(fromString) {
        var parsedEntry = fromString.split(":");
        this.policy = new PasswordPolicy(parsedEntry[0]);
        this.password = parsedEntry[1].trim();
    }
    Password.prototype.meetsPolicy = function () {
        return this.policy.passwordMeetsPolicy(this.password);
    };
    return Password;
}());
var PasswordPolicy = /** @class */ (function () {
    function PasswordPolicy(fromString) {
        var splitOne = fromString.split("-");
        var splitTwo = splitOne[1].split(" ");
        this.minCount = splitOne[0];
        this.maxCount = splitTwo[0];
        this.character = splitTwo[1];
    }
    PasswordPolicy.prototype.passwordMeetsPolicy = function (password) {
        var asArray = password.split("");
        console.log(asArray);
        if (asArray[this.minCount - 1] !== this.character && asArray[this.maxCount - 1] !== this.character) {
            return false;
        }
        if (asArray[this.minCount - 1] == asArray[this.maxCount - 1]) {
            return false;
        }
        return true;
    };
    return PasswordPolicy;
}());
var datFromFile = parseListFile(FILE_NAME).map(function (x) { return new Password(x); });
var numberOfValid = datFromFile.filter(function (x) { return x.meetsPolicy(); }).length;
console.log("Have " + numberOfValid + " valid passwords from list.");
//# sourceMappingURL=day2.js.map