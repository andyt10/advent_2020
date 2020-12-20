import * as fs from 'fs';

const FILE_NAME = 'input.txt';

function parseListFile(fileName: string): string[] {
    const file = fs.readFileSync(fileName, 'utf-8')
    const as_arr = file.split("\n");
    return as_arr;


}

class Password {
    policy: PasswordPolicy
    password: string

    public meetsPolicy(): boolean {
        return this.policy.passwordMeetsPolicy(this.password);
    }

    constructor(fromString: string) {
        const parsedEntry = fromString.split(":");
        this.policy = new PasswordPolicy(parsedEntry[0]);
        this.password = parsedEntry[1].trim();
    }
}

class PasswordPolicy {
    minCount: number
    maxCount: number
    character: string

    constructor(fromString: string) {
        const splitOne = fromString.split("-");
        const splitTwo = splitOne[1].split(" ");
        this.minCount = splitOne[0] as unknown as number;
        this.maxCount = splitTwo[0] as unknown as number;
        this.character = splitTwo[1];
    }

    public passwordMeetsPolicy(password: string): boolean {
        const asArray = password.split("");
        console.log(asArray);

        if (asArray[this.minCount -1] !== this.character && asArray[this.maxCount -1] !== this.character) {
            return false
        }
        if (asArray[this.minCount -1] == asArray[this.maxCount -1]) {
            return false
        }

        return true;
    }
}

const datFromFile = parseListFile(FILE_NAME).map(x => new Password(x));
const numberOfValid = datFromFile.filter((x) => x.meetsPolicy()).length;

console.log(`Have ${numberOfValid} valid passwords from list.`);

