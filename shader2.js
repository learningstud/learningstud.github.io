const glsl = String.raw;
const src = (head, main) => `#version 300 es
${head} void main() {${main}}`;

export const shaders = {
	flat: {
vert: src(glsl`
	const vec3 light1 = vec3(30, 20, -25);
	const vec3 light2 = vec3(30, -20, -25);
	const vec3 light3 = vec3(-30, -20, -25);
	const vec3 lightColor = vec3(1.0, 1.0, 1.0);

	in vec3 model3;
	in vec3 normal3;

	uniform vec3 color3;
	uniform mat4 World4;
	uniform mat4 Perspective4;

	flat out vec4 color4;
`, glsl`
	vec4 world4 = World4 * vec4(model3, 1.0);
	gl_Position = Perspective4 * world4;
	vec3 world3 = vec3(world4);

	vec3 N = normalize(mat3(World4) * normal3);
	vec3 V = normalize(-world3);

	vec3 ambient = lightColor * 0.1 * color3;
	vec3 diffuse = vec3(0.0);
	vec3 specular = vec3(0.0);

	{
		vec3 L = normalize(light1 - world3);
		float cosTheta = dot(L, N);
		diffuse += lightColor * 0.5 * color3 * max(cosTheta, 0.0);

		float coef = 0.0;
		if (cosTheta > 0.0) {
			float cosPhi = dot(normalize(V + L), N);
			coef = pow(max(cosPhi, 0.0), 16.0);
		}
		specular += lightColor * 0.6 * coef;
	}
	{
		vec3 L = normalize(light2 - world3);
		float cosTheta = dot(L, N);
		diffuse += lightColor * 0.25 * color3 * max(cosTheta, 0.0);

		float coef = 0.0;
		if (cosTheta > 0.0) {
			float cosPhi = dot(normalize(V + L), N);
			coef = pow(max(cosPhi, 0.0), 16.0);
		}
		specular += lightColor * 0.3 * coef;
	}
	{
		vec3 L = normalize(light3 - world3);
		float cosTheta = dot(L, N);
		diffuse += lightColor * 0.125 * color3 * max(cosTheta, 0.0);

		float coef = 0.0;
		if (cosTheta > 0.0) {
			float cosPhi = dot(normalize(V + L), N);
			coef = pow(max(cosPhi, 0.0), 16.0);
		}
		specular += lightColor * 0.2 * coef;
	}

	color4 = vec4(ambient + diffuse + specular, 1.0);
`),
frag: src(glsl`
	precision mediump float;
	flat in vec4 color4;
	out vec4 frag_color;
`, glsl`
	frag_color = color4;
`),
	},

	Gouraud: {
vert: src(glsl`
	const vec3 light1 = vec3(30, 20, -25);
	const vec3 light2 = vec3(30, -20, -25);
	const vec3 light3 = vec3(-30, -20, -25);
	const vec3 lightColor = vec3(1.0, 1.0, 1.0);

	in vec3 model3;
	in vec3 normal3;

	uniform vec3 color3;
	uniform mat4 World4;
	uniform mat4 Perspective4;

	out vec4 color4;
`, glsl`
	vec4 world4 = World4 * vec4(model3, 1.0);
	gl_Position = Perspective4 * world4;
	vec3 world3 = vec3(world4);

	vec3 N = normalize(mat3(World4) * normal3);
	vec3 V = normalize(-world3);

	vec3 ambient = lightColor * 0.1 * color3;
	vec3 diffuse = vec3(0.0);
	vec3 specular = vec3(0.0);

	{
		vec3 L = normalize(light1 - world3);
		float cosTheta = dot(L, N);
		diffuse += lightColor * 0.5 * color3 * max(cosTheta, 0.0);

		float coef = 0.0;
		if (cosTheta > 0.0) {
			float cosPhi = dot(normalize(V + L), N);
			coef = pow(max(cosPhi, 0.0), 16.0);
		}
		specular += lightColor * 0.6 * coef;
	}
	{
		vec3 L = normalize(light2 - world3);
		float cosTheta = dot(L, N);
		diffuse += lightColor * 0.25 * color3 * max(cosTheta, 0.0);

		float coef = 0.0;
		if (cosTheta > 0.0) {
			float cosPhi = dot(normalize(V + L), N);
			coef = pow(max(cosPhi, 0.0), 16.0);
		}
		specular += lightColor * 0.3 * coef;
	}
	{
		vec3 L = normalize(light3 - world3);
		float cosTheta = dot(L, N);
		diffuse += lightColor * 0.125 * color3 * max(cosTheta, 0.0);

		float coef = 0.0;
		if (cosTheta > 0.0) {
			float cosPhi = dot(normalize(V + L), N);
			coef = pow(max(cosPhi, 0.0), 16.0);
		}
		specular += lightColor * 0.2 * coef;
	}

	color4 = vec4(ambient + diffuse + specular, 1.0);
`),
frag: src(glsl`
	precision mediump float;
	in vec4 color4;
	out vec4 frag_color;
`, glsl`
	frag_color = color4;
`),
	},
	
	Phong: {
vert: src(glsl`
	in vec3 model3;
	in vec3 normal3;

	uniform mat4 World4;
	uniform mat4 Perspective4;

	out vec3 world3;
	out vec3 n3;
`, glsl`
	vec4 world4 = World4 * vec4(model3, 1.0);
	gl_Position = Perspective4 * world4;
	world3 = vec3(world4) / world4.w;
	n3 = mat3(World4) * normal3;
`),
frag: src(glsl`
	precision mediump float;
	const vec3 light1 = vec3(30, 20, -25);
	const vec3 light2 = vec3(30, -20, -25);
	const vec3 light3 = vec3(-30, -20, -25);
	const vec3 lightColor = vec3(1.0, 1.0, 1.0);
	uniform vec3 color3;

	in vec3 world3;
	in vec3 n3;
	out vec4 frag_color;
`, glsl`
	vec3 N = normalize(n3);
	vec3 V = normalize(-world3);

	vec3 ambient = lightColor * 0.1 * color3;
	vec3 diffuse = vec3(0.0);
	vec3 specular = vec3(0.0);

	{
		vec3 L = normalize(light1 - world3);
		float cosTheta = dot(L, N);
		diffuse += lightColor * 0.5 * color3 * max(cosTheta, 0.0);

		float coef = 0.0;
		if (cosTheta > 0.0) {
			float cosPhi = dot(reflect(-L, N), V);
			coef = pow(max(cosPhi, 0.0), 16.0);
		}
		specular += lightColor * 0.6 * coef;
	}
	{
		vec3 L = normalize(light2 - world3);
		float cosTheta = dot(L, N);
		diffuse += lightColor * 0.25 * color3 * max(cosTheta, 0.0);

		float coef = 0.0;
		if (cosTheta > 0.0) {
			float cosPhi = dot(reflect(-L, N), V);
			coef = pow(max(cosPhi, 0.0), 16.0);
		}
		specular += lightColor * 0.3 * coef;
	}
	{
		vec3 L = normalize(light3 - world3);
		float cosTheta = dot(L, N);
		diffuse += lightColor * 0.125 * color3 * max(cosTheta, 0.0);

		float coef = 0.0;
		if (cosTheta > 0.0) {
			float cosPhi = dot(reflect(-L, N), V);
			coef = pow(max(cosPhi, 0.0), 16.0);
		}
		specular += lightColor * 0.2 * coef;
	}

	frag_color = vec4(ambient + diffuse + specular, 1.0);
`),
	},
};

function createShader(gl, type, src) {
	const shader = gl.createShader(type);
	gl.shaderSource(shader, src);
	gl.compileShader(shader);

	if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		return shader;
	}
	console.log(gl.getShaderInfoLog(shader));
	gl.deleteShader(shader);
}

export function createProgram(gl, shader) {
	const prog = gl.createProgram();
	gl.attachShader(prog, createShader(gl, gl.VERTEX_SHADER, shader.vert));
	gl.attachShader(prog, createShader(gl, gl.FRAGMENT_SHADER, shader.frag));
	gl.linkProgram(prog);

	if (gl.getProgramParameter(prog, gl.LINK_STATUS)) {
		return prog;
	}
	console.log(gl.getShaderInfoLog(prog));
	gl.deleteProgram(prog);
}