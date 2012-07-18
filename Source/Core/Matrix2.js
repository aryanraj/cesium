/*global define*/
define([
        './DeveloperError',
        './Cartesian2'
       ],
    function(
        DeveloperError,
        Cartesian2) {
    "use strict";

    /**
     * A 2x2 matrix, stored as a column-major order array.
     * @alias Matrix2
     * @constructor
     *
     * @param {Array} [values=(0.0, 0.0, 0.0, 0.0)] A column-major array that will represent this matrix.
     *
     * @exception {DeveloperError} values must be an array.
     *
     * @see Matrix2.fromComponents
     * @see Matrix2.fromRowMajorArray
     * @see Matrix3
     * @see Matrix4
     */
    var Matrix2 = function(values) {
        if (typeof values === 'undefined') {
            values = [0, 0, 0, 0];
        }
        else if (!Array.isArray(values)) {
            throw new DeveloperError('values must be an array');
        }

        /**
         * A column-major order array representing this matrix.
         * @type Array
         */
        this.values = values;
    };

    /**
     * Creates a Matrix2 instance from individual components.
     * Arguments are in column-major order.
     * @memberof Matrix2
     *
     * @param column0Row0 The value for column 0, row 0.
     * @param column1Row0 The value for column 1, row 0.
     * @param column0Row1 The value for column 0, row 1.
     * @param column1Row1 The value for column 1, row 1.
     * @param {Matrix2} [result] The object in which the result will be stored, if undefined a new instance will be created.
     * @returns The modified result parameter, or a new instance if none was provided.
     */
    Matrix2.fromComponents = function(column0Row0, column1Row0, column0Row1, column1Row1, result) {
        if (typeof result === 'undefined') {
            return new Matrix2([column0Row0, column1Row0,
                                column0Row1, column1Row1]);
        }
        result.values[0] = column0Row0;
        result.values[1] = column1Row0;
        result.values[2] = column0Row1;
        result.values[3] = column1Row1;
        return result;
    };

    /**
     * Creates a Matrix2 instance from a row-major order array.
     * The resulting matrix will be in column-major order.
     * @memberof Matrix2
     *
     * @param {Array} values The row-major order array.
     * @param {Matrix2} [result] The object in which the result will be stored, if undefined a new instance will be created.
     * @returns The modified result parameter, or a new Matrix2 instance if none was provided.
     *
     * @exception {DeveloperError} values must be an array.
     */
    Matrix2.fromRowMajorArray = function(values, result) {
        if (!Array.isArray(values)) {
            throw new DeveloperError('values must be an array');
        }

        if (typeof result === 'undefined') {
            return new Matrix2([values[0], values[2],
                                values[1], values[3]]);
        }
        result.values[0] = values[0];
        result.values[1] = values[2];
        result.values[2] = values[1];
        result.values[3] = values[3];
        return result;
    };

    /**
     * Duplicates a Matrix2 instance.
     * @memberof Matrix2
     *
     * @param {Matrix2} matrix The matrix to duplicate.
     * @param {Matrix2} [result] The object onto which to store the result.
     * @return {Matrix2} The modified result parameter or a new Matrix2 instance if none was provided.
     *
     * @exception {DeveloperError} matrix is required.
     */
    Matrix2.clone = function(matrix, result) {
        if (typeof matrix === 'undefined') {
            throw new DeveloperError('matrix is required');
        }
        if (typeof result === 'undefined') {
            return new Matrix2(matrix.values.slice(0));
        }
        var values = matrix.values;
        var resultValues = result.values;
        resultValues[0] = values[0];
        resultValues[1] = values[1];
        resultValues[2] = values[2];
        resultValues[3] = values[3];
        return result;
    };

    /**
     * Retrieves a copy of the matrix column at the provided index as a Cartesian2 instance.
     * @memberof Matrix2
     *
     * @param {Matrix2} matrix The matrix to use.
     * @param {Number} index The zero-based index of the column to retrieve.
     * @param {Cartesian2} [result] The object onto which to store the result.
     * @return {Cartesian2} The modified result parameter or a new Cartesian2 instance if none was provided.
     *
     * @exception {DeveloperError} matrix is required.
     * @exception {DeveloperError} index is required and must be 0 or 1.
     *
     * @see Cartesian2
     */
    Matrix2.getColumn = function(matrix, index, result) {
        if (typeof matrix === 'undefined') {
            throw new DeveloperError('matrix is required.');
        }

        if (typeof index !== 'number' || index < 0 || index > 1) {
            throw new DeveloperError('index is required and must be 0 or 1.');
        }

        var startIndex = index;
        var x = matrix.values[startIndex];
        var y = matrix.values[startIndex + 2];

        if (typeof result === 'undefined') {
            return new Cartesian2(x, y);
        }
        result.x = x;
        result.y = y;
        return result;
    };

    /**
     * Computes a new matrix that replaces the specified column in the provided matrix with the provided Cartesian2 instance.
     * @memberof Matrix2
     *
     * @param {Matrix2} matrix The matrix to use.
     * @param {Number} index The zero-based index of the column to set.
     * @param {Cartesian2} cartesian The Cartesian whose values will be assigned to the specified column.
     * @param {Cartesian2} [result] The object onto which to store the result.
     * @return {Matrix2} The modified result parameter or a new Matrix2 instance if none was provided.
     *
     * @exception {DeveloperError} matrix is required.
     * @exception {DeveloperError} cartesian is required.
     * @exception {DeveloperError} index is required and must be 0 or 1.
     *
     * @see Cartesian2
     */
    Matrix2.setColumn = function(matrix, index, cartesian, result) {
        if (typeof matrix === 'undefined') {
            throw new DeveloperError('matrix is required');
        }
        if (typeof cartesian === 'undefined') {
            throw new DeveloperError('cartesian is required');
        }
        if (typeof index !== 'number' || index < 0 || index > 1) {
            throw new DeveloperError('index is required and must be 0 or 1.');
        }
        result = Matrix2.clone(matrix, result);
        var startIndex = index;
        result.values[startIndex] = cartesian.x;
        result.values[startIndex + 2] = cartesian.y;
        return result;
    };

    /**
     * Retrieves a copy of the matrix row at the provided index as a Cartesian2 instance.
     * @memberof Matrix2
     *
     * @param {Matrix2} matrix The matrix to use.
     * @param {Number} index The zero-based index of the row to retrieve.
     * @param {Cartesian2} [result] The object onto which to store the result.
     * @return {Cartesian2} The modified result parameter or a new Cartesian2 instance if none was provided.
     *
     * @exception {DeveloperError} matrix is required.
     * @exception {DeveloperError} index is required and must be 0 or 1.
     *
     * @see Cartesian2
     */
    Matrix2.getRow = function(matrix, index, result) {
        if (typeof matrix === 'undefined') {
            throw new DeveloperError('matrix is required.');
        }

        if (typeof index !== 'number' || index < 0 || index > 1) {
            throw new DeveloperError('index is required and must be 0 or 1.');
        }

        var startIndex = index * 2;
        var x = matrix.values[startIndex];
        var y = matrix.values[startIndex + 1];

        if (typeof result === 'undefined') {
            return new Cartesian2(x, y);
        }
        result.x = x;
        result.y = y;
        return result;
    };

    /**
     * Computes a new matrix that replaces the specified row in the provided matrix with the provided Cartesian2 instance.
     * @memberof Matrix2
     *
     * @param {Matrix2} matrix The matrix to use.
     * @param {Number} index The zero-based index of the row to set.
     * @param {Cartesian2} cartesian The Cartesian whose values will be assigned to the specified row.
     * @param {Cartesian2} [result] The object onto which to store the result.
     * @return {Matrix2} The modified result parameter or a new Matrix2 instance if none was provided.
     *
     * @exception {DeveloperError} matrix is required.
     * @exception {DeveloperError} cartesian is required.
     * @exception {DeveloperError} index is required and must be 0 or 1.
     *
     * @see Cartesian2
     */
    Matrix2.setRow = function(matrix, index, cartesian, result) {
        if (typeof matrix === 'undefined') {
            throw new DeveloperError('matrix is required');
        }
        if (typeof cartesian === 'undefined') {
            throw new DeveloperError('cartesian is required');
        }
        if (typeof index !== 'number' || index < 0 || index > 1) {
            throw new DeveloperError('index is required and must be 0 or 1.');
        }

        var startIndex = index * 2;
        result = Matrix2.clone(matrix, result);
        result.values[startIndex] = cartesian.x;
        result.values[startIndex + 1] = cartesian.y;
        return result;
    };

    /**
     * Computes the product of two matrices.
     * @memberof Matrix2
     *
     * @param {Matrix2} left The first matrix.
     * @param {Matrix2} right The second matrix.
     * @param {Matrix2} [result] The object onto which to store the result.
     * @return {Matrix2} The modified result parameter or a new Matrix2 instance if none was provided.
     *
     * @exception {DeveloperError} left is required.
     * @exception {DeveloperError} right is required.
     */
    Matrix2.multiply = function(left, right, result) {
        if (typeof left === 'undefined') {
            throw new DeveloperError('left is required');
        }
        if (typeof right === 'undefined') {
            throw new DeveloperError('right is required');
        }

        var leftValues = left.values;
        var rightValues = right.values;
        var column0Row0 = leftValues[0] * rightValues[0] + leftValues[1] * rightValues[2];
        var column1Row0 = leftValues[0] * rightValues[1] + leftValues[1] * rightValues[3];
        var column0Row1 = leftValues[2] * rightValues[0] + leftValues[3] * rightValues[2];
        var column1Row1 = leftValues[2] * rightValues[1] + leftValues[3] * rightValues[3];

        if (typeof result === 'undefined') {
            return new Matrix2([column0Row0, column1Row0,
                                column0Row1, column1Row1]);
        }

        var resultValues = result.values;
        resultValues[0] = column0Row0;
        resultValues[1] = column1Row0;
        resultValues[2] = column0Row1;
        resultValues[3] = column1Row1;
        return result;
    };

    /**
     * Computes the product of a matrix and a column vector.
     * @memberof Matrix2
     *
     * @param {Matrix2} matrix The matrix.
     * @param {Cartesian2} cartesian The column.
     * @param {Matrix2} [result] The object onto which to store the result.
     * @return {Matrix2} The modified result parameter or a new Cartesian2 instance if none was provided.
     *
     * @exception {DeveloperError} matrix is required.
     * @exception {DeveloperError} cartesian is required.
     */
    Matrix2.multiplyByVector = function(matrix, cartesian, result) {
        if (typeof matrix === 'undefined') {
            throw new DeveloperError('matrix is required');
        }
        if (typeof cartesian === 'undefined') {
            throw new DeveloperError('cartesian is required');
        }

        var matrixValues = matrix.values;
        var x = matrixValues[0] * cartesian.x + matrixValues[1] * cartesian.y;
        var y = matrixValues[2] * cartesian.x + matrixValues[3] * cartesian.y;

        if (typeof result === 'undefined') {
            return new Cartesian2(x, y);
        }
        result.x = x;
        result.y = y;
        return result;
    };

    /**
     * Computes the product of a matrix and a scalar.
     * @memberof Matrix2
     *
     * @param {Matrix2} matrix The matrix.
     * @param {Number} scalar The number to multiply by.
     * @param {Matrix2} [result] The object onto which to store the result.
     * @return {Matrix2} The modified result parameter or a new Cartesian2 instance if none was provided.
     *
     * @exception {DeveloperError} matrix is required.
     * @exception {DeveloperError} scalar is required and must be a number.
     */
    Matrix2.multiplyByScalar = function(matrix, scalar, result) {
        if (typeof matrix === 'undefined') {
            throw new DeveloperError('matrix is required');
        }
        if (typeof scalar !== 'number') {
            throw new DeveloperError('scalar is required and must be a number');
        }

        var matrixValues = matrix.values;
        if (typeof result === 'undefined') {
            return new Matrix2([matrixValues[0] * scalar, matrixValues[1] * scalar,
                                matrixValues[2] * scalar, matrixValues[3] * scalar]);
        }
        var resultValues = result.values;
        resultValues[0] = matrixValues[0] * scalar;
        resultValues[1] = matrixValues[1] * scalar;
        resultValues[2] = matrixValues[2] * scalar;
        resultValues[3] = matrixValues[3] * scalar;
        return result;
    };

    /**
     * Creates a negated copy of the provided matrix.
     * @memberof Matrix2
     *
     * @param {Matrix2} matrix The matrix to negate.
     * @param {Matrix2} [result] The object onto which to store the result.
     * @return {Matrix2} The modified result parameter or a new Matrix2 instance if none was provided.
     *
     * @exception {DeveloperError} matrix is required.
     */
    Matrix2.negate = function(matrix, result) {
        if (typeof matrix === 'undefined') {
            throw new DeveloperError('matrix is required');
        }

        var matrixValues = matrix.values;
        if (typeof result === 'undefined') {
            return new Matrix2([-matrixValues[0], -matrixValues[1],
                                -matrixValues[2], -matrixValues[3]]);
        }
        var resultValues = result.values;
        resultValues[0] = -matrixValues[0];
        resultValues[1] = -matrixValues[1];
        resultValues[2] = -matrixValues[2];
        resultValues[3] = -matrixValues[3];
        return result;
    };

    /**
     * Computes the transpose of the provided matrix.
     * @memberof Matrix2
     *
     * @param {Matrix2} matrix The matrix to transpose.
     * @param {Matrix2} [result] The object onto which to store the result.
     * @return {Matrix2} The modified result parameter or a new Matrix2 instance if none was provided.
     *
     * @exception {DeveloperError} matrix is required.
     */
    Matrix2.transpose = function(matrix, result) {
        if (typeof matrix === 'undefined') {
            throw new DeveloperError('matrix is required');
        }

        var matrixValues = matrix.values;
        var column0Row0 = matrixValues[0];
        var column1Row0 = matrixValues[2];
        var column0Row1 = matrixValues[1];
        var column1Row1 = matrixValues[3];
        if (typeof result === 'undefined') {
            return new Matrix2([column0Row0, column1Row0,
                                column0Row1, column1Row1]);
        }
        var resultValues = result.values;
        resultValues[0] = column0Row0;
        resultValues[1] = column1Row0;
        resultValues[2] = column0Row1;
        resultValues[3] = column1Row1;
        return result;
    };

    /**
     * Compares the provided matrices componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     * @memberof Matrix2
     *
     * @param {Matrix2} [left] The first matrix.
     * @param {Matrix2} [right] The second matrix.
     * @return {Boolean} <code>true</code> if left and right are equal, <code>false</code> otherwise.
     */
    Matrix2.equals = function(left, right) {
        if (left === right) {
            return true;
        }
        if (typeof left === 'undefined' ||
            typeof right === 'undefined') {
            return false;
        }
        var leftValues = left.values;
        var rightValues = right.values;
        return leftValues[0] === rightValues[0] &&
               leftValues[1] === rightValues[1] &&
               leftValues[2] === rightValues[2] &&
               leftValues[3] === rightValues[3];
    };

    /**
     * Compares the provided matrices componentwise and returns
     * <code>true</code> if they are within the provided epsilon,
     * <code>false</code> otherwise.
     * @memberof Matrix2
     *
     * @param {Matrix2} [left] The first matrix.
     * @param {Matrix2} [right] The second matrix.
     * @param {Number} epsilon The epsilon to use for equality testing.
     * @return {Boolean} <code>true</code> if left and right are within the provided epsilon, <code>false</code> otherwise.
     *
     * @exception {DeveloperError} epsilon is required and must be a number.
     */
    Matrix2.equalsEpsilon = function(left, right, epsilon) {
        if (typeof epsilon !== 'number') {
            throw new DeveloperError('epsilon is required and must be a number');
        }
        if (left === right) {
            return true;
        }
        if (typeof left === 'undefined' ||
            typeof right === 'undefined') {
            return false;
        }
        var leftValues = left.values;
        var rightValues = right.values;
        return Math.abs(leftValues[0] - rightValues[0]) <= epsilon &&
               Math.abs(leftValues[1] - rightValues[1]) <= epsilon &&
               Math.abs(leftValues[2] - rightValues[2]) <= epsilon &&
               Math.abs(leftValues[3] - rightValues[3]) <= epsilon;
    };

    /**
     * Creates a string representing the provided Matrix with each row being on a separate line and in the format '(column0, column1)'.
     * @memberof Matrix2
     *
     * @param {Matrix2} matrix The matrix to stringify.
     * @return {String} A string representing the provided Matrix with each row being on a separate line and in the format '(column0, column1)'.
     *
     * @exception {DeveloperError} matrix is required.
     */
    Matrix2.toString = function(matrix) {
        if (typeof matrix === 'undefined') {
            throw new DeveloperError('matrix is required');
        }
        return '(' + matrix.values[0] + ', ' + matrix.values[1] + ')\n' +
               '(' + matrix.values[2] + ', ' + matrix.values[3] + ')';
    };

    /**
     * An immutable Matrix2 instance initialized to the identity matrix.
     * @memberof Matrix2
     */
    Matrix2.IDENTITY = Object.freeze(Matrix2.fromComponents(1.0, 0.0, 0.0, 1.0));

    /**
     * Duplicates the provided Matrix2 instance.
     * @memberof Matrix2
     *
     * @param {Matrix2} [result] The object onto which to store the result.
     * @return {Matrix2} The modified result parameter or a new Matrix2 instance if none was provided.
     */
    Matrix2.prototype.clone = function(result) {
        return Matrix2.clone(this, result);
    };

    /**
     * Retrieves a copy of the matrix column at the provided index as a Cartesian2 instance.
     * @memberof Matrix2
     *
     * @param {Number} index The zero-based index of the column to retrieve.
     * @param {Cartesian2} [result] The object onto which to store the result.
     * @return {Cartesian2} The modified result parameter or a new Cartesian2 instance if none was provided.
     *
     * @exception {DeveloperError} index is required and must be 0 or 1.
     *
     * @see Cartesian2
     */
    Matrix2.prototype.getColumn = function(index, result) {
        return Matrix2.getColumn(this, index, result);
    };

    /**
     * Computes a new matrix that replaces the specified column in this matrix with the provided Cartesian2 instance.
     * @memberof Matrix2
     *
     * @param {Number} index The zero-based index of the column to set.
     * @param {Cartesian2} cartesian The Cartesian whose values will be assigned to the specified column.
     *
     * @exception {DeveloperError} cartesian is required.
     * @exception {DeveloperError} index is required and must be 0 or 1.
     *
     * @see Cartesian2
     */
    Matrix2.prototype.setColumn = function(index, cartesian, result) {
        return Matrix2.setColumn(this, index, cartesian, result);
    };

    /**
     * Retrieves a copy of the matrix row at the provided index as a Cartesian2 instance.
     * @memberof Matrix2
     *
     * @param {Number} index The zero-based index of the row to retrieve.
     * @param {Cartesian2} [result] The object onto which to store the result.
     * @return {Cartesian2} The modified result parameter or a new Cartesian2 instance if none was provided.
     *
     * @exception {DeveloperError} index is required and must be 0 or 1.
     *
     * @see Cartesian2
     */
    Matrix2.prototype.getRow = function(index, result) {
        return Matrix2.getRow(this, index, result);
    };

    /**
     * Computes a new matrix that replaces the specified row in this matrix with the provided Cartesian2 instance.
     * @memberof Matrix2
     *
     * @param {Number} index The zero-based index of the row to set.
     * @param {Cartesian2} cartesian The Cartesian whose values will be assigned to the specified row.
     *
     * @exception {DeveloperError} cartesian is required.
     * @exception {DeveloperError} index is required and must be 0 or 1.
     *
     * @see Cartesian2
     */
    Matrix2.prototype.setRow = function(index, cartesian, result) {
        return Matrix2.setRow(this, index, cartesian, result);
    };

    /**
     * Computes the product of this matrix and the provided matrix.
     * @memberof Matrix2
     *
     * @param {Matrix2} right The right hand side matrix.
     * @param {Matrix2} [result] The object onto which to store the result.
     * @return {Matrix2} The modified result parameter or a new Matrix2 instance if none was provided.
     *
     * @exception {DeveloperError} right is required.
     */
    Matrix2.prototype.multiply = function(right, result) {
        return Matrix2.multiply(this, right, result);
    };

    /**
     * Computes the product of this matrix and a column vector.
     * @memberof Matrix2
     *
     * @param {Cartesian2} cartesian The column.
     * @param {Matrix2} [result] The object onto which to store the result.
     * @return {Matrix2} The modified result parameter or a new Cartesian2 instance if none was provided.
     *
     * @exception {DeveloperError} cartesian is required.
     */
    Matrix2.prototype.multiplyByVector = function(cartesian, result) {
        return Matrix2.multiplyByVector(this, cartesian, result);
    };

    /**
     * Computes the product of this matrix and a scalar.
     * @memberof Matrix2
     *
     * @param {Number} scalar The number to multiply by.
     * @param {Matrix2} [result] The object onto which to store the result.
     * @return {Matrix2} The modified result parameter or a new Cartesian2 instance if none was provided.
     *
     * @exception {DeveloperError} scalar is required and must be a number.
     */
    Matrix2.prototype.multiplyByScalar = function(scalar, result) {
        return Matrix2.multiplyByScalar(this, scalar, result);
    };
    /**
     * Creates a negated copy of this matrix.
     * @memberof Matrix2
     *
     * @param {Matrix2} matrix The matrix to negate.
     * @param {Matrix2} [result] The object onto which to store the result.
     * @return {Matrix2} The modified result parameter or a new Matrix2 instance if none was provided.
     *
     * @exception {DeveloperError} matrix is required.
     */
    Matrix2.prototype.negate = function(result) {
        return Matrix2.negate(this, result);
    };

    /**
     * Computes the transpose of this matrix.
     * @memberof Matrix2
     *
     * @param {Matrix2} [result] The object onto which to store the result.
     * @return {Matrix2} The modified result parameter or a new Matrix2 instance if none was provided.
     */
    Matrix2.prototype.transpose = function(result) {
        return Matrix2.transpose(this, result);
    };

    /**
     * Compares this matrix to the provided matrix componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     * @memberof Matrix2
     *
     * @param {Matrix2} [right] The right hand side matrix.
     * @return {Boolean} <code>true</code> if they are equal, <code>false</code> otherwise.
     */
    Matrix2.prototype.equals = function(right) {
        return Matrix2.equals(this, right);
    };

    /**
     * Compares this matrix to the provided matrix componentwise and returns
     * <code>true</code> if they are within the provided epsilon,
     * <code>false</code> otherwise.
     * @memberof Matrix2
     *
     * @param {Matrix2} [right] The right hand side matrix.
     * @param {Number} epsilon The epsilon to use for equality testing.
     * @return {Boolean} <code>true</code> if they are within the provided epsilon, <code>false</code> otherwise.
     *
     * @exception {DeveloperError} epsilon is required and must be a number.
     */
    Matrix2.prototype.equalsEpsilon = function(right, epsilon) {
        return Matrix2.equalsEpsilon(this, right, epsilon);
    };

    /**
     * Creates a string representing this Matrix with each row being
     * on a separate line and in the format '(column1, column2)'.
     * @memberof Matrix2
     *
     * @return {String} A string representing the provided Matrix with each row being on a separate line and in the format '(column1, column2)'.
     */
    Matrix2.prototype.toString = function() {
        return Matrix2.toString(this);
    };

    return Matrix2;
});
