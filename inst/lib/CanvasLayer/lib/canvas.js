function add_canvas(map_id) {
//	window[map_id + 'googelCanvasLayer'] = [];
//	window[map_id + 'googleCanvasLayer'] = new MeasureTool(window[map_id + 'map']);

//	measure_data(map_id);

// example
// https://github.com/brendankenny/CanvasLayer/blob/gh-pages/examples/hello_webgl.html

// tutorial
// https://www.youtube.com/watch?v=kB0ZVUrI4Aw

  var vertexShaderText =
  [
  'precision mediump float;',
  '',
  'attribute vec4 worldCoord;',
  '',
  'uniform mat4 mapMatrix;',
  '',
  'void main()',
  '{',
  ' gl_Position = mapMatrix * worldCoord;',
  '',
  ' gl_PointSize = 10.;',
  '}'
  ].join('\n');

  var fragmentShaderText =
  [
  	'precision mediump float;',
  	'',
  	'void main()',
  	'{',
  	' gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);',
  	'}'
  ].join('\n');

  var map = window[map_id + 'map'],
    canvasLayer,
    gl,
    pixelsToWebGLMatrix = new Float32Array(16),
    resolutionScale = window.devicePixelRatio || 1,
    mapMatrix = new Float32Array(16);

  var pointProgram;
  var pointArrayBuffer;
  var POINT_COUNT = 2000;

  var MIN_X = 40;
  var MAX_X = 80;
  var MIN_Y = 88;
  var MAX_Y = 109;


  // initialize the canvasLayer
  var canvasLayerOptions = {
    map: map,
    resizeHandler: resize,
    animate: false,
    //updateHandler: update,
    resolutionScale: resolutionScale
  };
  canvasLayer = new CanvasLayer(canvasLayerOptions);
  // initialize WebGL
  gl = canvasLayer.canvas.getContext('webgl');
  if (!gl) {
  	console.log("webgl not supported, falling back on experimental");
  	gl = canvasLayer.getContext('experimental-webgl');
  }

  if (!gl) {
  	console.log("webgl not supported");
  }

  //gl.clearColor(0.75, 085, 0.8, 1.0);
  //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  createShaderProgram();
  //loadData();

	function createShaderProgram() {
	  console.log("shder program");

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderText);
    gl.shaderSource(fragmentShader, fragmentShaderText);

    gl.compileShader(vertexShader);

    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    	console.error("ERROR compiling vertex shader : ", gl.getShaderInfoLog(vertexShader));
    	return;
    }

    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    	console.error("ERROR compiling fragment shader : ", gl.getShaderInfoLog(fragmentShader));
    	return;
    }

	  //// create vertex shader
	  //var vertexSrc = document.getElementById('pointVertexShader').text;
	  //var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	  //gl.shaderSource(vertexShader, vertexSrc);
	  //gl.compileShader(vertexShader);

	  //// create fragment shader
	  //var fragmentSrc = document.getElementById('pointFragmentShader').text;
	  //var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	  //gl.shaderSource(fragmentShader, fragmentSrc);
	  //gl.compileShader(fragmentShader);
	  //// link shaders to create our program

	  var pointProgram = gl.createProgram();

	  gl.attachShader(pointProgram, vertexShader);
	  gl.attachShader(pointProgram, fragmentShader);
	  gl.linkProgram(pointProgram);

	  if (!gl.getProgramParameter(pointProgram, gl.LINK_STATUS)) {
	  	console.error('ERROR linking program', gl.getProgramInfoLog(pointProgram));
	  }
	  gl.useProgram(pointProgram);


	  var rawData = new Float32Array(2 * POINT_COUNT);
    for (var i = 0; i < rawData.length; i += 2) {
      rawData[i] = lerp(MIN_X, MAX_X, Math.random());
      rawData[i + 1] = lerp(MIN_Y, MAX_Y, Math.random());
    }

    // create webgl buffer, bind it, and load rawData into it
    pointArrayBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pointArrayBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, rawData, gl.STATIC_DRAW);
    // enable the 'worldCoord' attribute in the shader to receive buffer
    console.log("program? :" );
    console.log(pointProgram);
    var attributeLoc = gl.getAttribLocation(pointProgram, 'worldCoord');
    // tell webgl how buffer is laid out (pairs of x,y coords)
    gl.vertexAttribPointer(
    	attributeLoc, // Attribute location
    	2,            // Number of elements per attribute
    	gl.FLOAT,     // Type of elements
    	gl.FALSE,     //
    	0,            // size of and individual vertex
    	0             // offset fro mthe beginning of a single vertix to this attribute
    	);
    	gl.enableVertexAttribArray(attributeLoc);

	}

  // linear interpolate between a and b
  function lerp(a, b, t) {
    return a + t * (b - a);
  }


