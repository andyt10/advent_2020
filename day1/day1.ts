import axios from 'axios';
import * as fs from 'fs';


const API_URL = 'https://adventofcode.com/2020/day/1/input';
const FILE_NAME = 'list.txt';

function parseList(address: string): number {
    axios.get(address)
    .then(resp => {
        console.log(resp.headers);
    })
    .catch(err => {
        console.error(`Got an error: ${err}`);
    })
    return 2
}

function parseListFile(fileName: string): number[] {
    const file = fs.readFileSync(fileName, 'utf-8')
    const as_arr = file.split("\n").map(Number);
    return as_arr;


}

function findNumbers(as_arr: number[], sumDesired: number = 2020): number {
    var val = 0;
    as_arr.forEach((e1, i1) => {
        for (const { i2, e2 } of as_arr.map((e2, i2) => ({ i2, e2 }))) {
            for (const { i3, e3 } of as_arr.map((e3, i3) => ({ i3, e3 }))) {

                if (i3 <= i2) {
                    continue;
                }

                let add = e1 + e2 + e3;
                
                if (add == sumDesired) {
                    console.log('asdasdas');
                    val = e1 * e2 * e3;
                    break;
                }
            }
        }

    });

    //call findAux
    return val;//
}


console.log(findNumbers(parseListFile(FILE_NAME)));
