const themeBtn = document.querySelector(".theme-btn");
const productNameElement = document.querySelector(".productNameInput");
const productCountElement = document.querySelector(".productCountInput");
const productPriceElement = document.querySelector(".productPriceInput");
const submitBtn = document.querySelector(".submitBtn");
const sumPrice = document.querySelector(".sumPrice");
const tableContainer = document.querySelector(".tableContainer");
if(!localStorage.getItem("theme")){
    localStorage.setItem("theme","light");
}

let theme = localStorage.getItem("theme");
if(theme == "dark"){
    document.querySelector("html").className = "dark";
    themeBtn.innerHTML = `<svg class="w-10 h-10"><use href="#sun"></use></svg>`;


}else{
    document.querySelector("html").className = "light";


}

let products = [

];

const deleteRow = (event,productID)=>{
    console.log(event.target)
    const clickedTagName = event.target.tagName;
    let productRow;
    if(clickedTagName == "use") {
        productRow = event.target.parentElement.parentElement.parentElement.parentElement;
        console.log(productRow);
    } else if(clickedTagName == "svg"){
        productRow = event.target.parentElement.parentElement.parentElement;
        console.log(productRow);
    }
    // Detect product index in products array
    let productIndex = products.findIndex((productitem)=>{
        return productitem.id == productID;
    });
    console.log(productIndex)
    // delete elem and product from database
    products.splice(productIndex,1);
    productRow.remove();
    updatePrice();
    console.log(products)
};

const addProduct = (e)=>{
    e.preventDefault();
    let productName = productNameElement.value;
    let productCount = +productCountElement.value;
    let productPrice = +productPriceElement.value;
    if(productName && productCount && productPrice){
        // add to products list
        let productID = products.length+1;
        products.push({id:products.length+1,name:productName,count: productCount,price:productPrice,sum:productCount*productPrice});
        console.log(products)
        tableContainer.insertAdjacentHTML("beforeend", `
        <tr class="productRow">
            <td class="border p-2 w-[120px] md:w-auto"><p class="w-[100px] md:w-auto break-words whitespace-normal">${productName}</p></td>
            <td class="border p-2 w-[50px] md:w-auto"><p class="w-[40px] md:w-auto break-words whitespace-normal">${productCount}</p></td>
            <td class="border p-2 w-[50px] md:w-auto"><p class="w-[40px] md:w-auto break-words whitespace-normal">${productPrice.toLocaleString()}</p></td>
            <td class="border p-2 w-[50px] md:w-auto"><p class="w-[40px] md:w-auto break-words whitespace-normal">${(productCount * productPrice).toLocaleString()}</p></td>
            <td class="border p-2"><div class="inline-block" onclick="deleteRow(event,${productID})"><svg class="w-6 h-6 cursor-pointer"><use href="#trash"></use></svg></div></td>
        </tr>
`);
    }else{

        alert("لطفا همه فیلد هارو پر کنید");
    }
    updatePrice();
    productNameElement.value = "";
    productCountElement.value = "";
    productPriceElement.value = "";
};

const updatePrice = ()=>{
    let sum = 0;
    products.forEach((item)=>{
        sum += item.sum;
    });
    sumPrice.innerHTML = sum;
};

const changeTheme = (e)=>{
    theme = localStorage.getItem("theme");
    // check
    if(theme == "light"){
        // change icon and change class to dark
        // change icon
        themeBtn.innerHTML = `<svg class="w-10 h-10"><use href="#sun"></use></svg>`;
        // change class
        document.querySelector("html").className = "dark";
    //     change in localstorage
        localStorage.setItem("theme","dark");
    }else{
        // change icon and change class to light
        // change icon
        themeBtn.innerHTML = `<svg class="w-10 h-10"><use href="#moon"></use></svg>`;
        // change class
        document.querySelector("html").className = "light";
        //     change in localstorage
        localStorage.setItem("theme","light");

    }
}
submitBtn.addEventListener("click",addProduct);
themeBtn.addEventListener("click",changeTheme);












