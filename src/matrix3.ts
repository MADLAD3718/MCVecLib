import { Vec3, Vector3 } from "./vector3"

export interface Matrix3 {
    ux: number, vx: number, wx: number,
    uy: number, vy: number, wy: number,
    uz: number, vz: number, wz: number
}

export namespace Mat3 {
    /**
     * The identity matrix.
     * 
     * Value:
     * 
     * **[`1`, `0`, `0`]**
     * 
     * **[`0`, `1`, `0`]**
     * 
     * **[`0`, `0`, `1`]**
     */
    export const Identity: Matrix3 = {
        ux: 1, vx: 0, wx: 0,
        uy: 0, vy: 1, wy: 0,
        uz: 0, vz: 0, wz: 1
    }

    export function isMatrix3(m: any): m is Matrix3 {
        return 'ux' in m && 'uy' in m && 'uz' in m
            && 'vx' in m && 'vy' in m && 'vz' in m
            && 'wx' in m && 'wy' in m && 'wz' in m;
    }

    /**
     * Constructs a {@link Matrix3} from three column vectors.
     * @param u The first vector.
     * @param v The second vector.
     * @param w The third vector.
     */
    export function from(u: Vector3, v: Vector3, w: Vector3): Matrix3;
    export function from(u: Vector3, v: Vector3, w: Vector3): Matrix3 {
        return {
            ux: u.x, vx: v.x, wx: w.x,
            uy: u.y, vy: v.y, wy: w.y,
            uz: u.z, vz: v.z, wz: w.z
        };
    }

    /**
     * Returns the first column vector in a matrix.
     * @param m The specified matrix.
     */
    export function col1(m: Matrix3): Vector3 {
        return {
            x: m.ux,
            y: m.uy,
            z: m.uz
        };
    }

    /**
     * Returns the second column vector in a matrix.
     * @param m The specified matrix.
     */
    export function col2(m: Matrix3): Vector3 {
        return {
            x: m.vx,
            y: m.vy,
            z: m.vz
        };
    }

    /**
     * Returns the third column vector in a matrix.
     * @param m The specified matrix.
     */
    export function col3(m: Matrix3): Vector3 {
        return {
            x: m.wx,
            y: m.wy,
            z: m.wz
        };
    }

    /**
     * Returns the first row vector in a matrix.
     * @param m The specified matrix.
     */
    export function row1(m: Matrix3): Vector3 {
        return {
            x: m.ux,
            y: m.vx,
            z: m.wx
        };
    }

    /**
     * Returns the second row vector in a matrix.
     * @param m The specified matrix.
     */
    export function row2(m: Matrix3): Vector3 {
        return {
            x: m.uy,
            y: m.vy,
            z: m.wy
        };
    }

    /**
     * Returns the third row vector in a matrix.
     * @param m The specified matrix.
     */
    export function row3(m: Matrix3): Vector3 {
        return {
            x: m.uz,
            y: m.vz,
            z: m.wz
        };
    }

    /**
     * Transposes a matrix.
     * @param m The specified matrix.
     */
    export function transpose(m: Matrix3): Matrix3 {
        return {
            ux: m.ux, vx: m.uy, wx: m.uz,
            uy: m.vx, vy: m.vy, wy: m.vz,
            uz: m.wx, vz: m.wy, wz: m.wz
        };
    }

    /**
     * Multiplies a matrix by a scalar value.
     * @param m The specified matrix.
     * @param s The specified scalar.
     */
    export function mul(m: Matrix3, s: number): Matrix3;
    /**
     * Multiplies a vector by a matrix.
     * @param m The specified matrix.
     * @param v The specified vector.
     * @returns The result of the matrix/vector product between `m` and `v`.
     */
    export function mul(m: Matrix3, v: Vector3): Vector3;
    export function mul(m: Matrix3, t: Vector3 | number): Matrix3 | Vector3 {
        if (Vec3.isVector3(t)) return {
            x: Vec3.dot(row1(m), t),
            y: Vec3.dot(row2(m), t),
            z: Vec3.dot(row3(m), t)
        };
        else return {
            ux: m.ux * t, vx: m.vx * t, wx: m.wx * t,
            uy: m.uy * t, vy: m.vy * t, wy: m.wy * t,
            uz: m.uz * t, vz: m.vz * t, wz: m.wz * t
        };
    }

    /**
     * Returns the trace of a matrix.
     * @param m The specified matrix.
     */
    export function trace(m: Matrix3): number {
        return m.ux + m.vy + m.wz;
    }

    /**
     * Computes the determinant of a matrix.
     * @param m The specified matrix.
     */
    export function determinant(m: Matrix3): number {
        return m.ux * m.vy * m.wz + m.uy * m.vz * m.wx + m.uz * m.vx * m.wy
             - m.wx * m.vy * m.uz - m.wy * m.vz * m.ux - m.wz * m.vx * m.uy;
    }

    /**
     * Returns the cofactor matrix formed from a given matrix.
     * @param m The specified matrix.
     */
    export function cofactor(m: Matrix3): Matrix3 {
        return {
            ux: m.vy * m.wz - m.wy * m.vz,
            vx: m.wy * m.uz - m.uy * m.wz,
            wx: m.uy * m.vz - m.vy * m.uz,
            uy: m.wx * m.vz - m.vx * m.wz,
            vy: m.ux * m.wz - m.wx * m.uz,
            wy: m.vx * m.uz - m.ux * m.vz,
            uz: m.vx * m.wy - m.wx * m.vy,
            vz: m.wx * m.uy - m.ux * m.wy,
            wz: m.ux * m.vy - m.vx * m.uy
        };
    }
}
