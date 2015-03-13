var jsondrop = function( elem, options ) {
  this.element = document.getElementById(elem);
  this.options = options || {};
  this.name = 'jsondrop';
  this.files = [];
  this._addEventHandlers();
}

jsondrop.prototype._readFiles = function(files) {
  var _this = this;
  for (i = 0; i < files.length; i++) {
    (function(file){
      fr = new FileReader();
      fr.onload = function() {
        var json = JSON.parse(fr.result);
        var newElement = {
          name: file.name,
          data: json,
          uploaded: Math.floor(Date.now() / 1000)
        }
        _this.files.push(newElement);
      }
      fr.readAsText(file, 'UTF-8');
    })(files[i]);
  }
}

jsondrop.prototype._addEventHandlers = function() {
  
  // bind jsondrop to _this for use in 'ondrop'
  var _this = this;

  this.element.addEventListener('dragover', ondragover, false);
  this.element.addEventListener('dragleave', ondragleave, false);
  this.element.addEventListener('drop', ondrop, false);

  function ondragover(e) {
    e = e || event;
    e.preventDefault();
    this.className = 'dragging';
  }

  function ondragleave(e) {
    e = e || event;
    e.preventDefault();
    this.className = '';
  }

  function ondrop(e) {
    e = e || event;
    e.preventDefault();
    this.className = '';
    files = e.dataTransfer.files;
    _this._readFiles(files);
  }
}