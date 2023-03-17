module.exports = class Onyx {
    constructor() {
        this.name = 'Onyx';
    }

    save() {
        console.log('Saving ' + this.name);
    }

    static fetchAll() {
        console.log('Fetching all ' + this.name);
    }
}