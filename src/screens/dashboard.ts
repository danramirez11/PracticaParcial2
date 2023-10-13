import * as components from "../components/export";
import Card, { Attribute } from "../components/Card/Card";
import { GetCharacters } from "../services/dataFetch";


class Dashboard extends HTMLElement {

    constructor(){
        super();
        this.attachShadow({mode: "open"});
    }

    async connectedCallback(){
        const rickchar = await GetCharacters("https://rickandmortyapi.com/api/character");
        this.render(rickchar.results);

        const filter = this.shadowRoot?.querySelector(".btnfilter");
        const input = this.shadowRoot?.querySelector("input");
        filter?.addEventListener("click", ()=>{
            console.log("click")
            let value = Number(input?.value);
            this.filter(value, rickchar.results);
        })

        const btnapi = this.shadowRoot?.querySelector(".btnapi")
        btnapi?.addEventListener("click", async () => {
            console.log("click api")
            const harrychar = await GetCharacters("https://hp-api.onrender.com/api/characters");
            this.harrypotter(harrychar);
        })
        
    }

    harrypotter(data: any){
        console.log("harry");
        const apidiv = this.shadowRoot?.querySelector(".apidiv");
        data.forEach((c:any) => {
            const newChar = this.ownerDocument.createElement("my-card") as Card;
            newChar.setAttribute(Attribute.one, c.name);
            newChar.setAttribute(Attribute.two, c.yearOfBirth);
            apidiv?.appendChild(newChar);
        })
    }

    filter(value: number, results: any){
        console.log("filtro");
        const filterdiv = this.shadowRoot?.querySelector(".filterdiv");
        for (let  i = 0 ; i < value ; i++ ){
            console.log("for")
            const newCard = this.ownerDocument.createElement("my-card") as Card;
            newCard.setAttribute(Attribute.one, results[i].species);
            newCard.setAttribute(Attribute.two, results[i].id);
            filterdiv?.appendChild(newCard);
        }


    }

    render(api: any){
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
            <div class="filterdiv">
            <input type="text">
            <button class="btnfilter">Filtrar</button>
            </div>
            <div class="apidiv">
            <button class="btnapi">Mostrar</button>
            </div>
            `

            api.forEach((c: any) => {
                const char = this.ownerDocument.createElement("my-card") as Card;
                char.setAttribute(Attribute.one, c.name);
                char.setAttribute(Attribute.two, c.id);
                this.shadowRoot?.appendChild(char)
            });
        }
    }

}

customElements.define("my-dashboard", Dashboard);
export default Dashboard;