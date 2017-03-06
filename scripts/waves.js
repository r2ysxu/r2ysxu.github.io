$( document ).ready(function() {
	var main = function () {
	    var camera = new Camera(),
	        projectionMatrix = makePerspectiveMatrix(new Float32Array(16), FOV, MIN_ASPECT, NEAR, FAR);

	    var canvasEl = $('#waves-canvas')[0];
	    var cameraEl = $('#waves-camera')[0];
	    var simulator = new Simulator(canvasEl, window.innerWidth, window.innerHeight);

	    var width = window.innerWidth,
        	height = window.innerHeight;

	    var onresize = function () {
	        var windowWidth = window.innerWidth,
	        windowHeight = window.innerHeight;

	        if (windowWidth / windowHeight > MIN_ASPECT) {
	            makePerspectiveMatrix(projectionMatrix, FOV, windowWidth / windowHeight, NEAR, FAR);
	            simulator.resize(windowWidth, windowHeight);
	            cameraEl.style.width = windowWidth + 'px';
	            cameraEl.style.height = windowHeight + 'px';
	            canvasEl.style.top = '0px';
	            width = windowWidth;
	            height = windowHeight;
	        } else {
	            var newHeight = windowWidth / MIN_ASPECT;
	            makePerspectiveMatrix(projectionMatrix, FOV, windowWidth / newHeight, NEAR, FAR);
	            simulator.resize(windowWidth, newHeight);
	            canvasEl.style.top = (windowHeight - newHeight) * 0.5 + 'px';
	            cameraEl.style.width = windowWidth + 'px';
	            cameraEl.style.height = newHeight + 'px';
	            width = windowWidth;
	            height = newHeight;
	        }
	    };


		onresize();
       	var lastTime = (new Date()).getTime();
    	var render = function render(currentTime) {
	        var deltaTime = (currentTime - lastTime) / 1000 || 0.0;
	        lastTime = currentTime;

	        var fovValue = 0.5 / Math.tan(FOV / 2) * height;
	        setTransform(cameraEl, 'translate3d(0px, 0px, ' + fovValue + 'px) ' + toCSSMatrix(camera.getViewMatrix()) + ' translate3d(' + width / 2 + 'px, ' + height / 2 + 'px, 0px)');
	        simulator.render(deltaTime, projectionMatrix, camera.getViewMatrix(), camera.getPosition());

	        requestAnimationFrame(render);
    	};
    	render();
	}

	if (hasWebGLSupportWithExtensions(['OES_texture_float', 'OES_texture_float_linear'])) {
	    main();
	}
});