import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from '../models/product';
import 'rxjs/operator/take';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {


  item : any;
  private cartItemCount : number;
   
  constructor(private db:AngularFireDatabase) {  

  }


private async getOrCreateCartId(){
  let cartId = localStorage.getItem('cartId');
    if(!cartId){
        let result= await this.cartCreate();
        localStorage.setItem('cartId',result.key);
         return result.key;
    }
    return cartId;
  } 

 async getCart(){
   let cartId = await this.getOrCreateCartId();
  return this.db.object('/shopping-carts/'+cartId);
}

  private cartCreate(){
    return this.db.list('/shopping-carts/').push({
           dateCreated : new Date().getTime(),
           quantity:{}
    });
  }


  private getItem(cartId:string, product:string){
       return this.db.object('/shopping-carts/'+ cartId + "/items/"+ product);
  }

  async addToCart(product : Product){
       this.updateItemQuantity(product,1);
       
  }

  async removeFromCart(product : Product){
    this.updateItemQuantity(product,-1);
    
}

  private async updateItemQuantity(product : Product, change : number){
    let cartId = await this.getOrCreateCartId();
       let item$ = this.getItem(cartId,product.$key);
       item$.take(1).subscribe(item => {
              item$.update({product : product, quantity : (item.quantity || 0) + change});
        });

  }

   getItemQuantity(items){
     this.cartItemCount = 0;
    for (let item in items){
      this.cartItemCount += items[item].quantity;
     }
     return this.cartItemCount
  }
      
}
