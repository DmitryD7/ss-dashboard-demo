export type userRoleType = 'user' | 'dev' | 'admin' | 'warper';

export type studioLicenseDataType = {
    sub?: string,
    n: number,
    cancelled: boolean,
    end: number,
    trial: boolean
};

export interface IAccount {
    id: string,
    email: string,
    created: string,
    name?: string,
    role: userRoleType,
    test: boolean,
    customer?: string,
    has_studio_trial?: boolean,
    studio?: studioLicenseDataType,
}