import type { FMBEData, FMBEValue } from "./types";

export function getSituateCommand(fmbeData: FMBEData, selector: string): string {
	let molang: string = "";
	const pinn = (key: string, value: FMBEValue): void => {
		if (value !== null) {
			molang += `${key}=${value};`;
		}
	};
	pinn("v.xpos", fmbeData.position.x);
	pinn("v.ypos", fmbeData.position.y);
	pinn("v.zpos", fmbeData.position.z);
	pinn("v.xrot", fmbeData.rotation.x);
	pinn("v.yrot", fmbeData.rotation.y);
	pinn("v.zrot", fmbeData.rotation.z);
	pinn("v.xbasepos", fmbeData.basePosition.x);
	pinn("v.ybasepos", fmbeData.basePosition.y);
	pinn("v.zbasepos", fmbeData.basePosition.z);
	pinn("v.scale", fmbeData.scale);
	pinn("v.extend_scale", fmbeData.extend.scale);
	pinn("v.extend_xrot", fmbeData.extend.rotation.x);
	pinn("v.extend_yrot", fmbeData.extend.rotation.y);
	return [
		"playanimation",
		selector,
		"animation.player.attack.positions",
		"none",
		"0",
		molang,
		"setvariable_0"
	].join(" ");
}
