import { Material, WebGLProgramParametersWithUniforms, WebGLRenderer } from "three";

type BeforeCompileCallback = (shader: WebGLProgramParametersWithUniforms, renderer: WebGLRenderer) => void;

const beforeCompileCallbacks: WeakMap<Material, BeforeCompileCallback> = new WeakMap<Material, BeforeCompileCallback>();
const appliedMaterials: WeakSet<Material> = new WeakSet<Material>();

const VERTEX_HEAD_TAG: string = '#include <common>';
const VERTEX_HEAD_REPLACE: string = `#include <common>
varying vec3 vMcWorldNormal;`;

const VERTEX_BODY_TAG: string = '#include <begin_vertex>';
const VERTEX_BODY_REPLACE: string = `#include <begin_vertex>
vMcWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);`;

const FRAG_HEAD_TAG: string = '#include <common>';
const FRAG_HEAD_REPLACE: string = `#include <common>
varying vec3 vMcWorldNormal;`;

const FRAG_BODY_TAG: string = '#include <dithering_fragment>';
const FRAG_BODY_REPLACE: string = `#include <dithering_fragment>
vec3 N = normalize(vMcWorldNormal);
float nx2 = N.x * N.x;
float ny2 = N.y * N.y;
float nz2 = N.z * N.z;
float yBrightness = (N.y > 0.0) ? 1.0 : 0.5;
float mcLightLevel = (nx2 * 0.6) + (nz2 * 0.8) + (ny2 * yBrightness);
gl_FragColor.rgb *= mcLightLevel;`;

export function applyMinecraftShader<T extends Material>(material: T): T {
	if (appliedMaterials.has(material)) {
		return material;
	}
	if (material.onBeforeCompile) {
		beforeCompileCallbacks.set(material, material.onBeforeCompile);
	}
	material.onBeforeCompile = (shader: WebGLProgramParametersWithUniforms, renderer: WebGLRenderer) => {
		const beforeCompileCallback: BeforeCompileCallback | undefined = beforeCompileCallbacks.get(material);
		if (beforeCompileCallback !== undefined) {
			beforeCompileCallback(shader, renderer);
		}
		shader.vertexShader = shader.vertexShader.replace(VERTEX_HEAD_TAG, VERTEX_HEAD_REPLACE);
		shader.vertexShader = shader.vertexShader.replace(VERTEX_BODY_TAG, VERTEX_BODY_REPLACE);
		shader.fragmentShader = shader.fragmentShader.replace(FRAG_HEAD_TAG, FRAG_HEAD_REPLACE);
		shader.fragmentShader = shader.fragmentShader.replace(FRAG_BODY_TAG, FRAG_BODY_REPLACE);
	};
	appliedMaterials.add(material);
	material.needsUpdate = true;
	return material;
}
