var gl;

$( document ).ready(function() {
	var aquaMain = function() {
	    var canvasEl = $('#tank-canvas')[0];


	    var tank = new FishTank(canvasEl);
	    tank.init();

	    var fishesL = new Array(Aqua.numFishLeft);
	    var fishesR = new Array(Aqua.numFishRight);

	    for (var l = 0; l < Aqua.numFishLeft; l++) {
	    	fishesL[l] = new Fish(canvasEl, true);
	    	fishesL[l].initFishBuffer();

	    	var randomY = Math.random() * 8.0 - 3.8;
	    	var randomX = -(Math.random() * 4.0) - 3.0;
			var randomSpeed = Math.random() * 0.0500 + 0.001;

	    	fishesL[l].setInitalPosition(randomX, randomY);
	    	fishesL[l].setSpeed(randomSpeed);
	    }

	   	for (var r = 0; r < Aqua.numFishRight; r++) {
	    	fishesR[r] = new Fish(canvasEl, false);
	    	fishesR[r].initFishBuffer();

	    	var randomY = Math.random() * 8.0 - 3.8;
	    	var randomX = (Math.random() * 4.0) + 3.0;
			var randomSpeed = Math.random() * 0.0500 + 0.001;
	    	fishesR[r].setInitalPosition(randomX, randomY);
	    	fishesR[r].setSpeed(randomSpeed);
	    }


	    var lastTime = (new Date()).getTime();
    	var render = function render(currentTime) {

    		// Render and animate left fishes
    		for (var l = 0; l < Aqua.numFishLeft; l++) {
		        fishesL[l].render();
		        if (currentTime > 500) {
		        	fishesL[l].moveLeft(randomSpeed);
				}
			}

			// Render and animate right fishes
			for (var r = 0; r < Aqua.numFishRight; r++) {
		        fishesR[r].render();
		        if (currentTime > 500) {
		        	fishesR[r].moveRight(randomSpeed);
				}
			}

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
        initAllTexture();

		Aqua.perspectiveMatrix = makePerspective(45, 640.0 / 480.0, 0.1, 100.0);
	}
}


var Fish = function(canvas, isLeft) {
	var self = this;
	this.canvas = canvas;
	this.verticesBuffer;
	this.verticesTextureCoordBuffer;
	this.verticesIndexBuffer;
	this.isLeft = isLeft;
	this.speed = 0.01;

	this.xPos = 0.0, this.yPos = 0.0;

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
		// Set matrix
		MvMatrix.loadIdentity();
		MvMatrix.mvTranslate([ 0.0, 0.0, -5.0 ]);

		// Save Matrix Location
		MvMatrix.mvPushMatrix();

		// Translate
		MvMatrix.mvTranslate([ this.xPos, this.yPos, 0.0 ]);

		// Binding matrix to buffer
		gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesBuffer);
		gl.vertexAttribPointer(Aqua.vertexPositionAttribute, 3, gl.FLOAT, false, 0,
				0);

		// Bind Texture to Buffer
		gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesTextureCoordBuffer);
		gl.vertexAttribPointer(Aqua.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);

		// Bind Textures
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, this.correctTexture());
		gl.uniform1i(gl.getUniformLocation(Aqua.shaderProgram, "uSampler"), 0);

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.verticesIndexBuffer);

		// Draw Object
		setMatrixUniforms();
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

		// Restore the original matrix
		MvMatrix.mvPopMatrix();
	}

	self.moveLeft = function() {
		self.xPos += self.speed;
		if (self.xPos > 5) {
			self.xPos = -5;
			self.yPos = Math.random() * 10.0 - 5.0;
		}
	}

	self.moveRight = function() {
		self.xPos -= self.speed;
		if (self.xPos < -5) {
			self.xPos = 5;
			self.yPos = Math.random() * 10.0 - 5.0;
		}
	}

	self.correctTexture = function () {
		if (self.isLeft) return textures[0];
		else return textures[1];
	}

	self.setInitalPosition = function(xPos, yPos) {
		self.xPos = xPos;
		self.yPos = yPos;
	}

	self.setSpeed = function(delta) {
		this.speed = delta;
	}
}


// FishTank variables:

Aqua = {
	numFishLeft : 5,
	numFishRight: 5,
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

var textures = Array(2);
function initAllTexture() {
	textures[1] = initTexture("resources/images/pink_salmon512.png");
	textures[0] = initTexture("resources/images/pink_salmon512R.png");
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
	image.src = imagePath;
	image.onload = function() {
		handleTextureLoaded(image, texture);
	};
	return texture;
}

function setMatrixUniforms() {
	var pUniform = gl.getUniformLocation(Aqua.shaderProgram, "uPMatrix");
	gl.uniformMatrix4fv(pUniform, false, new Float32Array(Aqua.perspectiveMatrix
			.flatten()));

	var mvUniform = gl.getUniformLocation(Aqua.shaderProgram, "uMVMatrix");
	gl.uniformMatrix4fv(mvUniform, false, new Float32Array(MvMatrix.mvMatrix.flatten()));
}
