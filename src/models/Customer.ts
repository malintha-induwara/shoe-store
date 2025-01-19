class Customer {
    id: number;
  name: string;
  email: string;
  mobile: string;
  address: string;

    constructor(id: number, name: string, email: string, mobile: string, address: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.address = address;
    }
}

export default Customer;
