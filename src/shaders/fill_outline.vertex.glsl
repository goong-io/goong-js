attribute vec2 a_pos;

uniform mat4 u_matrix;
uniform vec2 u_world;

varying vec2 v_pos;

#pragma goong: define highp vec4 outline_color
#pragma goong: define lowp float opacity

void main() {
    #pragma goong: initialize highp vec4 outline_color
    #pragma goong: initialize lowp float opacity

    gl_Position = u_matrix * vec4(a_pos, 0, 1);
    v_pos = (gl_Position.xy / gl_Position.w + 1.0) / 2.0 * u_world;
}
