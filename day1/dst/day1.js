"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var fs = require("fs");
var API_URL = 'https://adventofcode.com/2020/day/1/input';
var FILE_NAME = 'list.txt';
function parseList(address) {
    axios_1.default.get(address)
        .then(function (resp) {
        console.log(resp.headers);
    })
        .catch(function (err) {
        console.error("Got an error: " + err);
    });
    return 2;
}
function parseListFile(fileName) {
    var file = fs.readFileSync(fileName, 'utf-8');
    var as_arr = file.split("\n").map(Number);
    return as_arr;
}
function findNumbers(as_arr, sumDesired) {
    if (sumDesired === void 0) { sumDesired = 2020; }
    var val = 0;
    as_arr.forEach(function (e1, i1) {
        for (var _i = 0, _a = as_arr.map(function (e2, i2) { return ({ i2: i2, e2: e2 }); }); _i < _a.length; _i++) {
            var _b = _a[_i], i2 = _b.i2, e2 = _b.e2;
            for (var _c = 0, _d = as_arr.map(function (e3, i3) { return ({ i3: i3, e3: e3 }); }); _c < _d.length; _c++) {
                var _e = _d[_c], i3 = _e.i3, e3 = _e.e3;
                if (i3 <= i2) {
                    continue;
                }
                var add = e1 + e2 + e3;
                if (add == sumDesired) {
                    console.log('asdasdas');
                    val = e1 * e2 * e3;
                    break;
                }
            }
        }
    });
    //call findAux
    return val; //
}
console.log(findNumbers(parseListFile(FILE_NAME)));
//# sourceMappingURL=day1.js.map