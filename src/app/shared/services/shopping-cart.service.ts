import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Product } from 'shared/models/product';
import 'rxjs/operator/take';
import 'rxjs/operator/map';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {


  item : any;
  cart;
  private cartItemCount : number;
   
  constructor(private db:AngularFireDatabase) {  

  }

  async getCart() : Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();
   return this.db.object('/shopping-carts/'+cartId)
     .map( x => new ShoppingCart(x.items));
 }

 async addToCart(product : Product){
  this.updateItem(product,1);
  
}


async removeFromCart(product : Product){
this.updateItem(product,-1);

}


async clearCart(){
  let cartId = await this.getOrCreateCartId();
      this.db.object('/shopping-carts/' + cartId + '/items').remove();
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



  private cartCreate(){
    return this.db.list('/shopping-carts/').push({
           dateCreated : new Date().getTime(),
           quantity:{}
    });
  }


  private getItem(cartId:string, product:string){
       return this.db.object('/shopping-carts/'+ cartId + "/items/"+ product);
  }

  



  private async updateItem(product : Product, change : number){
    let cartId = await this.getOrCreateCartId();
     let item$ = this.getItem(cartId,product.$key);

       item$.take(1).subscribe(item => {
        let quantity = (item.quantity || 0) + change;
         if(quantity ===0) item$.remove();
         else
              item$.update({
                title : product.title,
                imageUrl : product.imageUrl,
                price : product.price,
                quantity : quantity
              });
        });

  }


}
