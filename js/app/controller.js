define(['app/model', 'app/Vertex'], 
    function(model, Vertex){
  var vertexBeingDragged,
      dragStartX, dragStartY;

  function findVertexUnderPoint(x, y){
    return model.find(function(vertex){
      return vertex.contains(x, y);
    });
  }

  canvas.addEventListener('mousedown', function(e){
    vertexBeingDragged = findVertexUnderPoint(e.offsetX, e.offsetY);
    if(vertexBeingDragged){
      dragStartX = vertexBeingDragged.get('x');
      dragStartY = vertexBeingDragged.get('y');
    }
    else{
      model.add(new Vertex({
        x: e.offsetX,
        y: e.offsetY
      }));
    }
  });
  canvas.addEventListener('mousemove', function(e){
    if(vertexBeingDragged){
      vertexBeingDragged.set({
        x: e.offsetX,
        y: e.offsetY
      });
    }
  });
  canvas.addEventListener('mouseup', function(e){
    if(vertexBeingDragged){
      if(dragStartX == vertexBeingDragged.get('x') &&
         dragStartY == vertexBeingDragged.get('y')){
        model.remove(vertexBeingDragged);
      }
    }
    vertexBeingDragged = null;
  });
});