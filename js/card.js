class Card{
    constructor(id,cards,colors,backImg){
        this.cardBody = this.createCard(id,colors,backImg);
        this.cards = cards;
        this.canFlip = false;
        this.isFound = false;
        this.id = id;
        this.isReturned = false;

        console.log(cards);
    }
    flip(){
        if (this.canFlip){
            this.isReturned = true;
            this.canFlip = false;
            this.faceToShow();
            BoardGame.checkCard(this.cards); 
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
        cardBody.classList.add("cardClass");front.src = frontIMG;
        front.classList.add("frontCard");
        back.src = backIMG;
        back.classList.add("backCard");
        cardBody.appendChild(back);
        cardBody.appendChild(front);
        cardBody.addEventListener("click",() => this.flip());
        return cardBody;
    }
    addToBoard(){
        document.querySelector("main").appendChild(this.cardBody);
        setTimeout(() => (this.faceToShow(),this.canFlip = true),2000)
    }
}

class BoardGame{
    static life = 5;
    static getLife() { return this.life; }
    static loseLife() { this.life = this.getLife() -1; }
    static setLife(value) { this.life = value; }
    static checkCard(cards){
        let returnedCards = cards.filter(x => x.isReturned);
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
                    BoardGame.loseLife();
                    LIFE.innerText = BoardGame.getLife();
                    BoardGame.checkGameOver();
                },2000);
            }
        }
    }
    static checkIfWin(cards){
        if (cards.length === 0){
            OptionBox.setMessage("You won !")
            OptionBox.box();
        }
    }
    static checkGameOver(){
        if (BoardGame.getLife() === 0) {
            OptionBox.setMessage("Game Over ! Play Again ?");
            OptionBox.box();
        }
    }
}
class OptionBox{
    static message = "";
    static box(){
        // Blocker
        let body = document.querySelector("body");
        let block = document.createElement("div");
        block.classList.add("blocker");
        body.appendChild(block);
        // Menu box
        let ui = document.createElement("section");
        ui.classList.add("uiClass");
        ui.id = "menu";
        ui.classList.add("uiClass","p-2","text-center","d-flex","flex-column","justify-content-center","gap-3");
        ui.innerHTML = 
        `<h2>Jules' Memory Game</h2>
        <p>${this.message}</p>
        <form>
          <label for="theme">
            Choose a theme
            <select name="theme" id="theme">
              <option value="Black">Black Card</option>
              <option value="White">White Card</option>
            </select>
          </label>
        </form>
        <button id="playButton" class="btn btn-light">
            Play
        </button>`;
        body.appendChild(ui);
        
        document.querySelector("#theme").addEventListener("change",function(x){
            theme =  document.querySelector("#theme").value;
        });

        const playButton = document.querySelector("#playButton");
        playButton.addEventListener("click",function(){
            ui.remove();
            block.remove();
            init();
        })
    }
    static setMessage(message){
        this.message = message;
    }
}
class User{

}
// Global
const LIFE = document.querySelector("#Attempt");
let theme = "Black";
// Game loop
OptionBox.box();
// Functions
function init(){
    document.querySelector("main").innerHTML = ""; // Empty Main HTML to remove previous card if they exist
    BoardGame.setLife(5);
    LIFE.innerText = BoardGame.life;
    fetch("json/theme.json").then(function(response){
        return response.json()
    }).then(function(response){
        const ID = [];
        const CARDS = [];
        const COLORS = response[theme].frontCards;
        const BACKIMG = response[theme].backCard;
        console.log(COLORS);
        for (let i = 0; i < 12; i++){
            randomId(ID);
            // Fill an array with the randomised id
            CARDS.push(new Card(ID[i],CARDS,COLORS,BACKIMG)); 
        }
        CARDS.forEach(x => x.addToBoard());
    });

}
function randomId(array){
    let number = Math.floor(Math.random()*6);
    array.filter(x => x === number).length < 2 ? array.push(number) : randomId(array);
}