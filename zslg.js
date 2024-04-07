let bord1 = [];
let zeeReeks= [];
let schepen = [[1,1,1,1,1],[2,2,2,2],[3,3,3,3],[4,4,4],[5,5,5],[6,6,6],[7,7],[8,8],[9,9],[10,10]];
let vliegdek=0, slag1=0,slag2=0,onderz=0,torpedo1=0,torpedo2=0,
        pat1 = 0,pat2=0,pat3=0,pat4=0;
let tel = 0;

function wilGetal(min,max)
{
     return Math.floor(Math.random()*(max-min+1)+min);
}

function geefOrientatie() { 
    return Math.random() < 0.5 ? 'horizontaal' : 'verticaal'; 
} 

//HTML bord maken

let zee = document.getElementById("zee")
function maakBord() {
    let kid=0
for (let i=0;i<10;i++) {
    let rij = document.createElement('tr');

    let data="";
        for (let j=0;j<10;j++) {
            data+="<td class='water' id="+kid+">~~~</td>";
            kid++;
        }
        rij.innerHTML=data;
        zee.appendChild(rij);

    }
}

maakBord();

let cellen =  document.querySelectorAll("td"); 

  cellen.forEach(function(el) {
    el.addEventListener('click',()=>{
       
        if (zeeReeks[el.id]!=0){
            
            cellen[el.id].classList.remove('water')
            cellen[el.id].classList.add('rood')
            raak(zeeReeks[el.id]);
            tellen();
        }
    }
    );
  })
function klaarBord() {
    try {
        cellen.forEach(el=>{
            //console.log(cellen[el.id].className)
        if (cellen[el.id].className=='rood'){   
        cellen[el.id].classList.remove('rood');
        }   
        })
        vliegdek=0, slag1=0,slag2=0,onderz=0,torpedo1=0,torpedo2=0,
            pat1 = 0,pat2=0,pat3=0,pat4=0;
    }
    catch(err) {
       alert("fout " + err + "opgetreden, probeer opnieuw") ;
    }

}
document.getElementById('speel').addEventListener('click', ()=> 
    {
        klaarBord()
        plaatsSchepen();    
        zeeReeks = bord1.flat();
        if (zeeReeks.length==100){alert("Schepen liggen klaar");}    
    })



function plaatsSchepen(){
    let schipLengte = 0;
    let schipKenGetal = 0;
    let keren = 0;
    let rij =0;
    let kol = 0;
    let orientatie = "";
    for (let i = 0; i < 10; i++) {
       bord1[i] = new Array(10).fill(0);
        } 
    try {
        schepen.forEach((schip) => {        
        orientatie= geefOrientatie();
        //orientatie='verticaal';
        schipLengte = schip.length;
        schipKenGetal = schip[0];
        let geplaatst =false;
        while (!geplaatst) {
            if (orientatie=='horizontaal'){
                rij = wilGetal(0,9);
                kol = wilGetal(0, 9-schipLengte)
                if (plaatsenMogelijk(bord1,rij,kol,schipLengte,orientatie)){
                    plaatsSchip(bord1,rij,kol,schipLengte,schipKenGetal,orientatie)
                    geplaatst=true;
                }
            }else if (orientatie=='verticaal'){
                rij= wilGetal(0, 9-schipLengte);
                kol = wilGetal(0,9);
                if (plaatsenMogelijk(bord1,rij,kol,schipLengte,orientatie)){
                    plaatsSchip(bord1,rij,kol,schipLengte,schipKenGetal,orientatie)
                    geplaatst=true;
                }
            }  keren++;
                
                if (keren>1000){
                    console.log(keren);
                    bord1.length=0;
                    zeeReeks.length=0;                    
                    break; 
                }
                    
        }
    });
} catch( err) {
    alert("fout " + err + " heeft zich voorgedaan, probeer nogmaals");
}

}

