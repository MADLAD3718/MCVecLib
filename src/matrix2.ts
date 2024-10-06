import { Vector2 } from "@minecraft/server";
import { Vec2 } from "./vector2";

export interface Matrix2 {
    ux: number, vx: number,
    uy: number, vy: number
}

export namespace Mat2 {
    /**
     * The identity matrix.
     * 
     * Value:
     * 
     * **[`1`, `0`]**
     * 
     * **[`0`, `1`]**
     */
    export const Identity: Matrix2 = {
        ux: 1, vx: 0,
        uy: 0, vy: 1,
    }

    export function isMatrix2(m: any): m is Matrix2 {
        return typeof m === "object"
            && 'ux' in m && 'vx' in m
            && 'uy' in m && 'vy' in m;
    }

    /**
     * Constructs a {@link Matrix2} from an array of numbers.
     */
    export function from(m: number[]): Matrix2;
    /**
     * Constructs a {@link Matrix2} from two column vectors.
     * @param u The first vector.
     * @param v The second vector.
     */
    export function from(u: Vector2, v: Vector2): Matrix2;
    export function from(u: unknown, v?: Vector2): Matrix2 {
        if (Array.isArray(u) && u.length >= 4) return {
            ux: u[0], vx: u[1],
            uy: u[2], vy: u[3]
        };
        if (Vec2.isVector2(u) && v) return {
            ux: u.x, vx: v.x,
            uy: u.y, vy: v.y
        };
        throw new Error("Invalid input values for vector construction.");
    }

    /**
     * Returns the first column vector in a matrix.
     * @param m The specified matrix.
     */
    export function c1(m: Matrix2): Vector2 {
        return {
            x: m.ux,
            y: m.uy
        };
    }

    /**
     * Returns the second column vector in a matrix.
     * @param m The specified matrix.
     */
    export function c2(m: Matrix2): Vector2 {
        return {
            x: m.vx,
            y: m.vy
        };
    }

    /**
     * Returns the first row vector in a matrix.
     * @param m The specified matrix.
     */
    export function r1(m: Matrix2): Vector2 {
        return {
            x: m.ux,
            y: m.vx
        };
    }

    /**
     * Returns the second row vector in a matrix.
     * @param m The specified matrix.
     */
    export function r2(m: Matrix2): Vector2 {
        return {
            x: m.uy,
            y: m.vy
        };
    }

    /**
     * Multiplies a matrix by a scalar value.
     * @param m The specified matrix.
     * @param s The specified scalar.
     */
    export function mul(m: Matrix2, s: number): Matrix2;
    /**
     * Multiplies a vector by a matrix.
     * @param m The specified matrix.
     * @param v The specified vector.
     * @returns The result of the matrix/vector product between `m` and `v`.
     */
    export function mul(m: Matrix2, v: Vector2): Vector2;
    /**
     * Multiplies a matrix by another.
     * @param m The multiplier matrix.
     * @param n The multiplicand matrix.
     */
    export function mul(m: Matrix2, n: Matrix2): Matrix2;
    export function mul(m: Matrix2, t: Matrix2 | Vector2 | number): Matrix2 | Vector2 {
        if (isMatrix2(t)) return {
            ux: Vec2.dot(r1(m), c1(t)),
            vx: Vec2.dot(r1(m), c2(t)),
            uy: Vec2.dot(r2(m), c1(t)),
            vy: Vec2.dot(r2(m), c2(t)),
        };
        else if (Vec2.isVector2(t)) return {
            x: Vec2.dot(r1(m), t),
            y: Vec2.dot(r2(m), t)
        };
        else return {
            ux: m.ux * t, vx: m.vx * t,
            uy: m.uy * t, vy: m.vy * t
        };
    }

    /**
     * Returns the trace of a matrix.
     * @param m The specified matrix.
     */
    export function trace(m: Matrix2): number {
        return m.ux + m.vy;
    }

    /**
     * Computes the determinant of a matrix.
     * @param m The specified matrix.
     */
    export function determinant(m: Matrix2): number {
        return m.ux * m.vy - m.vx * m.uy;
    }
    
    /**
     * Transposes a matrix.
     * @param m The specified matrix.
     */
    export function transpose(m: Matrix2): Matrix2 {
        return {
            ux: m.ux, vx: m.uy,
            uy: m.vx, vy: m.vy
        };
    }

    /**
     * Returns the cofactor matrix formed from a given matrix.
     * @param m The specified matrix.
     */
    export function cofactor(m: Matrix2): Matrix2 {
        return {
            ux:  m.vy, vx: -m.uy,
            uy: -m.vx, vy:  m.ux
        };
    }

    /**
     * Returns the adjugate matrix formed from a given matrix.
     * @param m The specified matrix.
     */
    export function adjugate(m: Matrix2): Matrix2 {
        return {
            ux:  m.vy, vx: -m.vx,
            uy: -m.uy, vy:  m.ux
        };
    }

    /**
     * Computes the inverse of a given matrix.
     * @param m The specified matrix.
     * @throws Throws an error when the matrix is not invertible.
     */
    export function inverse(m: Matrix2): Matrix2 {
        const det = determinant(m);
        if (det === 0) throw new Error("Matrix is not invertible.");
        return mul(adjugate(m), 1 / det);
    }
}