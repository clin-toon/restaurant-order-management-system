import type { ContactInput } from "../validators/contactValidation";
import type { RegisterInput } from "../validators/validationSchema";
export declare const isUserAlreadyRegistered: (email: string, tbl_name: string) => Promise<number | null>;
export declare const createCustomer: (userData: RegisterInput) => Promise<any>;
export declare const loginUser: (email: string, pass: string) => Promise<any>;
export declare const registerContactInfo: (contactObj: ContactInput) => Promise<any>;
//# sourceMappingURL=user.services.d.ts.map