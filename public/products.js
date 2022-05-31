const addToCart = document.querySelectorAll('#add')
const cartAmount = document.getElementById('cart')
const productImg = document.getElementById('product_img')
const product = document.getElementById('product')
let num;
let value = JSON.parse(localStorage.cart)
if(value == 'undefiend' || value == null){
    num = 0
}else {
    num = value.length
}
let shopping = []
if(num > 0){
    value.forEach(v=>{
        shopping.push(v)
    })
}
addToCart.forEach(cart=>{
    cart.addEventListener('click', (e)=>{
        e.preventDefault()
        num++
        cartAmount.innerHTML = num
        let products = e.target.name.split(', ')
        let data = {
            product_id: products[0],
            product_name: products[1],
            product_img: products[2] 
        }
        shopping.push(data)
        localStorage.setItem('cart', JSON.stringify(shopping))
    })
})

function getFromLocalStorage(value){
    if(localStorage.value == null || localStorage.value == 'undefiend'){
        return
    }else {
        return JSON.parse(localStorage.value)
    }
}