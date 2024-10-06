import { Vector3 } from "@minecraft/server";
import { Vec3 } from "./vector3"

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
        return typeof m === "object"
            && 'ux' in m && 'vx' in m && 'wx' in m
            && 'uy' in m && 'vy' in m && 'wy' in m
            && 'uz' in m && 'vz' in m && 'wz' in m;
    }

    /**
     * Constructs a {@link Matrix3} from an array of numbers.
     */
    export function from(m: number[]): Matrix3;
    /**
     * Constructs a {@link Matrix3} from three column vectors.
     * @param u The first vector.
     * @param v The second vector.
     * @param w The third vector.
     */
    export function from(u: Vector3, v: Vector3, w: Vector3): Matrix3;
    export function from(u: unknown, v?: Vector3, w?: Vector3): Matrix3 {
        if (Array.isArray(u) && u.length >= 9) return {
            ux: u[0], vx: u[1], wx: u[2],
            uy: u[3], vy: u[4], wy: u[5],
            uz: u[6], vz: u[7], wz: u[8]
        };
        if (Vec3.isVector3(u) && v && w) return {
            ux: u.x, vx: v.x, wx: w.x,
            uy: u.y, vy: v.y, wy: w.y,
            uz: u.z, vz: v.z, wz: w.z
        };
        throw new Error("Invalid input values for vector construction.");
    }

    /**
     * Returns the first column vector in a matrix.
     * @param m The specified matrix.
     */
    export function c1(m: Matrix3): Vector3 {
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
    export function c2(m: Matrix3): Vector3 {
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
    export function c3(m: Matrix3): Vector3 {
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
    export function r1(m: Matrix3): Vector3 {
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
    export function r2(m: Matrix3): Vector3 {
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
    export function r3(m: Matrix3): Vector3 {
        return {
            x: m.uz,
            y: m.vz,
            z: m.wz
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
    /**
     * Multiplies a matrix by another.
     * @param m The multiplier matrix.
     * @param n The multiplicand matrix.
     */
    export function mul(m: Matrix3, n: Matrix3): Matrix3;
    export function mul(m: Matrix3, t: Matrix3 | Vector3 | number): Matrix3 | Vector3 {
        if (isMatrix3(t)) return {
            ux: Vec3.dot(r1(m), c1(t)),
            vx: Vec3.dot(r1(m), c2(t)),
            wx: Vec3.dot(r1(m), c3(t)),
            uy: Vec3.dot(r2(m), c1(t)),
            vy: Vec3.dot(r2(m), c2(t)),
            wy: Vec3.dot(r2(m), c3(t)),
            uz: Vec3.dot(r3(m), c1(t)),
            vz: Vec3.dot(r3(m), c2(t)),
            wz: Vec3.dot(r3(m), c3(t))
        };
        else if (Vec3.isVector3(t)) return {
            x: Vec3.dot(r1(m), t),
            y: Vec3.dot(r2(m), t),
            z: Vec3.dot(r3(m), t)
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

    /**
     * Returns the adjugate matrix formed from a given matrix.
     * @param m The specified matrix.
     */
    export function adjugate(m: Matrix3): Matrix3 {
        return {
            ux: m.vy * m.wz - m.wy * m.vz,
            vx: m.wx * m.vz - m.vx * m.wz,
            wx: m.vx * m.wy - m.wx * m.vy,
            uy: m.wy * m.uz - m.uy * m.wz,
            vy: m.ux * m.wz - m.wx * m.uz,
            wy: m.wx * m.uy - m.ux * m.wy,
            uz: m.uy * m.vz - m.vy * m.uz,
            vz: m.vx * m.uz - m.ux * m.vz,
            wz: m.ux * m.vy - m.vx * m.uy
        };
    }

    /**
     * Computes the inverse of a given matrix.
     * @param m The specified matrix.
     * @throws Throws an error when the matrix is not invertible.
     */
    export function inverse(m: Matrix3): Matrix3 {
        const det = determinant(m);
        if (det === 0) throw new Error("Matrix is not invertible.");
        return mul(adjugate(m), 1 / det);
    }

    /**
     * Constructs a TNB Matrix around a given normal vector.
     * @param n The specified normal vector.
     * @returns A Tangent-Normal-Binormal Matrix based on the specified vector.
     */
    export function buildTNB(n: Vector3): Matrix3 {
        const u = Math.abs(n.y) === 1 ?
            Vec3.West : Vec3.normalize(Vec3.from(n.z, 0, -n.x));
        const w = Vec3.cross(n, u);
        return from(u, n, w);
    }
}
