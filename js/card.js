class Card{
    constructor(id){
        this.cardBody = document.createElement("div");
        this.backColor = "red";
        this.canFlip = true;
        this.isFound = false;
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
        this.event = x => setTimeout(() => this.flip(x),0);
        this.cardBody.addEventListener("click",this.event);
        document.querySelector("main").appendChild(this.cardBody);
    }
    flip(){
        if (this.canFlip){
            this.isReturned = true;
            this.canFlip = false;
            checkCard(); 
            // Call CheckCard when selecting card, if we found a pair card are not clickable anymore so we do not need to check them
        }
        this.faceToShow();
    }
    faceToShow(){
        (this.isReturned) ? this.cardBody.style.backgroundColor = this.frontColor : 
        this.cardBody.style.backgroundColor = this.backColor;
    }
}

// Game loop
const CARDS = [];
init();

// Functions
// Creating CARDS and init game

function init(){
    const ID = []
    for (let i = 0; i < 12; i++){
        randomId(ID);
        CARDS.push(new Card(ID[i]));
    }
}
// Fill an array with the randomised id
function randomId(array){
    let number = Math.ceil(Math.random()*6); // Use math.ceil to avoid returning 0
    array.filter(x => x === number).length < 2 ? array.push(number) : randomId(array);
}

function checkCard(){
    let returnedCardArray = CARDS.filter(x => x.isReturned); 
    if (returnedCardArray.length === 2){
        CARDS.forEach(x => x.canFlip = false);
        if (returnedCardArray[0].id === returnedCardArray[1].id){
            setTimeout(function(){
                console.log("pair found");
                returnedCardArray.forEach(x => x.isFound = true);
                CARDS.forEach(x => x.isFound ? x.canFlip = false : x.canFlip = true);
                CARDS.splice(CARDS.indexOf(returnedCardArray[0]),1);
                CARDS.splice(CARDS.indexOf(returnedCardArray[1]),1);
                returnedCardArray = [];
            },2000);
        }
        else {
            setTimeout(function(){
                console.log("too bad");
                returnedCardArray.forEach(x => (
                    x.isReturned = false,
                    x.faceToShow(),
                    x.canFlip = true,
                    returnedCardArray = [],
                    CARDS.forEach(x => x.isFound ? x.canFlip = false : x.canFlip = true)
                ))
            },2000);
        }
    }
    checkIfWin();
    console.log(CARDS.length);
}

function checkIfWin(){
    CARDS.length > 2 ? console.log("Game is still going") : console.log("You won !");
}