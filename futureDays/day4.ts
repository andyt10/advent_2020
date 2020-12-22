"use strict";

import * as fs from 'fs';

const FILE_NAME = 'day4_input.txt';

class Passport {
    
    byr: number
    iyr: number
    eyr: number
    hgt: string
    hcl: string
    ecl: string
    pid: string
    cid: number

    constructor(fromAttribs: string[]) {
        fromAttribs.forEach(element => {
            const attrib = element.split(":");
            this[attrib[0]] = attrib[1]
        });
    }

    private hasRequiredFields(): boolean {
        const NUM_FIELDS = 8
        const allowedNull = 'cid';
        const required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

        if (Object.keys(this).length === NUM_FIELDS) {
            return true;
        }

        // Typescript doesn't let you do reflection AFAIK, but that is what I was thinking of with this.
        const missingallowed =  Object.keys(this).indexOf(allowedNull) === -1 ? true : false;
        const hasAllOthers = Object.keys(this).length === required.length;

        return missingallowed && hasAllOthers

    }

    public isValid(): boolean {
         
        const isValid = this.hasRequiredFields() &&
        this.validateBirthYear() &&
        this.validateIssueYear() &&
        this.validateExpiryYear() &&
        this.validateHeight() &&
        this.validateHairColour() &&
        this.validateEyeColour() &&
        this.validatePassportId()

        return isValid
    }

    private validateBirthYear(): boolean {
        return 1920 <= this.byr && this.byr <= 2002;
    }

    private validateIssueYear(): boolean {
        return 2010 <= this.iyr && this.iyr <= 2020;
    }

    private validateExpiryYear(): boolean {
        return 2020 <= this.eyr && this.eyr <= 2030;
    }

    private validateHeight(): boolean {
        if (/^(1[5-8][0-9]cm|19[0-3]cm)/g.test(this.hgt)) {
            return true;
        }
        
        if (/^((59|6[0-9]|7[0-6])in)/g.test(this.hgt)) {
            return true;
        } 

        return false;
    }

    private validateHairColour(): boolean {
        return /^#([0-9]|[a-f]){6}$/.test(this.hcl);
    }

    private validateEyeColour(): boolean {
        switch(this.ecl) {
            case "amb": return true;
            case "blu": return true;
            case "brn": return true;
            case "gry": return true;
            case "grn": return true;
            case "hzl": return true;
            case "oth": return true;
            default: return false;
        }
    }

    private validatePassportId(): boolean {
        return /^[0-9]{9}$/.test(this.pid)
    }
}



function parseFileToPassports(fileName: string): string[] {
    const file = fs.readFileSync(fileName, 'utf-8')
    const as_arr = file.split("\n\n");
    return as_arr;
}

let passportsValid = 0;

parseFileToPassports(FILE_NAME).forEach(passportData => {
    const firstPassport = passportData.replace(/\n/g, " ").split(" ");
    const passport = new Passport(firstPassport);
    const isValid = passport.isValid();
    if (isValid) {
        passportsValid+=1;
    }
    //console.log(passport);
    //console.log(`Is Passport Valid: ${isValid}`);
    //console.log("------");

});

console.log(`Total Valid: ${passportsValid}`)