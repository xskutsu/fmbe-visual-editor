import { TextureLoader } from "three";
import { createBlockMesh } from "./entity/createCubeMesh";
import { entities, Entity } from "./entity/entities";
import { getCommand } from "./fmbe/getCommand";
import { camera, renderer, scene } from "./viewport/viewport";

document.body.appendChild(renderer.domElement);

export function animationFrame(): void {
	requestAnimationFrame(animationFrame);
	for (const entity of entities.values()) {
		entity.update();
	}
	renderer.render(scene, camera);
}

animationFrame();

const entity = new Entity(createBlockMesh({
	up: new TextureLoader().load("assets/texture/block/debug_up.png"),
	down: new TextureLoader().load("assets/texture/block/debug_down.png"),
	north: new TextureLoader().load("assets/texture/block/debug_north.png"),
	south: new TextureLoader().load("assets/texture/block/debug_south.png"),
	east: new TextureLoader().load("assets/texture/block/debug_east.png"),
	west: new TextureLoader().load("assets/texture/block/debug_west.png")
}), {
	position: {
		x: null,
		y: 1,
		z: null
	},
	basePosition: {
		x: null,
		y: null,
		z: null
	},
	rotation: {
		x: null,
		y: "math.sin(q.life_time * 70) * 90",
		z: null
	},
	scale: null,
	extend: {
		scale: null,
		rotation: {
			x: null,
			y: null
		}
	}
});

console.log(getCommand(entity.fmbe, "@e[type=fox"));

/*createItemMesh("assets/blocks/wood_sword.png").then(mesh => {
	const entity = new Entity(mesh, {
		position: {
			x: null,
			y: 0.5,
			z: null
		},
		basePosition: {
			x: null,
			y: null,
			z: null
		},
		rotation: {
			x: 90,
			y: null,
			z: null
		},
		scale: null,
		extend: {
			scale: null,
			rotation: {
				x: null,
				y: null
			}
		}
	});

	//console.log(getCommand(entity.fmbe, "@e[type=fox]"));
})*/
