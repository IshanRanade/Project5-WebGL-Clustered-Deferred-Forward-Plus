import { gl, canvas, abort, gpu } from './init';
import QuadVertSource from './shaders/quad.vert.glsl';
import { mat4, vec4, vec3 } from 'gl-matrix';

function downloadURI(uri, name) {
  var link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export function saveCanvas() {
  downloadURI(canvas.toDataURL('image/png'), 'webgl-canvas-' + Date.now() + '.png');
}

function compileShader(shaderSource, shaderType) {
  var shader = gl.createShader(shaderType);
  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(shaderSource);
      abort('shader compiler error:\n' + gl.getShaderInfoLog(shader));
  }

  return shader;
};

function linkShader(vs, fs) {
  var prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      abort('shader linker error:\n' + gl.getProgramInfoLog(prog));
  }
  return prog;
};

function addShaderLocations(result, shaderLocations) {
  if (shaderLocations && shaderLocations.uniforms && shaderLocations.uniforms.length) {
    for (let i = 0; i < shaderLocations.uniforms.length; ++i) {
      result = Object.assign(result, {
        [shaderLocations.uniforms[i]]: gl.getUniformLocation(result.glShaderProgram, shaderLocations.uniforms[i]),
      });
    }
  }
  if (shaderLocations && shaderLocations.attribs && shaderLocations.attribs.length) {
    for (let i = 0; i < shaderLocations.attribs.length; ++i) {
      result = Object.assign(result, {
        [shaderLocations.attribs[i]]: gl.getAttribLocation(result.glShaderProgram, shaderLocations.attribs[i]),
      });
    }
  }
  return result;
}

export function loadShaderProgram(vsSource, fsSource, shaderLocations) {
  const vs = compileShader(vsSource, gl.VERTEX_SHADER);
  const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
  return addShaderLocations({
    glShaderProgram: linkShader(vs, fs),
  }, shaderLocations);
}

const quadPositions = new Float32Array([
  -1.0, -1.0, 0.0,
   1.0, -1.0, 0.0,
  -1.0,  1.0, 0.0,
   1.0,  1.0, 0.0
]);

const quadBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
gl.bufferData(gl.ARRAY_BUFFER, quadPositions, gl.STATIC_DRAW);

export function renderFullscreenQuad(program) {
  // Bind the program to use to draw the quad
  gl.useProgram(program.glShaderProgram);

  // Bind the VBO as the gl.ARRAY_BUFFER
  gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);

  // Enable the bound buffer as the vertex attrib array for
  // program.a_position, using gl.enableVertexAttribArray
  gl.enableVertexAttribArray(program.a_position);
  
  // Use gl.vertexAttribPointer to tell WebGL the type/layout for
  // program.a_position's access pattern.
  gl.vertexAttribPointer(program.a_position, 3, gl.FLOAT, gl.FALSE, 0, 0);

  // Use gl.drawArrays to draw the quad
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  // Disable the enabled vertex attrib array
  gl.disableVertexAttribArray(program.a_position);

  // Unbind the array buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
}



export class AABB {
  static getAABBForLight(scene, camera, viewMatrix, lightIndex) {
    let aabb = new AABB();

    myFunc();
    //console.log(myFunc);
    // let lightPosition = scene.lights[lightIndex].position;
    // let lightRadius = scene.lights[lightIndex].radius;

    // let minVector = vec4.fromValues(
    //   lightPosition[0] - lightRadius,
    //   lightPosition[1] - lightRadius,
    //   lightPosition[2] - lightRadius,
    //   1.0
    // );

    // let maxVector = vec4.fromValues(
    //   lightPosition[0] + lightRadius,
    //   lightPosition[1] + lightRadius,
    //   lightPosition[2] + lightRadius,
    //   1.0
    // );

    // vec4.transformMat4(minVector, minVector, viewMatrix);
    // vec4.transformMat4(maxVector, maxVector, viewMatrix);

    // aabb.min = vec3.fromValues(
    //   Math.min(minVector[0], maxVector[0]),
    //   Math.min(minVector[1], maxVector[1]),
    //   Math.min(minVector[2], maxVector[2])
    // );

    // aabb.max = vec3.fromValues(
    //   Math.max(minVector[0], maxVector[0]),
    //   Math.max(minVector[1], maxVector[1]),
    //   Math.max(minVector[2], maxVector[2])
    // );

    return aabb;
  }
}

export function frustrumAABBIntersect() {

};