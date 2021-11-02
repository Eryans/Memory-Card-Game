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
        this.event = x => this.flip(x);
        this.cardBody.addEventListener("click",this.event);
        document.querySelector("main").appendChild(this.cardBody);
    }
    flip(){
        if (this.canFlip){
            this.isReturned = true;
            this.canFlip = false;
            returnedCards.push(this);
            checkCard(); 
            // Call CheckCard when selecting card, if we found a pair card are not clickable anymore so we do not need to check them
        }
        this.faceToShow();
    }
    faceToShow(){
        (this.isReturned) ? (this.cardBody.style.backgroundColor = this.frontColor,
        this.cardBody.style.transform = "rotate3d(0,1,0,180deg)") : 
        (this.cardBody.style.backgroundColor = this.backColor,
         this.cardBody.style.transform = "rotate3d(0,1,0,0deg)");
    }
}

// Game loop
const CARDS = [];
let returnedCards = [];
init();

// Functions
// Creating CARDS and init game

function init(){
    const ID = [];
    for (let i = 0; i < 12; i++){
        randomId(ID);
        // Fill an array with the randomised id
        CARDS.push(new Card(ID[i])); 
    }
}
function randomId(array){
    let number = Math.ceil(Math.random()*6); // Use math.ceil to avoid returning 0
    array.filter(x => x === number).length < 2 ? array.push(number) : randomId(array);
}

function checkCard(){
    if (returnedCards.length === 2){
        CARDS.forEach(x => x.canFlip = false);
        if (returnedCards[0].id === returnedCards[1].id){
            setTimeout(function(){
                console.log("pair found");
                returnedCards.forEach(x => (x.isFound = true,
                                            x.cardBody.style.opacity =  0.65));
                CARDS.forEach(x => x.isFound ? x.canFlip = false : x.canFlip = true);
                CARDS.splice(CARDS.indexOf(returnedCards[0]),1);
                CARDS.splice(CARDS.indexOf(returnedCards[1]),1);
                returnedCards = [];
                checkIfWin();
            },2000);
        }
        else {
            setTimeout(function(){
                console.log("too bad");
                returnedCards.forEach(x => (
                    x.isReturned = false,
                    x.faceToShow(),
                    x.canFlip = true,
                    returnedCards = [],
                    CARDS.forEach(x => x.isFound ? x.canFlip = false : x.canFlip = true)
                ))
            },2000);
        }
    }
    console.log(CARDS.length);
}

function checkIfWin(){
    CARDS.length > 0 ? console.log("Game is still going") : console.log("You won !");
}