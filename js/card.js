class Card{
    constructor(id,cards,returnedCards){
        this.cardBody = document.createElement("div");
        this.returnedCards = returnedCards;
        this.cards = cards;
        this.backColor = "red";
        this.canFlip = true;
        this.isFound = false;
        this.id = id;
        this.frontColor = COLORS[id];
        this.isReturned = false;
        this.cardBody.classList.add("cardClass");
        this.event = x => this.flip(x);
        this.cardBody.addEventListener("click",this.event);
        document.querySelector("main").appendChild(this.cardBody);
        console.log(this);
    }
    flip(){
        if (this.canFlip){
            this.isReturned = true;
            this.canFlip = false;
            this.returnedCards.push(this);
            BoardGame.checkCard(this.cards,this.returnedCards); 
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
class BoardGame{
    static checkCard(cards,returnedCards){
        if (returnedCards.length === 2){
            cards.forEach(x => x.canFlip = false);
            if (returnedCards[0].id === returnedCards[1].id){
                setTimeout(function(){
                    console.log("pair found");
                    returnedCards.forEach(x => (x.isFound = true,
                                                x.cardBody.style.opacity =  0.65));
                    cards.forEach(x => x.isFound ? x.canFlip = false : x.canFlip = true);
                    cards.splice(cards.indexOf(returnedCards[0]),1);
                    cards.splice(cards.indexOf(returnedCards[1]),1);
                    returnedCards.length = 0;
                    BoardGame.checkIfWin(cards);
                },2000);
            }
            else {
                setTimeout(function(){
                    console.log("too bad");
                    returnedCards.forEach(x => (
                        x.isReturned = false,
                        x.faceToShow(),
                        x.canFlip = true,
                        cards.forEach(x => x.isFound ? x.canFlip = false : x.canFlip = true)
                    ));
                    returnedCards.length = 0;
                },2000);
            }
        }
    }
    static checkIfWin(cards){
        cards.length > 0 ? console.log("Game is still going") : console.log("You won !");
    }
}
// Game loop
const COLORS = ["orange","blue","pink","green","cyan","purple"];
init();
// Functions
// Creating CARDS and init game
function init(){
    const ID = [];
    const CARDS = [];
    const RETURNEDCARDS = [];
    for (let i = 0; i < 12; i++){
        randomId(ID);
        // Fill an array with the randomised id
        CARDS.push(new Card(ID[i],CARDS,RETURNEDCARDS)); 
    }
}
function randomId(array){
    let number = Math.floor(Math.random()*6);
    array.filter(x => x === number).length < 2 ? array.push(number) : randomId(array);
}