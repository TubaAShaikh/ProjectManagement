export class Project {
    _id:            string;
    name:           string;
    manager:        string;
    progress:       number;
    status:         string;
    start_date?:     string;
    end_date?:       string;
    exp_start_date: string;
    exp_end_date:   string;
    documents:      Document[];
    customer?:      Customer;
    tasks?:         Task[];
    details:        string;
    active:         boolean;
}

export class Task {
    _id:            string;
    name:           string;
    progress:       number;
    status:         string;
    start_date?:     string;
    end_date?:       string;
    exp_start_date: string;
    exp_end_date:   string;
    documents:      Document[];
    active:         number;
    team_leader:   string;
    members?:       number[];
    subtasks?:      Task[];
    details:        string;
}

export class Customer {
    name:          string;
    address:       string;
    contactperson: string;
    email:         string;
    contact:        string;
}

export class Document {
    filename: string;
}

export class User {
    _id:           number;
    name:          string;
    email:         string;
    contact:       string;
    address:       string;
    city:          string;
    State:         string;
    qualification: string;
    domain:        string;
    platform:      string;
    username:      string;
    passwordhash:  string;
    role:          string;
}
