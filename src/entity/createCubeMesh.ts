import { BoxGeometry, Material, Mesh, MeshBasicMaterial, NearestFilter, SRGBColorSpace, Texture } from "three";
import { applyMinecraftShader } from "../viewport/applyMinecraftShading";
import { EntityTexture } from "./types";

export function createBlockMesh(et: EntityTexture): Mesh {
	const materials: Material[] = [];
	const textures: Texture[] = [et.east, et.west, et.up, et.down, et.south, et.north];
	for (const texture of textures) {
		texture.magFilter = NearestFilter;
		texture.minFilter = NearestFilter;
		texture.colorSpace = SRGBColorSpace;
		materials.push(applyMinecraftShader(new MeshBasicMaterial({
			map: texture
		})));
	}
	return new Mesh(new BoxGeometry(1, 1, 1), materials);
}
