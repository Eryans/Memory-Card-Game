class Card{
    constructor(id){
        this.cardBody = document.createElement("div");
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
        this.cardBody.style.backgroundColor = this.frontColor;
        // ^^This is for testing^^
        this.isReturned = false;
        this.cardBody.classList.add("cardClass");
        this.cardBody.addEventListener("click",x => setTimeout(() => this.flip(x),1000));
        document.querySelector("main").appendChild(this.cardBody);
    }
    flip(){
        this.cardBody.style.backgroundColor = this.frontColor;
        this.isReturned = !this.isReturned;
    }
}

// Creating Cards
let id = []
let cards = [];
for (let i = 0; i < 12; i++){
    randomId();
    cards.push(new Card(id[i]));
}

function randomId(){
    let number = Math.ceil(Math.random()*6);
    id.filter(x => x === number).length < 2 ? id.push(number) : randomId();
}