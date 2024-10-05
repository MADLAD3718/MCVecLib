export interface Vector3 { x: number, y: number, z: number };

export class Vec3 {
    /**
     * Constructs a {@link Vector3} from the given value.
     * @param x The value to set each vector component to.
     */
    static from(x: number): Vector3;
    /**
     * Constructs a {@link Vector3} from the given values.
     * @param x The x value of the vector.
     * @param y The y value of the vector.
     * @param z The z value of the vector.
     */
    static from(x: number, y: number, z: number): Vector3;
    static from(x: number, y?: number, z?: number): Vector3 {
        return {
            x: x,
            y: y ?? x,
            z: z ?? x
        };
    }
}

export function speak(name: string): void {
    console.warn(name);
}