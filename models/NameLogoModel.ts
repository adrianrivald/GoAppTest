export type NameLogoModelType = {
    uid: number;
    directory: NameLogoDirectoryModelType;
    name: string;
    logo: LogoModelType;
    logo_path: string;
}

export type NameLogoDirectoryModelType = {
    uid: number;
    name: string
}

export type LogoModelType = {
    image_url: string;
    title: string;
}
