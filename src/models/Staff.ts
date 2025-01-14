class Staff{
    id:number;
    name:string;
    email:string;
    mobile:string;
    address:string;
    role:string;
    hireDate:Date;

    constructor(id:number, name:string, email:string, mobile:string, address:string, role:string, hireDate:Date){
        this.id = id;
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.address = address;
        this.role = role;
        this.hireDate = hireDate;
    }
}

export default Staff;