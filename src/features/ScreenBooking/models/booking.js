export  class Booking {
    constructor(
        customerName,
        phoneNumber,
        dateBooking,
        id_employee,
        id_store,
        services,
        status,
        price,
        note
    ) {
        this.customerName = customerName;
        this.phoneNumber = phoneNumber;
        this.dateBooking = dateBooking;
        this.id_employee = id_employee;
        this.id_store = id_store;
        this.services = services;
        this.status = status;
        this.price = price;
        this.note = note;
    }
}