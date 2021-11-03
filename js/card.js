class Card{
    constructor(id,cards,colors,backImg,returnedCards){
        this.cardBody = this.createCard(id,colors,backImg);
        this.returnedCards = returnedCards;
        this.cards = cards;
        this.canFlip = true;
        this.isFound = false;
        this.id = id;
        this.isReturned = false;
        this.cardBody.classList.add("cardClass");
        this.event = x => this.flip(x);
        this.cardBody.addEventListener("click",this.event);
        this.faceToShow();
        document.querySelector("main").appendChild(this.cardBody);
        console.log(this);
    }
    flip(){
        if (this.canFlip){
            this.isReturned = true;
            this.canFlip = false;
            this.returnedCards.push(this);
            this.faceToShow();
            BoardGame.checkCard(this.cards,this.returnedCards); 
            // Call CheckCard when selecting card, if we found a pair card are not clickable anymore so we do not need to check them
        }
    }
    faceToShow(){
        this.cardBody.classList.toggle("isFlipped");
    }
    createCard(id,colors,backImg){
        let cardBody = document.createElement("div");
        let front = document.createElement("img");
        let frontIMG = colors[id];
        let back = document.createElement("img");
        let backIMG = backImg
        front.src = frontIMG;
        front.classList.add("frontCard");
        back.src = backIMG;
        back.classList.add("backCard");
        cardBody.appendChild(back);
        cardBody.appendChild(front);
        return cardBody;
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
                                                x.cardBody.classList.add("victory")));
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
init();
// Functions
function init(){
    fetch("json/theme.json").then(function(response){
        return response.json()
    }).then(function(response){
        const ID = [];
        const CARDS = [];
        let theme = "White";
        const COLORS = response[theme].frontCards;
        const BACKIMG = response[theme].backCard;
        console.log(COLORS);
        const RETURNEDCARDS = [];
        for (let i = 0; i < 12; i++){
            randomId(ID);
            // Fill an array with the randomised id
            CARDS.push(new Card(ID[i],CARDS,COLORS,BACKIMG,RETURNEDCARDS)); 
        }
    });

}
function randomId(array){
    let number = Math.floor(Math.random()*6);
    array.filter(x => x === number).length < 2 ? array.push(number) : randomId(array);
}