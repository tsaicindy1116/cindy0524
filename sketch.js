let points = [[-1, 4], [0,4], [1, 5],[0,6],[1,7],[0,8],[1,9],[0,10],[1,10],[3,8],[3,5],[2,4],[4,2],[6,4],[6,5],[7,4], [4,1], [4, 0],[6,-2],[7,-2],[6,-3],[4,-1], [4, -3],[6,-5],[7,-5],[6,-6],[4,-4], [2,-6], [-3, -6],[-5,-4],[-7,-6],[-8,-5],[-7,-5], [-5, -3],[-5,-1],[-7,-3],[-8,-2],[-7,-2], [-5,0], [-5, 1],[-8,4],[-7,5],[-7,4],[-5,2], [-3,4],[-4,5],[-4,8],[-2,10],[-1,10], [-2,9], [-1, 8],[-2,7],[-1,6],[-2,5],[-1,4],[0,4]]; //list資料，
var fill_colors = "f6bd60-f7ede2-f5cac3-84a59d-f28482".split("-").map(a=>"#"+a)
var line_colors = "dad7cd-a3b18a-588157-3a5a40-344e41".split("-").map(a=>"#"+a)
function preload(){
  elephant_sound =loadSound("sound/dong-wu-jian-jiao-sheng.mp3")
  bullet_sound=loadSound("sound/sound-effect.mp3")
}

//class：類別、例子
class obj{ //宣告一個類別，一個物件/圖案就是一個類別，針對所畫的圖，設定的基本條件
    constructor(args){//預設值，物件的基本資料（ex.物件的顏色、移動的速度、物件的大小、物件初始顯示位置）
      //this.p = args.p||{x:random(0,width), y:random(0,height)}//描述該物件的初始位置，x軸為零到視窗寬度，y軸為零到視窗高度，零可忽略不寫，但可更換他的初始位置，ex.(100,width)
      this.p = args.p|| createVector(random(0,width),random(0,height))
      this.v = createVector( random(-1,1), random(-1,1))//物件移動的速度，x軸正負為左右，y軸正負為上下
      this.size = random(5,10)//亂數抽物件大小10倍到30倍
      this.color = random(fill_colors)
      this.stroke = random(line_colors)
    }
    draw(){//畫出單一個物件形狀
      push()//執行push()後，依照我的設定，設定原點在(0,0)位置
        translate(this.p.x, this.p.y) //該物件位置為原點，this.p在constructor中，x,y為指定這個p中的x與y，畫圖時要將圖畫到圖型的正中心
        scale(this.v.x<0?1:-1,-1)//if this.v.x<0?條件成立值為1，否則值為-1，大象鼻子向左邊就是1，右邊就是-1//否則要用:
        fill(this.color)
        stroke(this.stroke)
        strokeWeight(4)//線條粗細
        beginShape()
        for(var k = 0; k < points.length ; k = k + 1){//k要小於點的長度//下面加一上面就要減一
          //line(points[k][0]*this.size,points[k][1]*this.size,points[k+1][0]*this.size,points[k+1][1]*this.size)//0代表x軸＝第一個數字，1代表y軸//k+1為x,y點的下一個點
          vertex(points[k][0]*this.size,points[k][1]*this.size)//vertex”只需設定一個點，當程式碼跑到endShape()，會把所有的點串接再一起
          curveVertex(points[k][0]*this.size,points[k][1]*this.size)//圓弧圖形，但上面的for回圈指令中points.length的-1則要去掉
        }
        endShape()
      pop()//執行pop()之後，原點(0,0)回到整個視窗的左上角
    }
    update(){//移動後設定位置資料值為何
      // this.p.x = this.p.x + this.v.x
      // this.p.y = this.p.y + this.v.y
      this.p.add(this.v)
      let mouseV=createVector(mouseX,mouseY)
      let delta=mouseV.sub(this.p).limit(this.v.mag()*2)//物件隨著滑鼠移動
      this.p.add(delta)//物件隨著滑鼠移動
    if (this.p.x<=0||this.p.x>=width)
    {
      this.v.x=-this.v.x
    }
    if (this.p.y<=0||this.p.y>=height)
    {
      this.v.y=-this.v.y
    }
    }
isBallInRanger(mouseX,mouseY){
let d =dist(mouseX,mouseY,this.p.x,this.p.y)
if (d<this.size*4){//4的由來:去看作標點最大的值，一此作為方框的高與寬
return true//代表距離有再範圍
}else{
return false//代表去離沒有在範圍
}
}
}
var ball//目前要處理的物件，暫時放在ball變數內
var balls = [] //宣告balls為一群陣列，把產生“所有”的物件
var bullet
var bullets= []
var monster
var monsters=[]
var score=0
var shipP
function setup() {
  createCanvas(windowWidth,windowHeight);
  shipP = createVector(width/2,height/2)//預設砲台的位置在視窗中間
  for(var i = 0 ; i < 50 ; i = i + 1){//設定迴圈，if i+1，i=0~9共繞回圈10次；if i+2，i=0,2,4,6,8
    ball = new obj({}) //產生一個obj class元件
    balls.push(ball)//把ball的物件放入（push）到balls陣列內
  }
  for(var i = 0 ; i < 1 ; i = i + 1){//設定迴圈，if i+1，i=0~9共繞回圈10次；if i+2，i=0,2,4,6,8
    monster = new Monster({}) //產生一個obj class元件
    monsters.push(monster)//把ball的物件放入（push）到balls陣列內
  }
}

