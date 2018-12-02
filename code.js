var animate = /*window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||*/
function(callback) { window.setTimeout(callback, 1000/30) };
var canvas=document.createElement ("canvas");
var ctx;
ctx=canvas.getContext("2d");

var PlayButton=document.createElement("button");
PlayButton.innerHTML="play/pause";
var ClearButton=document.createElement("button");
ClearButton.innerHTML="clear";
var RandomButton=document.createElement("button");
RandomButton.innerHTML="random grid";

var width=1000;
var height=800;
var resolution=10;
canvas.width=width;
canvas.height=height;
PlayButton.style.position="absolute";
PlayButton.style.top=height;
ClearButton.style.position="absolute";
ClearButton.style.top=height;
ClearButton.style.left=100;
RandomButton.style.position="absolute";
RandomButton.style.top=height;
RandomButton.style.left=160;

var gridWidth=width/resolution;
var gridHeight=height/resolution;

var grid=create2Darray(gridWidth,gridHeight);

var playing=false;
var step = function(){
	
grid=addLife(grid,newLifeX,newLifeY,newIndex);
newIndex=0;
if(playing==true){
	grid =nextGrid(grid,gridWidth,gridHeight);
}
if(clearScreen==true){
	clear(grid,gridWidth,gridHeight);
	clearScreen=false;
}
if(random==true){
	randomGrid(grid,gridWidth,gridHeight);
	random=false;
}
draw(grid,gridWidth,gridHeight);
animate(step);
};

function clear(grid,width,height){
	var i;
	for( i=0;i<width;i++){
		var j;
	for( j=0;j<height;j++){
			grid[i][j]=0;
		}
	}
}

function randomGrid(grid,width,height){
	var i;
	for( i=0;i<width;i++){
		var j;
	for( j=0;j<height;j++){
			grid[i][j]=Math.floor(Math.random()*2);
		}
	}
}

function nextGrid(grid,width,height){
	var newgrid=create2Darray(width,height);
	var i;
	for( i=0;i<width;i++){
		var j;
		for( j=0;j<height;j++){
			var neighbor=countNeighbor(grid,i,j,width,height);
			if(grid[i][j]==0 && neighbor==3){
				newgrid[i][j]=1;
			}
			else if(grid[i][j]==1 ){
				if(neighbor<2 || neighbor>3){
					newgrid[i][j]=0;
				}
				else{
					newgrid[i][j]=1;
				}
					
			}
		}
	}
	return newgrid;
}

function draw(grid,width,height){
	ctx.fillStyle="#ffffff";
	ctx.fillRect(0,0,width*resolution,resolution*height);
	var i;
	for( i=0;i<width;i++){
		var j;
		for( j=0;j<height;j++){
			if(grid[i][j]==1){
				ctx.fillStyle="#ffffff";
			}
			else{
				ctx.fillStyle="#000000";
			}
			ctx.fillRect(i*resolution,j*resolution,resolution,resolution);
		}
	}
}

function addLife(grid,Xarray,Yarray,dim){
	
	var i;
	for(i=0;i<dim;i++){
		grid[Xarray[i]][Yarray[i]]=1;
	}
	
	return grid;
}

function create2Darray(width,height){
	array=new Array();
	var i;
	for( i=0;i<width;i++){
		array[i]=new Array();
		var j;
		for( j=0;j<height;j++){
			array[i][j]=0;//Math.floor(Math.random() * 2);
		}
	}
	return array;
}

function countNeighbor(grid,x,y,width,height){
	var count=0;
	var i;
	for(i=x-1;i<x+2;i++){
		var j;
		for(j=y-1;j<y+2;j++){
			//if(i>=0 && i<width && j>=0 && j<height){
				if(i!=x || j!=y){
					if(grid[(i+width)%width][(j+height)%height]==1){
						count++;
					}
				}
				
			//}
			
		}
	}
	return count;
}

var newLifeX=Array();
var newLifeY=Array();
var newIndex=0;

var click=false;

canvas.addEventListener ("mousemove",function(event){

if(click==true){
	Mousex= event.clientX-canvas.offsetLeft;
 Mousey= event.clientY-canvas.offsetTop;

newLifeX[newIndex]=Math.floor(Mousex/resolution);
newLifeY[newIndex]=Math.floor(Mousey/resolution);
newIndex++;
	
}
 
});



canvas.addEventListener ("mousedown",function(event){
Mousex= event.clientX-canvas.offsetLeft;
 Mousey= event.clientY-canvas.offsetTop;

newLifeX[newIndex]=Math.floor(Mousex/resolution);
newLifeY[newIndex]=Math.floor(Mousey/resolution);
newIndex++;
 click=true;
});

canvas.addEventListener ("mouseup",function(event){

 click=false;
});

PlayButton.addEventListener ("mousedown",function(event){
	playing=!playing;
 
});

var clearScreen=false;
ClearButton.addEventListener ("mousedown",function(event){
	clearScreen=true;
 
});

var random=false;
RandomButton.addEventListener ("mousedown",function(event){
	random=true;
 
});

window.onload=function(){
document.body.appendChild(canvas);
document.body.appendChild(PlayButton);
document.body.appendChild(ClearButton);
document.body.appendChild(RandomButton);
animate(step);
};
