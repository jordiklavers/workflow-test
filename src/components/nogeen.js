console.log("nog een test component")

function createItem(item, itemName) {
    return {
        name: itemName,
        description: "Item description",
        price: 100
    }
}

let buttons = document.querySelectorAll("button")

buttons.forEach(button => {
    button.addEventListener("click", () => {
        createItem(button.dataset.item, button.dataset.itemName); 
    })
})