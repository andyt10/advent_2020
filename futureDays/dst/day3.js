"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var FILE_NAME = 'day3_input.txt';
var FILE_CHARS;
(function (FILE_CHARS) {
    FILE_CHARS["EMPTY"] = ".";
    FILE_CHARS["TREE"] = "#";
    FILE_CHARS["MISS"] = "O";
    FILE_CHARS["HIT"] = "X";
})(FILE_CHARS || (FILE_CHARS = {}));
var Vector = /** @class */ (function () {
    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }
    return Vector;
}());
function parseFile(fileName) {
    var file = fs.readFileSync(fileName, 'utf-8');
    var as_arr = file.split("\n");
    return as_arr;
}
function fileLinesToEnum(fileData) {
    return fileData.map(function (line) { return line.split('').map(function (x) { return x; }); });
}
function moveLine(numLines, lastVal, theMap, listOfMoves, xMove, yMove) {
    var thisLocation = new Vector(lastVal.x + xMove, lastVal.y + yMove);
    if (numLines === 0 || thisLocation.y > theMap.length - 1) {
        return listOfMoves;
    }
    var thisLine = theMap[thisLocation.y];
    var move = getAtMod(thisLocation, thisLine);
    listOfMoves.push(move);
    return moveLine(numLines - 1, thisLocation, theMap, listOfMoves, xMove, yMove);
}
function getAtMod(location, line) {
    return line[location.x % line.length];
}
// Main
var fileData = fileLinesToEnum(parseFile(FILE_NAME));
var zero = new Vector(0, 0);
var allHits = [];
console.log('FOR 1X1:');
var moves = moveLine(fileData.length, zero, fileData, [], 1, 1);
var hits = moves.filter(function (x) { return x === FILE_CHARS.TREE; }).length;
console.log(hits);
allHits.push(hits);
console.log('FOR 3X1:');
moves = moveLine(fileData.length, zero, fileData, [], 3, 1);
hits = moves.filter(function (x) { return x === FILE_CHARS.TREE; }).length;
console.log(hits);
allHits.push(hits);
console.log('FOR 5X1:');
moves = moveLine(fileData.length, zero, fileData, [], 5, 1);
hits = moves.filter(function (x) { return x === FILE_CHARS.TREE; }).length;
console.log(hits);
allHits.push(hits);
console.log('FOR 7X1:');
moves = moveLine(fileData.length, zero, fileData, [], 7, 1);
hits = moves.filter(function (x) { return x === FILE_CHARS.TREE; }).length;
console.log(hits);
allHits.push(hits);
console.log('FOR 1X2:');
moves = moveLine(fileData.length, zero, fileData, [], 1, 2);
hits = moves.filter(function (x) { return x === FILE_CHARS.TREE; }).length;
console.log(hits);
allHits.push(hits);
console.log(allHits.reduce(function (x, y) { return x * y; }));
//# sourceMappingURL=day3.js.map