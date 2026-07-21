import type { ContactInput } from "../validators/contactValidation";
export declare const insertTheContactData: (body: ContactInput) => Promise<boolean>;
export declare const getAllTheContactQurey: () => Promise<any[]>;
export declare const getTheContactStatus: (email: string) => Promise<{
    count: number;
    contact: any[];
}>;
export declare const updateTheStatus: (id: any) => Promise<{
    count: number | null;
    contact: any[];
}>;
//# sourceMappingURL=admin.contact.services.d.ts.map