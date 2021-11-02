class Card{
    constructor(id){
        this.id = id;
        switch(id){
            case 1:
            case 2:
                this.frontColor = "blue";
        }
        this.isReturned = false;
        this.cardBody = document.createElement("div");
        this.cardBody.classList.add("cardClass");
        this.cardBody.addEventListener("click",x => setTimeout(() => this.flip(x),1000));
        document.querySelector("main").appendChild(this.cardBody);
    }
    flip(){
        this.cardBody.classList.toggle("bg-primary");
        this.isReturned = !this.isReturned;
    }
}

let cards = [];
for (let i = 0; i < 12; i++){
    cards.push(new Card());
}
/* 
cards.forEach(function(x){
    x.cardBody.addEventListener("click",() => x.flip());
}); 
*/