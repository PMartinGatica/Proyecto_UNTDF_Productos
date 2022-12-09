import { IProductImages } from "./IProductImages";

export interface IProductDetails {
    status: boolean;
    brands: string;
    images: IProductImages;
    ingredients: string[];
    nutriscore: string;
    quantity: string;
}
