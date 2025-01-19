import Staff from "./Staff";
import User from "./User";

class Attendance{
    id: number;
    date: Date;
    staff:Staff[];
    createdBy: User;
    createdAt: Date;

    constructor(id: number, date: Date, staff: Staff[], createdBy: User, createdAt: Date){
        this.id = id;
        this.date = date;
        this.staff = staff;
        this.createdBy = createdBy;
        this.createdAt = createdAt;
    }
}

export default Attendance;