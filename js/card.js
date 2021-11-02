class Card{
    constructor(id){
        this.cardBody = document.createElement("div");
        this.backColor = "red";
        this.canFlip = true;
        this.id = id;
        switch(id){
            case 1:
                this.frontColor = "blue";
                break;
            case 2:
                this.frontColor = "green";
                break;
            case 3:
                this.frontColor = "pink";
                break;
            case 4:
                this.frontColor = "purple";
                break;
            case 5:
                this.frontColor = "orange";
                break;
            case 6:
                this.frontColor = "cyan";
                break;
        }
        this.isReturned = false;
        this.cardBody.classList.add("cardClass");
        this.event = this.cardBody.addEventListener("click",x => setTimeout(() => this.flip(x),0));
        document.querySelector("main").appendChild(this.cardBody);
    }
    flip(){
        if (this.canFlip){
            this.isReturned = true;
            this.canFlip = false;
        }
        this.faceToShow();
        checkCard();
    }
    faceToShow(){
        (this.isReturned) ? this.cardBody.style.backgroundColor = this.frontColor : 
        this.cardBody.style.backgroundColor = this.backColor;
    }
}

// Creating Cards
let ids = []
let cards = [];
for (let i = 0; i < 12; i++){
    randomId();
    cards.push(new Card(ids[i]));
}
// Fill an array with the randomised id
function randomId(){
    let number = Math.ceil(Math.random()*6);
    ids.filter(x => x === number).length < 2 ? ids.push(number) : randomId();
}


// Functions

function checkCard(){
    let returnedCardArray = cards.filter(x => x.isReturned); 
    if (returnedCardArray.length === 2){
        cards.forEach(x => x.canFlip = false);
        if (returnedCardArray[0].id === returnedCardArray[1].id){
            setTimeout(function(){
                console.log("pair found");
                cards.forEach(x => x.canFlip = true);   
            },2000);
            //ids = ids.slice();
        }
        else {
            setTimeout(function(){
                console.log("too bad");
                returnedCardArray.forEach(x => (
                    x.isReturned = false,
                    x.faceToShow(),
                    x.canFlip = true,
                    returnedCardArray = [],
                    cards.forEach(x => x.canFlip = true)
                ))
            },2000);
        }
    }
}