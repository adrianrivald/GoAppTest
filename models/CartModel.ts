export type CartModelType = {
    bill_to: null
    channel: ChannelModelType;
    company: null
    contact: ContactModelType;
    discounts: [];
    id: number;
    lines: LinesModelType[];
    lines_discount: string;
    lines_tax: string;
    lines_total: string;
    payment_method: null;
    payment_method_name: null;
    payment_term: null;
    requested_at: null;
    requested_by: null;
    service_discount: string;
    service_fee: string;
    ship_to: null;
    shipping_discount: string;
    shipping_fee: string;
    shipping_method: null;
    total_excl_tax: null;
    total_incl_tax: null;
    uid: number ;
}

export type ChannelModelType = {
    uid: number;
    name: string; 
    channel_type: string;
    account_type: null;
}

export type ContactModelType = {
    uid: number;
    first_name: string; 
    last_name: null; 
    email: string; 
    mobile_no: null;
    business: {
        uid: number
    }
}

export type LinesModelType = {
    product: { 
        uid: number; 
    },
    quantity: number;
}