define(['app/model'], function(model){
	
  var c = canvas.getContext('2d');
  var img = document.getElementById("scream");
  
  function render(){
	
	c.drawImage(img, 0, 0, 639, 513);
    c.clearRect(0, 0, canvas.width, canvas.height);
	c.drawImage(img, 0, 0, 639, 513);
	if (document.getElementById("wall").style.backgroundColor == ''){
		c.globalCompositeOperation = "xor";
	} else {
		c.globalCompositeOperation = "source-over";
		c.drawImage(img, 0, 0, 639, 513);
	}
	
    c.beginPath();
    var prev = model.last();
	
	
    c.moveTo(prev.get('x'), prev.get('y'));			/*суда*/
    model.each(function(vertex){
      c.lineTo(vertex.get('x'), vertex.get('y'));	/*суда*/
    });
    c.closePath();
    c.fillStyle =  document.getElementById("wall").style.backgroundColor;
    c.fill();
    
    model.each(renderVertex);
  
  }

  function renderVertex(vertex){
    var x = vertex.get('x'),
        y = vertex.get('y'),								/*суда*/
        radius = vertex.radius;
    c.beginPath();
    c.arc(x, y, radius, 0, 2 * Math.PI);
    c.closePath();
    c.fillStyle = 'red';
    c.fill();
  }

  model.on('add', render);
  model.on('remove', render);
  model.on('change', render);
});

function to_image(){
    var canvas112 = document.getElementById("canvas");	
    document.getElementById("theimage").src = canvas112.toDataURL();
    Canvas2Image.saveAsPNG(canvas);
}

 function showMyImage(fileInput) {
        var files = fileInput.files;
        for (var i = 0; i < files.length; i++) {           
            var file = files[i];
            var imageType = /image.*/;     
            if (!file.type.match(imageType)) {
                continue;
            }           
            var img=document.getElementById("thumbnil");            
            img.file = file;    
            var reader = new FileReader();
            reader.onload = (function(aImg) { 
                return function(e) { 
                    aImg.src = e.target.result; 
                }; 
            })(img);
            reader.readAsDataURL(file);
        }    
    }
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
jQuery(function($){
var fileDiv = document.getElementById("drop1");
var fileInput = document.getElementById("upload-image");
console.log(fileInput);
fileInput.addEventListener("change",function(e){
  var files = this.files
  showThumbnail(files)
},false)

fileDiv.addEventListener("click",function(e){
  $(fileInput).show().focus().click().hide();
  e.preventDefault();
},false)

fileDiv.addEventListener("dragenter",function(e){
  e.stopPropagation();
  e.preventDefault();
},false);

fileDiv.addEventListener("dragover",function(e){
  e.stopPropagation();
  e.preventDefault();
},false);

fileDiv.addEventListener("drop",function(e){
  e.stopPropagation();
  e.preventDefault();

  var dt = e.dataTransfer;
  var files = dt.files;

  showThumbnail(files)
},false);

function showThumbnail(files){
  for(var i=0;i<files.length;i++){
    var file = files[i]
    var imageType = /image.*/
    if(!file.type.match(imageType)){
      console.log("Not an Image");
      continue;
    }

    var image = document.createElement("img");
    // image.classList.add("")
    var thumbnail = document.getElementById("thumbnail");
    thumbnail.file = file;
    

    var reader = new FileReader()
    reader.onload = (function(aImg){
      return function(e){
        aImg.src = e.target.result;
      };
    }(thumbnail))
    var ret = reader.readAsDataURL(file);
    var canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    image.onload= function(){
      ctx.drawImage(thumbnail,100,100)
    }
  }
}
          });