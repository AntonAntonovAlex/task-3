import { createHmac } from 'node:crypto';
import { GeneratingRandomNumber } from './generatingRandomNumber.js';
import { GeneratingKey } from './generatingKey.js';

export class GeneratingHmac {
    constructor(min, max) {
        this.key = new GeneratingKey().key;
        this.randomNumber = new GeneratingRandomNumber(min, max).randomNumber;
        this.hmac = this.createRandomHmac();
    };

    createRandomHmac() {
        const hash = createHmac('sha256', this.key)
            .update(this.randomNumber.toString())
            .digest('hex');
        return hash;
    };
};
