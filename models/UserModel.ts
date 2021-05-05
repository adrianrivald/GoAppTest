export type UserModelType = {
    username: string;
    password: string;
    otp_code: string
};

export type AuthModelType = {
    address: string;
    method: string;
}

export type UserInfoModelType = {
    business_name: string;
    business_uid: number;
    companies: []
    email: string;
    first_name: string;
    is_staff: boolean
    last_name: null
    mobile_no: null
    uid: number
    username: string;
}