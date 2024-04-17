export interface MovieModel {
    id?:string,
    name:string,
    description:string,
    imageUrl:string[],
    rating:number,
    productionYear:number
    cast:string[],
    director:string,
    category:string[],
    clips:string[],
    length:number
}