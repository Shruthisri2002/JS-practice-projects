const table=document.getElementById("table");
for(let ri=0;ri<8;ri++){
    let tr=document.createElement("tr");
    let white=ri%2==0?true:false;


    for(let ci=0;ci<8;ci++){
        let cell= document.createElement("td");
        cell.classList.add('box');
        cell.classList.add(white?"white":"black");

        //cell.innerText= `${ri}-${ci}`; //numbers will not display in the box
        cell.setAttribute("data-index", `${ri}-${ci}`);
        cell.setAttribute("id", `${ri}-${ci}`);

        tr.appendChild(cell);


        white=!white;
    }
    table.appendChild(tr);
}

function searchTopLeft(rowIndex, colIndex){
    rowIndex--;
    colIndex--;

    let elements=[];

    while(rowIndex>=0 && colIndex>=0){
        const id= `${rowIndex}-${colIndex}`;
        const e=document.getElementById(id);
        if (e){
            elements.push(e);
        }

        rowIndex--;
        colIndex--;
    }

    return elements;
}

function searchTopRight(rowIndex, colIndex){
    rowIndex--;
    colIndex++;

    let elements=[];

    while(rowIndex>=0 && colIndex>=0){
        const id= `${rowIndex}-${colIndex}`;
        const e=document.getElementById(id);
        if (e){
            elements.push(e);
        }

        rowIndex--;
        colIndex++;
    }

    return elements;
}

function searchBottomLeft(rowIndex, colIndex){
    rowIndex++;
    colIndex--;

    let elements=[];

    while(rowIndex>=0 && colIndex>=0){
        const id= `${rowIndex}-${colIndex}`;
        const e=document.getElementById(id);
        if (e){
            elements.push(e);
        }

        rowIndex++;
        colIndex--;
    }

    return elements;
}

function searchBottomRight(rowIndex, colIndex){
    rowIndex++;
    colIndex++;

    let elements=[];

    while(rowIndex>=0 && colIndex<=7){
        const id= `${rowIndex}-${colIndex}`;
        const e=document.getElementById(id);
        if (e){
            elements.push(e);
        }

        rowIndex++;
        colIndex++;
    }

    return elements;
}

function reset(){
    for(let ri=0; ri<8; ri++){
        for(let ci=0; ci<8; ci++){
            const e = document.getElementById(`${ri}-${ci}`);
            e.classList.remove("orange");
        }
    }
}

table.addEventListener("mouseover", function(e){
    reset();
    const target=e.target;
    if(target.tagName==='TD' && target.hasAttribute('data-index')){
        console.log(`hovering on ${target.getAttribute("data-index")}`);
        const index=target.getAttribute("data-index");
        const [rowIndex, colIndex] = index.split("-");

        const rowIndexNumber=parseInt(rowIndex);
        const colIndexNumber=parseInt(colIndex);

        const elements = [
            //document.getElementById(index),//current position
            ...searchTopLeft(rowIndexNumber, colIndexNumber),
            ...searchTopRight(rowIndexNumber, colIndexNumber),
            ...searchBottomLeft(rowIndexNumber, colIndexNumber),
            ...searchBottomRight(rowIndexNumber, colIndexNumber)
        ];

        for (const e of elements){
            e.classList.add("orange");
        }
    }
});