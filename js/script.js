// select element
const inpSearch = document.querySelector('#inp-search')
const inputSearch = document.querySelector('#inp-search>input')
const counter = document.querySelector('#counter')
const checkInput = document.querySelectorAll('.check-input')
const itemsDom = document.querySelector('#items-dom')
// select element


// product list
let productsList = [
    { id: 1, productName: 'Sony Playstation 5', productImg: 'img/SonyPlaystation5.webp', productPrice: 499.99, isFilter: false, filterName: 'games' },
    { id: 2, productName: 'Samsung Galaxy', productImg: 'img/SamsungGalaxy.webp', productPrice: 399.99, isFilter: false, filterName: 'smartphones' },
    { id: 3, productName: 'Cannon EOS Camera', productImg: 'img/CannonEOSCamera.webp', productPrice: 749.99, isFilter: false, filterName: 'camera' },
    { id: 5, productName: 'LG TV', productImg: 'img/LGTV.webp', productPrice: 799.99, isFilter: false, filterName: 'televisions' },
    { id: 4, productName: 'Sony A7 Camera', productImg: 'img/SonyA7Camera.webp', productPrice: 1_999.99, isFilter: false, filterName: 'camera' },
    { id: 6, productName: 'Nintendo Switch', productImg: 'img/NintendoSwitch.webp', productPrice: 299.99, isFilter: false, filterName: 'games' },
    { id: 7, productName: 'Xbox Series X', productImg: 'img/XboxSeriesX.webp', productPrice: 499.99, isFilter: false, filterName: 'games' },
    { id: 8, productName: 'Samsung TV', productImg: 'img/SamsungTV.webp', productPrice: 1_099.99, isFilter: false, filterName: 'televisions' },
    { id: 9, productName: 'Google Pixel', productImg: 'img/GooglePixel.webp', productPrice: 499.99, isFilter: false, filterName: 'smartphones' },
    { id: 10, productName: 'Sony ZV1F Camera', productImg: 'img/SonyZV1FCamera.webp', productPrice: 799.99, isFilter: false, filterName: 'camera' },
    { id: 11, productName: 'ToshibaTV', productImg: 'img/ToshibaTV.jfif', productPrice: 499.99, isFilter: false, filterName: 'televisions' },
    { id: 12, productName: 'iPhone 14', productImg: 'img/iPhone14.webp', productPrice: 999.99, isFilter: false, filterName: 'smartphones' },
]
// product list

let filteredProducts = productsList


// onload add to DOM
document.addEventListener('DOMContentLoaded', () => {
    // add products
    let products = JSON.parse(localStorage.getItem('allProducts')) || productsList
    addToDom(products)

    // add checkbox checked
    let checks = JSON.parse(localStorage.getItem('checkList')) || []
    if (checks.length > 0) {
        checks.forEach(check => {
            checkInput.forEach(inp => {
                if (inp.getAttribute('id') === check) {
                    inp.checked = true
                }
            })
        })
        filterCheckboxes(checks)
    }
})
// onload add to DOM


// add to DOM
function addToDom(products) {
    const div = document.createElement('div')
    div.className = 'w-full flex flex-wrap justify-around lg:justify-start lg:gap-10'
    let temp = ''
    itemsDom.innerHTML = ''
    products.forEach(item => {
        temp += `<div class="w-[45%] sm:w-[30%] lg:w-[22%] h-[380px] my-8 rounded-xl overflow-hidden">
                        <img src="${item.productImg}" alt="" class="w-full h-[230px]">
                        <button class="w-full block h-14 bg-slate-900 text-white font-semibold">ADD To Cart</button>
                        <h4 class="text-white font-semibold text-[22px] mt-2 mb-1">${item.productName}</h4>
                        <span class="text-white font-semibold text-lg">$${item.productPrice}</span>
                    </div>`
    })
    div.innerHTML = temp
    itemsDom.append(div)
    localStorage.setItem('allProducts', JSON.stringify(products))
}
// add to DOM


// filter based on checkbox
let checkedList = JSON.parse(localStorage.getItem('checkList')) || []

checkInput.forEach(check => {
    check.addEventListener('click', e => {
        const filterValue = e.target.getAttribute('id')

        if (check.checked) {
            checkedList.push(filterValue)
        } else {
            checkedList = checkedList.filter(item => item !== filterValue)
        }

        localStorage.setItem('checkList', JSON.stringify(checkedList))
        filterCheckboxes(checkedList)
    })
})

function filterCheckboxes(activeFilters) {
    if (activeFilters.length > 0) {
        filteredProducts = productsList.filter(product => activeFilters.includes(product.filterName))
    } else {
        filteredProducts = productsList
    }

    addToDom(filteredProducts)
}
// filter based on checkbox