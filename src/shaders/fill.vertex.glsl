attribute vec2 a_pos;

uniform mat4 u_matrix;

#pragma goong: define highp vec4 color
#pragma goong: define lowp float opacity

void main() {
    #pragma goong: initialize highp vec4 color
    #pragma goong: initialize lowp float opacity

    gl_Position = u_matrix * vec4(a_pos, 0, 1);
}
