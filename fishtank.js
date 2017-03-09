$( document ).ready(function() {
	var aquaMain = function() {
	    var canvasEl = $('#tank-canvas')[0];


	    var tank = new FishTank(canvasEl);
	    tank.init();

	    var fishes = new Fish();
	    fishes.init();

	    var lastTime = (new Date()).getTime();
    	var render = function render(currentTime) {
	        var deltaTime = (currentTime - lastTime) / 1000 || 0.0;
	        lastTime = currentTime;

	        //tank.render();

	        requestAnimationFrame(render);
    	};
    	render();
	}

	if (hasWebGLSupportWithExtensions(['OES_texture_float', 'OES_texture_float_linear'])) {
	    aquaMain();
	}
});

var perspectiveMatrix;

var FishTank = function(canvas) {
	var self = this;
	this.canvas = canvas;


	self.init = function() {
		console.log(self);
		var gl = self.canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

		var width = window.innerWidth,
        	height = window.innerHeight;
		perspectiveMatrix = makePerspectiveMatrix(new Float32Array(16), FOV, width / height, NEAR, FAR);
	}
}


var Fish = function(canvas) {
	var self = this;
	this.canvas = canvas;
	this.verticesBuffer;
	this.verticesTextureCoordBuffer;
	this.verticesIndexBuffer;

	function initFishBuffer() {
		this.verticesBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesBuffer);
		var vertices = [ -0.5, 0.5, 0.0, -0.5, -0.5, 0.0, 0.5, 0.5, 0.0, 0.5,
				-0.5, 0.0 ];
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices),
				gl.STATIC_DRAW);

		this.verticesTextureCoordBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesTextureCoordBuffer);
		var textureCoords = [ 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0 ];
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords),
				gl.STATIC_DRAW);

		this.verticesIndexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.verticesIndexBuffer);
		var plVertexIndices = [ 0, 1, 2, 0, 2, 3 ];
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
				new Uint16Array(plVertexIndices), gl.STATIC_DRAW);
	}

	self.init = function() {

	}
}