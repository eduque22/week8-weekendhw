
import { v4 as uuidv4 } from "uuid";



class Product {
    private _id: string;
    private _name: string;
    private _price: number;
    private _description: string;

    constructor(name:string, price:number, description:string) {
        this._id =uuidv4();
        this._name = name;
        this._price = price;
        this._description = description
    }

    public get id():string {
        return this._id
    }

    public get name():string {
        return this._name
    }

    public set name(name:string) {
        this._name = name
    }

    public get price():number {
        return this._price
    }

    public set price(price:number) {
        this._price = price
    }

    public get description():string {
        return this._description
    }

    public set description(description:string) {
        this._description = description
    }

    itemElement() {
        const itemContainer = document.createElement('div')
        itemContainer.innerHTML = `
            <h2>${this._name}</h2>
            <p>${this._price}</p>
            <p>${this._description}</p>
            <button id='${this._id}'>Add to Cart</button>
        `
        const addToCartbutton = document.querySelector(`#${this._id}`)
        addToCartbutton?.addEventListener('click', ()=>{
            console.log('button was clicked', this._id)
        })
        return itemContainer
    }
}

class User {
    private _id: string;
    private _name: string;
    private _age: number;
    private _cart: Product[];

    constructor(name:string, age:number) {
        this._id = uuidv4();
        this._name = name;
        this._age = age;
        this._cart = []
    }

    public get id():string {
        return this._id
    }

    public get name():string {
        return this._name
    }

    public set name(name:string) {
        this._name = name
    }

    public get age():number {
        return this._age
    }

    public set age(age:number) {
        this._age = age
    }

    public get cart():Product[] {
        return this._cart
    }

    addToCart(product:Product) {
        return this._cart.push(product)
    }

    removeFromCart(product:Product) {
        let i = 0
        while (i < this._cart.length) {
            if (this._cart[i] === product) {
                this._cart.splice(i, 1)
            } else {
                ++i
            }
        }
        return User
    }

    removeQua(product:Product, q:number) {
        let index = this._cart.indexOf(product)
        if (index > -1) {
            this._cart.splice(index, q)
        }
        return User
    }

    cartTotal() {
        let total = 0
        for (let product of this._cart) {
            total += product.price
        }
        return total
    }

    printCart():void {
        console.log('You\'re current cart:\n', this._cart)
    }

    static createUser() {
        const nameInput: HTMLInputElement | null = document.querySelector('#name');
        const ageInput: HTMLInputElement | null = document.querySelector('#age');
        if(nameInput && ageInput){
            const user = new User(nameInput.value, Number(ageInput.value))
            return user;
        } else {
            return  null
        }
     }

     cartHTMLElement() {
        const cartContent = document.querySelector('#cart-content')
        this._cart.forEach((item)=>{
            const prodName = document.createElement('h2')
            prodName.innerText = item.name
            const price = document.createElement('p')
            price.innerText = String(item.price)
            const desc = document.createElement('p')
            desc.innerText = item.description
            const itemContainer = document.createElement('div')
            itemContainer.appendChild(prodName)
            itemContainer.appendChild(price)
            itemContainer.appendChild(desc)
            cartContent?.appendChild(itemContainer)
        })
        this.printCart()
     }

}

class Panacea {
    private _products: Product[];
    public static myUser: User | undefined

    constructor() {
        this._products = [
            new Product('Navy Blue Beanie', 19.99, 'Navy blue beanie made from cashmere and merino wool.'),
            new Product('Oxblood Crewneck', 32.99, 'GOTS Organic certified crewneck.'),
            new Product('Military Olive Hoodie', 39.99, 'GOTS Organic certified hoodie.'),
            new Product('Red Beanie', 19.99, 'Red beanie made from cashmere and merino wool.'),
            new Product('Orange Crewneck', 32.99, 'GOTS Organic certified crewneck.'),
            new Product('Blue Hoodie', 39.99, 'GOTS Organic certified hoodie.')
        ];
        this.showItems()
        this.updateCart()
    }
    get products(): Product[] {
        console.log(this._products)
        return this._products
    }


     public addItemsToCart (user:User):void {
        this.products.forEach((product:Product)=>{
            user.addToCart(product)
        })
    }

    showItems() {
        const shopContent = document.querySelector('#shop-content')
        this.products.forEach((product)=>{

            shopContent?.appendChild(product.itemElement())
        })
    }

    updateCart() {
        console.log(Panacea.myUser)
        if (Panacea.myUser?.cart?.length! > 0){
            Panacea.myUser?.cartHTMLElement()
        } else {
            const cartContent = document.querySelector('#cart-content')
            if (cartContent){
                cartContent.innerHTML = `<p>Cart is empty</p>`
            }
        }
    }



    public static loginUser(event:Event):void {
        event.preventDefault();
        const user = User.createUser()
        if (user) {
            Panacea.myUser = user;
            const store = new Panacea()
            // console.log(store.products)
            // store.products.forEach((product:Product)=>{
            //     Panacea.user?.addToCart(product)
            // })
            // user.cartHTMLElement()
            // store.showItems()
            // store.updateCart()
        }
    }

}


// const pantext = new Panacea();


document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById("loginForm")
    loginForm?.addEventListener('submit', Panacea.loginUser)

});