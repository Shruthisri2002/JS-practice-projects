import Trie from "./trie.js";

const trie = new Trie();

const db=["lap","laptop", "car", "carpet", "dog"];

for(const word of db){
    trie.insert(word);
}


//lets connect to UI now
const search=document.getElementById("search-input"); //from id of thml page
const suggestionContainer=document.getElementById("suggestion-container");

const cache = new Map();

async function searchCountryNames(searchQ){
    if(!searchQ) return[];
    if(cache.has(searchQ)) return cache.get(searchQ);

    const response=await fetch(
        `https://restcountries.com/v3.1/name/${searchQ}`
    );
    const result = await response.json();
    const items = result.map((e) => e.name.official);

    cache.set(searchQ, items);
    return items;
}

function makeAPICall(data){
    console.log(`making API call for ${data}`);
}

search.addEventListener("keydown", (e) => {
    const q = e.target.value;
    makeAPICall(q);
});

async function handleInput(e){
    const q=e.target.value;
    const countries = await searchCountryNames(q);
    const suggestions=[...trie.search(q), ...countries];

    const frag=document.createDocumentFragment();

    for(const suggestion of suggestions){
        const p=document.createElement('p');
        p.innerText=suggestion;

        //to get the word into input holder on clicking 
        p.addEventListener("click", () =>{
            search.value=suggestion;
        });

        frag.appendChild(p)
    }

    suggestionContainer.innerHTML="";
    suggestionContainer.appendChild(frag);
}

search.addEventListener("input", getDebounced(handleInput, 500));

//debounce function
function getDebounced(fn, delay=1000){
    let timerId=null;
    return function(...args){
        if(timerId) clearTimeout(timerId);
        timerId=setTimeout(() => fn(...args), delay);
    }
}