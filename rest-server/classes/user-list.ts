import { User } from './user';

export class UsersList {
    private list: User[] = [];

    constructor() {}

    /**
     * Add user to list
     * @param user User to add
     */
    public add(user: User): User {
        this.list.push(user);
        console.log(this.list);
        return user;
    }

    /**
     * Update a User's name
     * @param id User's ID
     * @param name Name for user
     */
    public updateName(id: string, name: string): void {
        for (let user of this.list) {
            if (user.id === id) {
                user.name = name;
                break;
            }
        }

        console.log('Updating User');
        console.log(this.list);
    }

    /**
     * Get Users List
     */
    public getList(): User[] {
        return this.list;
    }

    /**
     * Get just a user
     * @param id User's ID to find
     */
    public getUser(id: string): any {
        return this.list.find(user => user.id === id);
    }

    /**
     *
     * @param sala Sala's name
     */
    public getUsersInSala(sala: string): any {
        return this.list.filter(user => {
            return user.sala === sala;
        });
    }

    /**
     * Delete a user
     * @param id User's ID to delete
     */
    public deleteUser(id: string): any {
        const tempUser = this.getUser(id);

        this.list = this.list.filter(user => user.id != id);

        return tempUser;
    }
}
