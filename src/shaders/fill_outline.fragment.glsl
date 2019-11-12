varying vec2 v_pos;

#pragma goong: define highp vec4 outline_color
#pragma goong: define lowp float opacity

void main() {
    #pragma goong: initialize highp vec4 outline_color
    #pragma goong: initialize lowp float opacity

    float dist = length(v_pos - gl_FragCoord.xy);
    float alpha = 1.0 - smoothstep(0.0, 1.0, dist);
    gl_FragColor = outline_color * (alpha * opacity);

#ifdef OVERDRAW_INSPECTOR
    gl_FragColor = vec4(1.0);
#endif
}
