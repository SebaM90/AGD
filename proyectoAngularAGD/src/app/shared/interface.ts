export interface LoginResponse {
    session_token: string
}

export interface QRCodeRead {
    type: string
    id: number
    id_inventory: string
    qr_date: string
    qr_hour: string
}

export interface Search {
    totalcount: number;
    count: number;
    sort: number;
    order: string;
    data?: [{}] | null;
    'content-range': string;
}

export interface ItemComputer {
    itemType: string // Este esta Hardcodeado
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
    _devices?:{
        Item_DeviceFirmware?:{
                [key:string]:object
            }
        Item_DeviceProcessor?:{
                [key:string]:object
            }
        Item_DeviceMemory?:{
                [key:string]:object
            }
        Item_DeviceHardDrive?:{
                [key:string]:object
            }
        Item_DeviceNetworkCard?:{
                [key:string]:object
            }
        Item_DeviceDrive?:{
                [key:string]:object
            }
        Item_DeviceGraphicCard?:{
                [key:string]:object
            }
        Item_DeviceControl?:{
                [key:string]:object
            }
    }
    _disks: object
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