function draw() {//每秒執行60次
  background(220);
  // for(var j = 0; j < balls.length; j = j + 1){
  //   ball = balls[j]
  //   ball.draw()
  //   ball.update()
  // }
  if (keyIsPressed){
    if(key=="ArrowLeft"){
      shipP.x=shipP.x-5
    }
    if(key=="ArrowRight"){
      shipP.x=shipP.x+5
    }
    // if(key=="ArrowUp"){
    //   shipP.y=shipP.y-5
    // }
    // if(key=="ArrowDown"){
    //   shipP.y=shipP.y+5
    // }
  }
  for (let ball of balls){//針對陣列變數，取出陣列內一個一個的物件
    ball.draw()
    ball.update()
    //每隻大象有沒有碰觸每一個飛彈
    for (let bullet of bullets){
      if(ball.isBallInRanger(bullet.p.x,bullet.p.y)){
        score=score+2
        elephant_sound.play()
        balls.splice(balls.indexOf(ball),1)
        bullets.splice(bullets.indexOf(bullet),1)
        
      }
    }
      if(ball.isBallInRanger(mouseX,mouseY)){
        score=score-2
        balls.splice(balls.indexOf(ball),1)
        
      }
    
    }


  for (let bullet of bullets){//針對飛彈韓庫內資料
    bullet.draw()
    bullet.update()
    
  }
  // for (let monster of monsters){//針對飛彈韓庫內資料
  //   if(monster.IsDead && monster.timenum>=10){
  //     monsters.splice(monsters.indexOf(monster),1)//怪物消失不見

  //   }
  for (let monster of monsters){//針對飛彈韓庫內資料
    monster.draw()
    monster.update()
    
  }
    
    
    
  //}





  textSize(50)
  text(score,50,50)
  push()
  let dx=mouseX-width/2//滑鼠座標到中心點座標的x軸距離
  let dy=mouseY-height/2//滑鼠座標到中心點座標的y軸距離
  let angle=atan2(dy,dx)//利用反tan算出角度
  //translate(width/2,height/2)
  translate(shipP.x,shipP.y)//砲台位置
  // let angle=atan2(mouseY,mouseX)
  rotate(angle)//讓三角形翻轉一個amgle角度
  fill("#ffc03a")
  noStroke()
  ellipse(0,0,60)
  triangle(50,0,-25,-25,-25,25)
  pop()

  ellipse(0,0,30)
}
// function mousePressed(){//按下滑鼠產出一個物件程式碼
//   ball = new obj({
//     p:{x:mouseX, y:mouseY}
//   }) //產生一個obj class元件
//     balls.push(ball)//把ball的物件放入（push）到balls陣列內
// }
function mousePressed(){
//   for(let ball of balls){
//   if(ball.isBallInRanger()){
//     score=score+1
//     balls.splice(balls.indexOf(ball),1)//把倉庫第幾個刪除，只刪除1個
//   }
// }
//新增一個飛彈資料(還沒有顯示)
bullet=new Bullet({
  // r:random(10,30),
  // color:random()
})
bullets.push(bullet)//把這一筆資料方在倉庫裡面
bullet_sound.play()

}
function keyPressed(){
if(key==" "){
  bullet=new Bullet({
    // r:random(10,30),
    // color:random()
  })
  bullets.push(bullet)//把這一筆資料方在倉庫裡面
  bullet_sound.play()
}


}