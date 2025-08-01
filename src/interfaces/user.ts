export interface User {
    id:               ID;
    mail:             string;
    username:         string;
    password:         string;
    current_families: Family[];
}

export interface Family {
    id: ID;
    name: string;
}

export interface ID {
    $oid: string;
}
