import { ShoppingCartItem } from '../models/shopping-cart-item';
import { Product } from '../models/product';

export class ShoppingCart {
   items : ShoppingCartItem[] = [];
   constructor(public  itemsmap : {[productId:string] : ShoppingCartItem}){
        this.itemsmap = itemsmap || {};
         for(let productId in itemsmap){
             let item = itemsmap[productId];
         
             let x= new ShoppingCartItem({
                ...item,
                $key : productId
             });
             
             this.items.push(x); 
             
         }
   }
   
     get totalPrice(){
         let sum = 0;
         for(let productId in this.items){
             sum+=this.items[productId].totalPrice;
         }
         return sum;
     }

     getQuantity(product : Product){
        let item = this.itemsmap[product.$key];
        return item ? item.quantity :0;
    }
   
    get totalItemsCount(){
              let count=0;
         for(let productId in this.items){
              count += this.items[productId].quantity;
         }
           return count;
    }

}