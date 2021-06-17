import { Entity } from '@loopback/repository';
export declare class Book extends Entity {
    id?: number;
    title: string;
    author: string;
    constructor(data?: Partial<Book>);
}
export interface BookRelations {
}
export declare type BookWithRelations = Book & BookRelations;
