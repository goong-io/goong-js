#pragma goong: define highp vec4 color
#pragma goong: define lowp float opacity

void main() {
    #pragma goong: initialize highp vec4 color
    #pragma goong: initialize lowp float opacity

    gl_FragColor = color * opacity;

#ifdef OVERDRAW_INSPECTOR
    gl_FragColor = vec4(1.0);
#endif
}