/*
  function loadData() {
    // this data could be loaded from anywhere, but in this case we'll
    // generate some random x,y coords in a world coordinate bounding box
    var rawData = new Float32Array(2 * POINT_COUNT);
    for (var i = 0; i < rawData.length; i += 2) {
      rawData[i] = lerp(MIN_X, MAX_X, Math.random());
      rawData[i + 1] = lerp(MIN_Y, MAX_Y, Math.random());
    }

    // create webgl buffer, bind it, and load rawData into it
    pointArrayBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pointArrayBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, rawData, gl.STATIC_DRAW);
    // enable the 'worldCoord' attribute in the shader to receive buffer
    console.log("program? :" );
    console.log(pointProgram);
    var attributeLoc = gl.getAttribLocation(pointProgram, 'worldCoord');
    // tell webgl how buffer is laid out (pairs of x,y coords)
    gl.vertexAttribPointer(
    	attributeLoc, // Attribute location
    	2,            // Number of elements per attribute
    	gl.FLOAT,     // Type of elements
    	gl.FALSE,     //
    	0,            // size of and individual vertex
    	0             // offset fro mthe beginning of a single vertix to this attribute
    	);
    	gl.enableVertexAttribArray(attributeLoc);

  }
*/

    function resize() {
        var width = canvasLayer.canvas.width;
        var height = canvasLayer.canvas.height;
        gl.viewport(0, 0, width, height);
        // Matrix which maps pixel coordinates to WebGL coordinates.
        // If canvasLayer is scaled (with resolutionScale), we need to scale
        // this matrix by the same amount to account for the larger number of
        // pixels.

        pixelsToWebGLMatrix.set([
          2 * resolutionScale / width, 0, 0, 0,
          0, -2 * resolutionScale / height, 0, 0,
          0, 0, 0, 0,
          -1, 1, 0, 1
        ]);
      }

      function scaleMatrix(matrix, scaleX, scaleY) {
        // scaling x and y, which is just scaling first two columns of matrix
        matrix[0] *= scaleX;
        matrix[1] *= scaleX;
        matrix[2] *= scaleX;
        matrix[3] *= scaleX;
        matrix[4] *= scaleY;
        matrix[5] *= scaleY;
        matrix[6] *= scaleY;
        matrix[7] *= scaleY;
      }
      function translateMatrix(matrix, tx, ty) {
        // translation is in last column of matrix
        matrix[12] += matrix[0]*tx + matrix[4]*ty;
        matrix[13] += matrix[1]*tx + matrix[5]*ty;
        matrix[14] += matrix[2]*tx + matrix[6]*ty;
        matrix[15] += matrix[3]*tx + matrix[7]*ty;
      }

      function update() {
        gl.clear(gl.COLOR_BUFFER_BIT);
        var mapProjection = map.getProjection();
        //
         // We need to create a transformation that takes world coordinate
         // points in the pointArrayBuffer to the coodinates WebGL expects.
         // 1. Start with second half in pixelsToWebGLMatrix, which takes pixel
         //     coordinates to WebGL coordinates.
          //2. Scale and translate to take world coordinates to pixel coords
         //see https://developers.google.com/maps/documentation/javascript/maptypes#MapCoordinate


        // copy pixel->webgl matrix
        mapMatrix.set(pixelsToWebGLMatrix);
        // Scale to current zoom (worldCoords * 2^zoom)
        var scale = Math.pow(2, map.zoom);
        scaleMatrix(mapMatrix, scale, scale);
        // translate to current view (vector from topLeft to 0,0)
        var offset = mapProjection.fromLatLngToPoint(canvasLayer.getTopLeft());
        translateMatrix(mapMatrix, -offset.x, -offset.y);
        // attach matrix value to 'mapMatrix' uniform in shader
        var matrixLoc = gl.getUniformLocation(pointProgram, 'mapMatrix');
        gl.uniformMatrix4fv(matrixLoc, false, mapMatrix);
        // draw!
        gl.drawArrays(gl.POINTS, 0, POINT_COUNT);
      }
      /*

      document.addEventListener('DOMContentLoaded', init, false);
  }
  */
}

