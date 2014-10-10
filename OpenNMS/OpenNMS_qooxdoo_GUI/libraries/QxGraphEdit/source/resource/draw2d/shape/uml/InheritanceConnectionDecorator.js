draw2d.shape.uml.InheritanceConnectionDecorator=function(){
this.setBackgroundColor(new draw2d.Color(255,255,255));
};
draw2d.shape.uml.InheritanceConnectionDecorator.prototype=new draw2d.ConnectionDecorator();
draw2d.shape.uml.InheritanceConnectionDecorator.prototype.type="shape.uml.InheritanceConnectionDecorator";
draw2d.shape.uml.InheritanceConnectionDecorator.prototype.paint=function(g){
if(this.backgroundColor!==null){
g.setColor(this.backgroundColor);
g.fillPolygon([3,20,20,3],[0,8,-8,0]);
}
g.setColor(this.color);
g.setStroke(1);
g.drawPolygon([3,20,20,3],[0,8,-8,0]);
};