function plaatsenMogelijk(bord,rij,kol,lengte,orientatie) {
   
        
        if (orientatie==='horizontaal'){ 
            for (let i = 0;i<lengte;i++) {
                                
            if (bord[rij][kol+i]!=0){
                return false;
            }
            //omliggende cellen
            if (rij>0 && bord[rij-1][kol+i]!=0){
                return false;
            }
            if (rij<9 && bord[rij+1][kol+i]!=0){
                return false;
            }
            if (kol +i >0 && bord[rij][kol + i -1]!=0){
                return false;
            }
            if (kol+1 <9 && bord[rij][kol + i +1]!=0) {
                return false;
            }
            if(rij>0 && kol + i >0 && bord[rij-1][kol +i-1]!=0){
                return false;
            }
            if (rij>0 && kol +1 <9 && bord[rij-1][kol+i +1]!=0){
                return false;
            }
            if (rij<9 && kol+i >0 && bord[rij+1][kol+i-1]!=0){
                return false;
            }            
            if (rij<9 && kol+i<9 && bord[rij+1][kol+i+1]!=0){
                return false
            }            
        } return true;
    } 
    
        if (orientatie==='verticaal') {
            for (let i = 0;i<lengte;i++) {
            //console.log(i);
            if(bord[rij+i][kol] !=0){
                return false;
            }
            //omliggende cellen
            if( rij>0 && bord[rij+i-1][kol]!=0){
                return false;
            }
            if (rij<9 && bord[rij+i +1][kol]!=0){
                return false;
            }
            if (kol > 0 && bord[rij+i][kol-1]!=0){
                return false;
            }
            if (kol<9 && bord[rij+i][kol+1]!=0){
                return false;
            }
            if(rij>0 && kol > 0 && bord[rij+i-1][kol-1]!=0){
                return false;
            }
            if (rij>0 && kol<9 && bord[rij+i-1][kol+1]!=0){
                return false;
            }
            if (rij>9 && kol>0 && bord[rij+i+1][kol-1]!=0){
                return false;
            }
            if (rij<9 && kol<9 && bord[rij+i+1][kol+1]!=0){
                return false
            } 
            
        } return true;   
    } 
} 
    
//}

function plaatsSchip(bord,rij,kol,lengte,kenGet,orientatie) {
    if (orientatie === 'horizontaal') { 
        for (let i = 0; i < lengte; i++) { 
            bord[rij][kol+i] = kenGet; } 
    } else if (orientatie === 'verticaal') { 
            for (let i = 0; i <lengte; i++) {                 
                bord[rij+i][kol] = kenGet; } } 
} 

function raak(wat){
    
        //console.log(wat);
    switch (wat) {       
      case 1:
        vliegdek++;
        console.log(vliegdek)
        if (vliegdek==5) {
          //console.log("vliegdek gezonken")
          alert("vliegdek gezonken");
        }
        break;
      case 2:
        slag1++;        
        if (slag1==4){alert("slagschip 1 gezonken");}
        break;
      case 3:
        slag2++; 
            
        if (slag2==4){alert("slagschip 2 gezonken");}
        break;
      case 4:
        onderz++;
        
        if (onderz==3){ alert("onderzeeër gezonken");}
       break;
       case 5:
        torpedo1++       
        if (torpedo1==3){ alert("torpedo 1 gezonken");}
        break;
        case 6:
        torpedo2++
        if (torpedo2==3){ alert("torpedo 2 gezonken");}
        break;
        case 7:
        pat1++
        if (pat1==2){ alert("patrouille 1 gezonken");}
        break;
        case 8:
        pat2++
        if (pat2==2){ alert("patrouille 2 gezonken");}    
        break;
        case 9:
        pat3++
        if (pat3==2){ alert("patrouille 3 gezonken");}
        break;
        case 10:
        pat4++
        if (pat4==2){ alert("patrouille 4 gezonken");}    
        break;
    }
    
  }
  function tellen(){
    tel++;
    if (tel===30) {alert("Alle schepen gezonken");}
  }

/*de plaatsen worden hier via hulpbord manueel ingegeven
let plts1= [0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 4, 0, 5, 5, 5, 5, 5, 0, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 4, 4, 0, 0, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 3, 3, 3, 0, 2, 2, 2, 2]
let plts2 =[0,0,0,3,3,3,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,2,0,4,0,3,0,0,4,0,0,2,0,4,0,3,0,0,4,0,0,2,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,0,4,0,0,0,0,0,0,0,0,0,4,0,2,2,2,2];
let plts3 =[0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 4, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 4, 0, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 0, 2, 2, 2, 2, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 4, 4];

let plts = [plts1,plts2,plts3];
let zeeReeks= plts[wilGetal(0,plts.length-1)] ;
*/



