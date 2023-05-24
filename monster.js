var monster_colors = "50514f-f25f5c-ffe066-247ba0-70c1b3".split("-").map(a=>"#"+a)
class Monster{ //宣告一個類別，一個物件/圖案就是一個類別，針對所畫的圖，設定的基本條件
    constructor(args){
        this.r=args.r||(100,100)
        this.p = args.p|| createVector(mouseX,mouseY)
        this.v = args.v||createVector(random(-1,1),random(-1,1))
        this.color = args.color||random(monster_colors)
        this.mode=random(["happy","bad"])
        this.IsDead= false//代表還活著
        this.timenum=0
    }
    draw(){
            push()
            translate(0,0)
            fill("#a98467")
            noStroke()
            ellipse(0+mouseX,0+mouseY,this.r)
            ellipse(25+mouseX,-35+mouseY,this.r/2)
            ellipse(-25+mouseX,-35+mouseY,this.r/2)
            fill(0)
            ellipse(-15+mouseX,-15+mouseY,this.r/10)
            ellipse(15+mouseX,-15+mouseY,this.r/10)
                
        pop()


    }
    update(){
this.p.add()
    }
    //碰撞函數
    // isBallInRanger(mouseX,mouseY){
    //     let d =dist(mouseX,mouseY,this.p.x,this.p.y)
    //     if (d<this.r/2){//非辦與怪物間的距離如果小於半徑(this.r/2)
    //     return true//代表距離有再範圍
    //     }else{
    //     return false//代表去離沒有在範圍
    //     }
    //     }
}