import {Observable} from "rxjs/Observable";

/**
 * readonly - só para leitura
 */
export interface ChatGroup {
    readonly id: number;
    readonly name: string;
    readonly photo_url: string;
    is_member?: Observable<boolean>;
    last_message?: Observable<ChatMessage>;
    viewed: boolean;
    readonly created_at?: {date: string};
    readonly updated_at?: {date: string};

}

export interface ChatMessage {
    type: string;
    content: string;
    user_id: string;
    user$?: Observable<{ name: string, photo_url: string }>
    user?: User;
    created_at: number;
}

export enum OrderStatus {
    STATUS_PENDING = 1,
    STATUS_APPROVED = 2,
    STATUS_CANCELLED = 3,
    STATUS_SENT = 4
}

export interface Order {
    readonly id: number,
    readonly total: number,
    readonly status: OrderStatus,
    readonly payment_link: string,
    readonly product: Product,
    readonly amount: number,
    readonly price: number,
    readonly user: User,
    readonly obs: string,
    readonly created_at?: { date: string };
    readonly updated_at?: { date: string };
}

export interface User {
    id?: number;
    name: string;
    email: string;
    role: Role;
    password?: string;
    profile?: UserProfile;
    readonly created_at?: { date: string }
    readonly updated_at?: { date: string }
}

export enum Role {
    SELLER = 1,
    CUSTOMER = 2
}

export interface UserProfile {
    readonly photo_url: string;
    readonly phone_number: string;
    readonly has_photo: boolean;
    readonly firebase_uid: string;
}

export interface ProductPhoto {
    readonly id: number;
    readonly photo_url: string;
    readonly created_at: { date: string }
    readonly updated_at: { date: string }
}

export interface Product {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly price: number;
    readonly photo_url: string;
    readonly created_at: { date: string }
}

export interface Category {
    readonly id: number;
    readonly name: string;
    readonly slug: string;
    readonly active: boolean;
    readonly created_at: { date: string };
    readonly updated_at: { date: string };
}