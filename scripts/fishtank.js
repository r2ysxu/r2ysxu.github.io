var gl;

$( document ).ready(function() {
	var aquaMain = function() {
	    var canvasEl = $('#tank-canvas')[0];


	    var tank = new FishTank(canvasEl);
	    tank.init();

	    var fishes = new Fish();
	    fishes.initFishBuffer();

	    var lastTime = (new Date()).getTime();
    	var render = function render(currentTime) {
	        var deltaTime = (currentTime - lastTime) / 1000 || 0.0;
	        lastTime = currentTime;

	        fishes.render();

	        requestAnimationFrame(render);
    	};
    	render();
	}

	if (hasWebGLSupportWithExtensions(['OES_texture_float', 'OES_texture_float_linear'])) {
	    aquaMain();
	}
});

var FishTank = function(canvas) {
	var self = this;
	this.canvas = canvas;

	function initShaders() {
		var fragmentShader = buildShader(gl, gl.FRAGMENT_SHADER, Aqua.fragment_shader.join('\n'));
		var vertexShader = buildShader(gl, gl.VERTEX_SHADER, Aqua.vertex_shader.join('\n'));

		// Create & link shader
		Aqua.shaderProgram = gl.createProgram();
		gl.attachShader(Aqua.shaderProgram, vertexShader);
		gl.attachShader(Aqua.shaderProgram, fragmentShader);
		gl.linkProgram(Aqua.shaderProgram);

		if (!gl.getProgramParameter(Aqua.shaderProgram, gl.LINK_STATUS)) {
			alert("Unable to initialize the shader program.");
		}

		gl.useProgram(Aqua.shaderProgram);

		Aqua.vertexPositionAttribute = gl.getAttribLocation(Aqua.shaderProgram,
				"aVertexPosition");
		gl.enableVertexAttribArray(Aqua.vertexPositionAttribute);
		Aqua.textureCoordAttribute = gl
				.getAttribLocation(Aqua.shaderProgram, "aTextureCoord");
		gl.enableVertexAttribArray(Aqua.textureCoordAttribute);
	}


	self.init = function() {
		console.log(self);
		gl = self.canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

		var width = window.innerWidth,
        	height = window.innerHeight;

        if (gl) {
        	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
			gl.viewport(0, 0, canvas.width, canvas.height);
			gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
			gl.enable(gl.BLEND);
        }

        // Keybinding

        // Init
        initShaders();

		Aqua.perspectiveMatrix = makePerspectiveMatrix(new Float32Array(16), FOV, width / height, NEAR, FAR);
	}
}


var Fish = function(canvas) {
	var self = this;
	this.canvas = canvas;
	this.verticesBuffer;
	this.verticesTextureCoordBuffer;
	this.verticesIndexBuffer;

	self.initFishBuffer = function() {
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

	self.render = function() {

	}
}


// FishTank variables:

Aqua = {
	numFish : 5,
	perspectiveMatrix : null,
	shaderProgram : null,
	vertexPositionAttribute : null,
	textureCoordAttribute : null,
	vertex_shader : [
		'attribute vec3 aVertexPosition;',
		'attribute vec2 aTextureCoord;',
		'uniform mat4 uMVMatrix;',
		'uniform mat4 uPMatrix;',
		'varying highp vec2 vTextureCoord;',
		'void main(void) {',
		'	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);',
		'	vTextureCoord = aTextureCoord;',
		'}'
	],
	fragment_shader : [
	  	'varying highp vec2 vTextureCoord;',

		'uniform sampler2D uSampler;',
      
		'void main(void) {',
		'	gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));',
		'}',
	]
}

// Helper functions

function handleTextureLoaded(image, texture) {
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
}

function initTexture(imagePath) {
	var texture = gl.createTexture();
	var image = new Image();
	image.onload = function() {
		handleTextureLoaded(image, texture);
	};
	image.src = imagePath;
	return texture;
}