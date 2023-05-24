class Bullet{
    constructor(args){//預設值，基本資料(包含物件的顏色位置速度大小...)
    
    this.r=args.r||10
    //this.p = args.p|| createVector(width/2,height/2)
    this.p = args.p||shipP.copy()//子彈跟著砲台走
    this.v = args.v||createVector(mouseX-width/2,mouseY-height/2).limit(10)//物件移動的速度，x軸正負為左右，y軸正負為上下
    //this.size = random(5,10)//亂數抽物件大小10倍到30倍
    this.color = args.color||"red"
    //this.stroke = random(line_colors)
}
draw(){//劃出非但
    push()
    translate(this.p.x,this.p.y)
    fill(this.color)
    noStroke()
    ellipse(0,0,this.r)
    // rectMode(CENTER)
    // rect(0,0,20,40)
    // triangle()
    pop()

}
update(){//計算移動
this.p.add(this.v)

}
}