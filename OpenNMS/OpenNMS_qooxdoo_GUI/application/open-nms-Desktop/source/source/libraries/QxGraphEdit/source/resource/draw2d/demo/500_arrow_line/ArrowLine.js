draw2d.ArrowLine=function(){
this.lineColor=new draw2d.Color(0,0,0);
this.stroke=1;
this.canvas=null;
this.workflow=null;
this.html=null;
this.graphics=null;
this.id=draw2d.UUID.create();
this.startX=30;
this.startY=30;
this.endX=100;
this.endY=100;
this.setSelectable(true);
this.setDeleteable(true);
this.arrowWidth=10;
this.arrowLength=20;
this.lineWidth=5;
};
draw2d.ArrowLine.prototype=new draw2d.Line();
draw2d.ArrowLine.prototype.type="draw2d.ArrowLine";
draw2d.ArrowLine.prototype.paint=function(){
if(this.graphics===null){
this.graphics=new jsGraphics(this.id);
}else{
this.graphics.clear();
}
this.graphics.setStroke(this.stroke);
this.graphics.setColor(this.lineColor.getHTMLStyle());
var endY=this.getLength();
var _24bc=[0,0,endY-this.arrowLength,endY-this.arrowLength,endY,endY-this.arrowLength,endY-this.arrowLength,0];
var _24bd=[-this.lineWidth,+this.lineWidth,+this.lineWidth,this.lineWidth+this.arrowWidth/2,0,-(this.lineWidth+this.arrowWidth/2),-this.lineWidth,-this.lineWidth];
var _24be=this.getAngle()*Math.PI/180;
var rotX=[];
var rotY=[];
for(var i=0;i<_24bc.length;i++){
rotX[i]=this.startX+_24bc[i]*Math.cos(_24be)-_24bd[i]*Math.sin(_24be);
rotY[i]=this.startY+_24bc[i]*Math.sin(_24be)+_24bd[i]*Math.cos(_24be);
}
this.graphics.drawPolyLine(rotX,rotY);
this.graphics.paint();
};
