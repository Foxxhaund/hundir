const prompt = require("prompt-sync")({signit: true});

let jugadaPlayer = 0;
let jugadaMaquina = 0;
let tablero = [];
let tableroPlayer = [];
let jugada1 = [];
let jugada2 = [];

tablero = tableroVacio(tablero);
tableroPlayer = tableroVacio(tableroPlayer);
tablero = posicionarMaquina(tablero);
tableroPlayer = posicionarBarcos(tableroPlayer);

pintarTableros(tableroPlayer,tablero);

while(jugadaPlayer < 14 && jugadaMaquina < 14){
    jugada1 = jugadaP(tablero);
    console.log(jugada1);
    if (jugada1[2] == 'A'){
        tablero[jugada1[1]][jugada1[0]] = 'A';
        console.log("AGUA");
    }else if(jugada1[2] == '*'){
        tablero[jugada1[1]][jugada1[0]] = '*';
        console.log("TOCADO");
        jugadaPlayer++;
    }else{
        console.log("JUGADA REPETIDA");
    }
       
    jugada2 = jugadaM(tableroPlayer);  
    console.log(jugada2)    
   
    if (jugada2[2] == 'A'){
        tableroPlayer[jugada2[1]][jugada2[0]] = 'A';
        console.log("AGUA");
    }else if(jugada2[2] == '*'){
        tableroPlayer[jugada2[1]][jugada2[0]] = '*';
        console.log("TOCADO");
        jugadaMaquina++;
    }else{
        console.log("JUGADA REPETIDA");
    }
   
    pintarTableros(tableroPlayer,tablero);
}
if(jugadaPlayer > jugadaMaquina) console.log("HAS GANADO");
else console.log("HAS PERDIDO");
//AQUI SE PRODUCEN LAS JUGADAS
function jugadaP(tablero){
    let result = [];
    let atact;
    let x = Number(prompt("Indique la X de la jugada: "));
    let y = Number(prompt("Indique la Y de la jugada: "));
    if(x < 0 || x > 9 || y < 0 || y > 9 || isNaN(x) || isNaN(y)){
            console.log("Jugada incorrecta, PASA TURNO");
            return;
    }
    atact = comprobarJugada(tablero[y][x]);
    result.push(x);
    result.push(y);
    result.push(atact)
    return result;
}
function jugadaM(tablero){
    let result = [];
    let atact;
    let x = Math.floor(Math.random()*10);
    let y = Math.floor(Math.random()*10);
    atact = comprobarJugada(tablero[y][x]);
    result.push(x);
    result.push(y);
    result.push(atact)
    return result;
}
//funcion para optener el resultado de la jugada
function comprobarJugada(coordenada){
    if(coordenada == '-'){
        coordenada = 'A';
        return coordenada;
    }else if(coordenada == '*'){
        return coordenada;
    }else{
        coordenada = '*';
        return coordenada;
    }
}
//funcion par pintar los tableros
function pintarTableros(tableroPlayer,tablero){
    console.clear();
    console.log("tablero jugador");
    for(let i = 0; i <= 9; i++){
        console.log(i,tableroPlayer[i]);
    }
    console.log("tablero maquina");
    for(let k = 0; k <= 9; k++){
        console.log(k,tablero[k]);
    }
}

//funcion para posicionar los barcos de la maquina
function posicionarMaquina(tablero){
 let o = '';
 for(let i = 5; i > 1; i--){
   let x = Math.floor(Math.random()*10);
   let y = Math.floor(Math.random()*10);
   if((Math.floor(Math.random()*10) <= 4)) o = 'h';
   else o = 'v';   
   if(comprobarbarco(i,o,tablero,x,y)){
       tablero = pintarBarco(i,o,tablero,x,y);
   }else{
       console.log("posicion incorrecta del barco");
       i += 1;
   }   
 }
 return tablero; 
}
//funcion para posicionar los barcos del player
function posicionarBarcos(tablero){
  for(let i = 5; i > 1; i--){
    let x = Number(prompt("inserte posicion X: "));
    let y = Number(prompt("inserte posicion Y: "));
    let o = prompt("Insique la orientacion (h o v): ");
    if(comprobarbarco(i,o,tablero,x,y)){
        tablero = pintarBarco(i,o,tablero,x,y);
    }else{
        console.log("posicion incorrecta del barco");
        i += 1;
    }    
  }
  return tablero; 
} 
//funcion para pintar los barcos  
function pintarBarco(barco,o,tablero,x,y){
if(o == 'h' || o == 'H'){
    if((x+barco) <= 9){
        for (let i = x; i < x + barco; i++) {
            tablero[y][i] = `${barco}`;
        }
    }else if((x+barco) > 9){
        for (let i = x; i > x - barco; i--){
            tablero[y][i] = `${barco}`;
        }
    }
}else if(o == 'v' || o == 'V'){

    if((y+barco) <= 9){
        for (let i = y; i < y + barco; i++) {
            tablero[i][x] = `${barco}`;
        }
    }else if((y+barco) > 9){
        for (let i = y; i > y - 5; i--){
            tablero[i][x] = `${barco}`;
        }
    }
}
return tablero;
}
//funcion que comprueba si es correcto el posicionamiento del barco
function comprobarbarco(barco,o,tablero,x,y){
    if(o == 'h' || o == 'H'){
        if((x+barco) <= 9){
            for (let i = x; i < x + barco; i++) {
                if(tablero[y][i] != `-`) return false;
            }
        }else if((x+barco) > 9){
            for (let i = x; i > x - barco; i--){
                if(tablero[y][i] != `-`) return false;
            }
        }
    }else if(o == 'v' || o == 'V'){

        if((y+barco) <= 9){
            for (let i = y; i < y + barco; i++) {
                if(tablero[i][x] != `-`) return false;
            }
        }else if((y+barco) > 9){
            for (let i = y; i > y - 5; i--){
                if(tablero[i][x] != `-`) return false;
            }
        }
    }
    return true;
}

//funcion para iniciar los tableros
function tableroVacio(tablero){
    tablero=[['-','-','-','-','-','-','-','-','-','-'],
            ['-','-','-','-','-','-','-','-','-','-'],
            ['-','-','-','-','-','-','-','-','-','-'],
            ['-','-','-','-','-','-','-','-','-','-'],
            ['-','-','-','-','-','-','-','-','-','-'],
            ['-','-','-','-','-','-','-','-','-','-'],
            ['-','-','-','-','-','-','-','-','-','-'],
            ['-','-','-','-','-','-','-','-','-','-'],
            ['-','-','-','-','-','-','-','-','-','-'],
            ['-','-','-','-','-','-','-','-','-','-'],];
    return tablero;
}