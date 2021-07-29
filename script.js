//main xo arr 
var XOarr=[
[' ',' ',' '],
[' ',' ',' '],
[' ',' ',' ']];

///create playesr role
var gameOver=false;

//get variable
var boardRows=document.querySelectorAll('.board .row');
var board=document.querySelector('.board');
var role=document.querySelector('.info .role');
var winner=document.querySelector('.info .winner');


//covert rows to array of rows
boardArray=Array.from(boardRows);

//create 2d array from col element
boardArray.forEach((row,index)=>{
     var tempArr=Array.from(row.children);//create array from each row(array of columns)
     boardArray[index]=tempArr;//push new row to array
});

//give every block i , j index value
boardArray.forEach((row,i)=>{
   row.forEach((col,j)=>{
        col.setAttribute('data-i',i);
        col.setAttribute('data-j',j);
   });
});

//add event linstner to each block
document.addEventListener("click",(e)=>{
     
     //if pressed block is li do the following
     if(e.target.tagName=='LI'){
          //get index i of bolck 
         var i=e.target.getAttribute('data-i');
         //get index j
         var j=e.target.getAttribute('data-j');

         if(XOarr[i][j]==' '){//only if is empty cell
            //write inside block x
          e.target.textContent='x';
          //add 'x' to XOarr
          XOarr[i][j]='x';

          //check if win and if array is full
           if(checkWinner(XOarr)=='x'||isFullArr(XOarr)){
            board.classList.add('game-over');//add game over class to board
            document.querySelector('.info .game-over').classList.add('show');//show game over words
            if(checkWinner(XOarr)=='x')
            winner.firstElementChild.textContent='X win';//write that X win
            gameOver=true;//set game over to true
           }

           //computer player ,wait for 200ms
          setTimeout(()=>{
               //get random empty index
            var indeces=computerPlayer(XOarr,gameOver);
            //add 'o' to bord array 
            boardArray[indeces[0]][indeces[1]].textContent='o';
            //add 'o' to XOarr
            XOarr[indeces[0]][indeces[1]]='o';
            //check if win and if array is full
            if(checkWinner(XOarr)=='o'||isFullArr(XOarr)){
                 gameOver=true;//set game over to true
                 board.classList.add('game-over');//add game over class to board
                 document.querySelector('.info .game-over').classList.add('show');//show game over words
                 if(checkWinner(XOarr)=='o')
                 winner.firstElementChild.textContent='O win';//write that o win
            }
           },200);
         }
          
     }//end of outer if 
});

function computerPlayer(xoarr,gameover){
       var i=0, j=0;
       var rowLength=xoarr.length,
          colLength=xoarr[i].length;
       
       while(xoarr[i][j]=='x'||xoarr[i][j]=='o'&&!gameover){
            i=Math.floor(Math.random()*rowLength);
            j=Math.floor(Math.random()*colLength);
       }
     //  console.log([i,j]);
         return [i,j];
}
//check if array is full or not
function isFullArr(xoarr){
     var full=true;
     xoarr.forEach((row)=>{
          row.forEach((ele)=>{
           if(ele==' '){
               full=false;
           }
          });
      });
      return full;
}
//check winner
function checkWinner(arr){
  //check rows
  for(var i=0;i<arr.length;i++){
      var str="";
      for(var j=0;j<arr[i].length;j++){
           str+=arr[i][j];
      }boardRows
      if(str=="xxx")
        return 'x';
      else if(str=="ooo")
           return "o";
  }
  //check main diagonal
      var maindig="";
  for(var i=0;i<arr.length;i++){
       maindig+=arr[i][i];
  }
   if(maindig=="ooo")
       return "o";
       else if(maindig=="xxx")
       return "x";

   //check secondary diagonal
    var secdig="";
    for(var j=0;j<arr.length;j++){
         str+=arr[j][arr.length-j];
    }
    if(secdig=="xxx")
      return 'x';
    else if(secdig=="ooo")
         return "o";

  //check columns
  for(var i=0;i<arr[0].length;i++){
     var str="";
    for(var j=0;j<arr.length;j++){
         str+=arr[j][i];
    }
    if(str=="xxx")
      return 'x';
    else if(str=="ooo")
         return "o";
}
return "no one yet";
}
