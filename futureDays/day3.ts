"use strict";

import * as fs from 'fs';

const FILE_NAME = 'day3_input.txt';

enum FILE_CHARS {
    EMPTY = '.',
    TREE = '#',
    MISS = 'O',
    HIT = 'X'
}

class Vector {
    x: number
    y: number

    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
}


function parseFile(fileName: string): string[] {
    const file = fs.readFileSync(fileName, 'utf-8')
    const as_arr = file.split("\n");
    return as_arr;
}

function fileLinesToEnum(fileData: string[]): FILE_CHARS[][] {
    return fileData.map((line) => line.split('').map((x: FILE_CHARS) => x));
}

function moveLine(numLines: number, lastVal: Vector, theMap: FILE_CHARS[][], listOfMoves: FILE_CHARS[], xMove: number, yMove: number): FILE_CHARS[]  {

    const thisLocation = new Vector(lastVal.x + xMove, lastVal.y + yMove);

    if (numLines === 0 || thisLocation.y > theMap.length - 1) {
        return listOfMoves;
    }

    const thisLine = theMap[thisLocation.y];
    const move = getAtMod(thisLocation, thisLine)
    listOfMoves.push(move);
    return moveLine(numLines - 1, thisLocation, theMap, listOfMoves, xMove, yMove);
    
}

function getAtMod(location: Vector, line: FILE_CHARS[]): FILE_CHARS {
    return line[location.x % line.length];
} 

// Main


let fileData = fileLinesToEnum(parseFile(FILE_NAME));
const zero = new Vector(0,0);

let allHits = []
console.log('FOR 1X1:');
let moves = moveLine(fileData.length,zero,fileData, [],1,1);
let hits = moves.filter(x => x === FILE_CHARS.TREE).length;
console.log(hits);
allHits.push(hits);

console.log('FOR 3X1:');
moves = moveLine(fileData.length,zero,fileData, [],3,1);
hits = moves.filter(x => x === FILE_CHARS.TREE).length;
console.log(hits);
allHits.push(hits);

console.log('FOR 5X1:');
moves = moveLine(fileData.length,zero,fileData, [],5,1);
hits = moves.filter(x => x === FILE_CHARS.TREE).length;
console.log(hits);
allHits.push(hits);

console.log('FOR 7X1:');
moves = moveLine(fileData.length,zero,fileData, [],7,1);
hits = moves.filter(x => x === FILE_CHARS.TREE).length;
console.log(hits);
allHits.push(hits);

console.log('FOR 1X2:');
moves = moveLine(fileData.length,zero,fileData, [],1,2);
hits = moves.filter(x => x === FILE_CHARS.TREE).length;
console.log(hits);
allHits.push(hits);

console.log(allHits.reduce((x,y) => x * y));








