import secureRandom from 'secure-random';
import { SHA3 } from 'sha3';

export class GeneratingKey {
    constructor() {
        this.key = this.createRandomKey();
    };

    createRandomKey() {
        const hash = new SHA3(256);
        hash.update(secureRandom(32).join(','));
        return hash.digest('hex');
    };
};