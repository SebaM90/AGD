export interface LoginResponse {
    session_token: string
}

export interface ItemObject {
    id: number
    entities_id: number
    name: string
    serial: any
    otherserial: string
    contact: string
    contact_num?: any
    users_id_tech: number
    groups_id_tech: number
    comment: string
    date_mod: string
    autoupdatesystems_id: number
    locations_id: number
    domains_id: number
    networks_id: number
    computermodels_id: number
    computertypes_id: number
    is_template: number
    template_name?: any
    manufacturers_id: number
    is_deleted: number
    is_dynamic: number
    users_id: number
    groups_id: number
    states_id: number
    ticket_tco: number
    uuid: string
    date_creation: string
    is_recursive: number
}

export interface UserObject {
    id: number
    name: string
    realname: string
    firstname: string
    comment: string
    last_login: string
    date_mod: string
    picture: string
    minPic: string
    maxPic: string
}

export interface SessionUser {
    session: {
        valid_id: number;
        glpi_currenttime: string;
        glpi_use_mode: number;
        glpiID: number;
        glpiname: string;
        glpirealname: string;
        glpifirstname: string;
    }
}