export default class Employee {
    fullName: string;
    email: string;
    password: string;
    phoneNumber?: string;
    address?: string;
    image?: string;
    userRole?: string;
    id_store?: string;

    constructor(
        fullName: string,
        email: string,
        password: string,
        phoneNumber?: string,
        address?: string,
        image?: string,
        userRole?: string,
        id_store?: string
    ) {
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.image = image;
        this.userRole = userRole;
        this.id_store = id_store;
    }
}