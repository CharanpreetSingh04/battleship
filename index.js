const myBattleShip = document.getElementById('my-battleship');
const opponent = document.getElementById('opponent-grid');
const footer = document.querySelector('footer');
const choice = {};



const ways = [[1,2,3,4,10,20,30,65,75,85,90,91,51,61,59,69,42,43,44,45,46],
    [6,16,26,36,46,70,71,72,73,49,59,69,91,92,93,0,1,32,33,98,99],
    [0,10,20,30,40,22,23,24,25,53,54,55,78,88,98,7,8,39,49,81,91],
    [7,17,27,37,47,70,71,72,73,49,59,69,91,92,93,0,1,14,15,97,98],
    [2,3,4,5,6,65,75,85,95,19,29,39,34,35,36,20,30,60,61,88,98],
    [9,19,29,39,49,0,1,2,3,43,53,63,5,6,7,74,75,90,91,89,99],
    [4,5,6,7,8,60,70,80,90,32,33,34,39,49,59,0,1,66,76,93,94],
    [5,15,25,35,45,70,71,72,73,47,57,67,10,11,12,7,8,28,38,40,50],
    [5,6,7,8,9,24,34,44,54,30,40,50,91,92,93,0,1,67,77,93,94]];


function createGridElement(width,player){
        const gridRow = document.createElement('div');
        if(player === 'player')
            gridRow.classList.add('grid');
        else{
            gridRow.classList.add('grid-computer');
        }
        //try to avoid rgba 
        gridRow.style.width = width;
        gridRow.style.height = width;  
        gridRow.style.border = '1px solid rgba(0, 0, 0, 0.8)';
        gridRow.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        return gridRow;
}

function createGrid(rows,player){
        if(player === "myGrid"){
            for(let i=0;i<rows*rows;i++){ 
                myBattleShip.appendChild(createGridElement(800/rows,"player"));
            }
        }
        else{
            for(let i=0;i<rows*rows;i++){ 
                opponent.appendChild(createGridElement(800/rows,"computer"));
            }
        }
}
//search hue

function placePlayerShips(){
    for(let i=0;i<100;i++){
            myBattleShip.children.item(i).style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    }
    const randomWay = Math.floor(Math.random()*9);
    choice.currentRandomWayPlayer = randomWay;
    for(let i=0;i<21;i++){
        myBattleShip.children.item(ways[randomWay][i]).style.backgroundColor = 'red';
    }
}

function placeComputerShips(){
    for(let i=0;i<100;i++){
        opponent.children.item(i).style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    }
    const randomWay = Math.floor(Math.random()*9);
    choice.currentRandomWay = randomWay;
    for(let i=0;i<21;i++){
        opponent.children.item(ways[randomWay][i]).style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    }
}

createGrid(10,"myGrid");
placePlayerShips();
createGrid(10,"opponent");
placeComputerShips();


const randomizeButton = document.getElementById('randomize');
randomizeButton.addEventListener('click',placePlayerShips);


const totalMoves = [];
for(let i=0;i<100;i++){
    totalMoves.push(i);
}

const play = document.querySelector('.play');

play.addEventListener('click',function(e){
    const computerShips = ways[choice.currentRandomWay];
    const playerShips = ways[choice.currentRandomWayPlayer];
    play.disabled = true;
    randomizeButton.removeEventListener('click',placePlayerShips);
    const grid = document.querySelectorAll('.grid-computer');
    grid.forEach(gridElement => {
        function gridClick(e){
            let index;
            for(let i=0;i<100;i++){
                if(opponent.children.item(i)===e.target){
                    index = i;
                    break;
                }
            }
            for(let i=0;i<computerShips.length;i++){
                if(index === computerShips[i]){
                    opponent.children.item(index).textContent = 'X';
                    opponent.children.item(index).style.backgroundColor = 'red';
                    computerShips.splice(i, 1);
                    e.target.removeEventListener('click',gridClick);
                    break;
                }
            }
            if(computerShips.length === 0){
                footer.textContent = "You Win";
                footer.style.backgroundColor = '#87ceeb'                
                return;
            } //bubbling and capturing of events
            if(opponent.children.item(index).style.backgroundColor !== 'red'){
                opponent.children.item(index).textContent = '.';
                e.target.removeEventListener('click',gridClick);
                //null checks on e, target,event listener
            }
            const randomPlayByComputer = Math.floor(Math.random()*(totalMoves.length));
            const element = totalMoves[randomPlayByComputer];
            totalMoves.splice(randomPlayByComputer, 1); //never mutate global variable
            //shallow and deep copy
            for(let i=0;i<playerShips.length;i++){
                if(element === playerShips[i]){
                    myBattleShip.children.item(element).textContent='X';
                    playerShips.splice(i, 1);
                    break;
                }
            }
            if(playerShips.length === 0){
                footer.textContent = "You Lose";
                footer.style.backgroundColor = '#ffcccb';                
                return;
            }
            if(myBattleShip.children.item(element).textContent !== 'X'){
                myBattleShip.children.item(element).textContent='.';
            }
        }
        gridElement.addEventListener('click', gridClick); 
    })
})


