export class User {
    public id: string;
    public name: string;
    public sala: string;

    constructor(id: string) {
        this.id = id;
        this.name = 'unknown';
        this.sala = 'sin-sala';
    }
}
