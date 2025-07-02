type User = { email: string; password: string };
const users: User[] = [];

export function addUser(user: User) {
    users.push(user);
}

export function getUsers() {
    return users;
} 