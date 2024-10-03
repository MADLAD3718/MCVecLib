export interface Vector3 { x: number, y: number, z: number };

export class Vec3 {
    /**
     * Constructs a {@link Vector3} from the given values.
     * @param x The x value of the vector.
     * @param y The y value of the vector.
     * @param z The z value of the vector.
     */
    static from(x: number, y?: number, z?: number): Vector3 {
        return {
            x: x,
            y: y ?? x,
            z: z ?? x
        };
    }
}