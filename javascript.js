function productSuggestions() {
    //selecting input
    const productInput = document.querySelector('#productInput');

    productInput.addEventListener("input", (event) => {
        //selecting our datalist
        const productList = document.querySelector('#productOptions');

        //if we already have divs underneath datalist (options) from
        //previous search, we delete them
        if(productList.hasChildNodes) {
            const productOptions = document.querySelectorAll('#productOption');

            for(const productOption of productOptions) {
                productOption.remove();
            }
        }

        //min 2 letter search term for the url
        let searchTerm = productInput.value;

        //where the arrays are
        const url = `https://api.frontendeval.com/fake/food/${searchTerm}`;

        if(searchTerm.length < 2) {
            return [];
        } else {
            return fetch(url)
                .then(response => response.json())
                .then(data => {
                    for(let i = 0; i < data.length; i++) {
                        const productOption = document.createElement('option');
                        productOption.value = data[i];
                        productOption.setAttribute('id', "productOption");
                        productList.appendChild(productOption);
                    }
                })
                .catch(error => {
                    console.error("Error fetching suggestions: ", error);
                    return [];
                });
        }
    });

    //when the user clicks on one of the options underneath our datalist
    productInput.addEventListener("change", (event) => {
        const page = document.querySelector('#page');
        
        const addedItem = document.createElement('div');
        addedItem.setAttribute('id', "addedItem");
        page.appendChild(addedItem);

        const checkmark = document.createElement('div');
        checkmark.innerHTML = "&#10003;";
        checkmark.setAttribute('id', "checkmark");
        addedItem.appendChild(checkmark);

        const productText = document.createElement('div');
        productText.textContent = event.target.value;
        productText.setAttribute('id', "productText");
        addedItem.appendChild(productText);

        //when the user presses on an "option" underneath our datalist
        //we want the input box to be empty again for ease of use
        productInput.value = "";
        
        const xMark = document.createElement('div');
        xMark.innerHTML = "&#10007;";
        xMark.setAttribute('id', "xMark");
        addedItem.appendChild(xMark);

        checkmark.addEventListener("click", (event) => {
            //to check
            if(event.target.style.backgroundColor != "greenyellow") {
                event.target.style.backgroundColor = "greenyellow";
                checkmark.nextSibling.style.textDecoration = "line-through";
                checkmark.nextSibling.nextSibling.style.color = "gray";
            } else { //to uncheck
                event.target.style.backgroundColor = "whitesmoke";
                checkmark.nextSibling.style.textDecoration = "none";
                checkmark.nextSibling.nextSibling.style.color = "black";
            }
        });

        //to delete/remove
        xMark.addEventListener("click", (event) => {
            if(event.target.style.color != "gray") {
                xMark.parentElement.remove();
            }
        });
    });
}

productSuggestions();