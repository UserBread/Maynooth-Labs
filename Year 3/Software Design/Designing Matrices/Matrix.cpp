#include <iostream>
#include "Matrix.h"

//Constructors
/** Constructor that initialises a matrix of size m x n and sets every value to 0
 * Creates a matrix of size m * n and initialises all values to 0
 * @param m is the number of rows
 * @param n is the number of columns
 */
Matrix::Matrix(unsigned int m, unsigned int n) {
    //Assign the values of m and n to their datatypes in the class
    this->m = m;
    this->n = n;

    //Create a new pointer array of size m * n
    this->array = new int*[m * n];
    for (int i = 0; i < m * n; i++) {
        //Iterate through the initial 1D array and create an individual array for each of elements
        this->array[i] = new int[n];
    }
    //By doing this it results in the creation of a dynamic 2D array

    //Set all values in our array to 0
    for (int i = 0; i < m * n; i++) {
        for (int j = 0; j < n; j++) {
            this->array[i][j] = 0;
        }
    }
}
/** Constructor that copies every element from old matrix to a new matrix
 * Creates a matrix using dimensions and values from another matrix
 * @param matrix is another matrix
 */
Matrix::Matrix(const Matrix &matrix) {
    //Assign the values to their respective values in the matrix
    this->m = matrix.m;
    this->n = matrix.n;

    //Create the 2D array
    this->array = new int*[m * n];
    for (int i = 0; i < m * n; i++) {
        this->array[i] = new int[n];
    }

    //Copy values for our inputted matrix to a new matrix
    for (int i = 0; i < m * n; i++) {
        for (int j = 0; j < n; j++) {
            this->array[i][j] = matrix.array[i][j];
        }
    }
}
/** //Constructor that initialises a matrix using a 2D array
 * Creates a matrix of size m * n and stores the values of the 2D array
 * @param array is a 2D array
 * @param m is the number of rows
 * @param n is the number of columns
 */
Matrix::Matrix(int **array, unsigned int m, unsigned int n) {
    //Assign the values to their respective values in the matrix
    this->m = m;
    this->n = n;

    //Create the 2D array
    this->array = new int*[m * n];
    for (int i = 0; i < m * n; i++) {
        this->array[i] = new int[n];
    }

    //Give the array in our matrix the values stored in the 2D array inputted
    for (int i = 0; i < m * n; i++) {
        for (int j = 0; j < n; j++) {
            this->array[i][j] = array[i][j];
        }
    }
}

//Methods
/** Getting the number of rows
 * A method to get the number of rows in our matrix
 * @return m, the number of rows
 */
unsigned int Matrix::rows() const {
    return this->m; //Returns the value of m which represent the rows
}

/** Getting the number of columns
 * A method to get the number of columns in our matrix
 * @return n, the number of columns
 */
unsigned int Matrix::columns() const {
    return this->n; //Returns the value of n which represent the columns
}
/** Getting a value at a specific index
 * A method to get the value stored at a specific index in our matrix
 * @param i is the row number
 * @param j is the column number
 * @return the value stored at index i and j in our matrix
 */
int Matrix::get(unsigned int i, unsigned int j) const {
    return this->array[i][j];   //Return the value
}
/** Setting a new value at a specific index
 * A method to set a new value at a specific index in our matrix
 * @param i is the row number
 * @param j is the column number
 * @param value the value we want to set in our matrix at a specified location
 */
void Matrix::set(unsigned int i, unsigned int j, int value) {
    this->array[i][j] = value;
}

//Operations
/** Matrix addition
 * Adds the values of two matrices together
 * @param matrix is another matrix
 * @return a matrix consisting of values added from two matrices
 */
Matrix Matrix::operator+(const Matrix &matrix) {
    //Check if the dimensions are equal
    if (this->m != matrix.m || this->n != matrix.n) {
        std::cout << "Dimensions of the matrices do not match" << std::endl;
    }

    //Create a matrix to store the added matrices
    Matrix result(m, n);

    //Iterate through the matrices, add the values together and then store that value into the result matrix
    for (int i = 0; i < this->m; i++) {
        for (int j = 0; j < this->n; j++) {
            result.array[i][j] = this->array[i][j] + matrix.array[i][j];
        }
    }
    //Return the result
    return result;
}
/** Matrix subtraction
 * Subtracts the values of two matrices
 * @param matrix is another matrix
 * @return a matrix consisting of values subtracted from two matrices
 */
Matrix Matrix::operator-(const Matrix &matrix) {
    //Check if the dimensions are equal
    if (this->m != matrix.m || this->n != matrix.n) {
        std::cout << "Dimensions of the matrices do not match" << std::endl;
    }

    //Create a matrix to store the subtracted matrices
    Matrix result(m, n);

    //Iterate, subtract the values and store in result
    for (int i = 0; i < this->m; i++) {
        for (int j = 0; j < this->n; j++) {
            result.array[i][j] = this->array[i][j] - matrix.array[i][j];
        }
    }
    return result;
}
/** Matrix multiplication
 * Multiplies the values of two matrices
 * @param matrix is another matrix
 * @return a matrix consisting of values multiplied from two matrices
 */
Matrix Matrix::operator*(const Matrix &matrix) {
    if (this->m != matrix.m || this->n != matrix.n) {
        std::cout << "Dimensions of the matrices do not match" << std::endl;
    }
    Matrix result(m, n);

    //Iterate, multiply values and store in result
    for (int i = 0; i < this->m; i++) {
        for (int j = 0; j < this->n; j++) {
            this->array[i][j] = this->array[i][j] * matrix.array[i][j];
        }
    }
    return result;
}
/** Matrix transpose
 * Transposes a matrix
 * A transposed matrix is a matrix that has been flipped along its diagonal
 * @return a matrix that is the transpose of the original matrix
 */
Matrix Matrix::operator~() const {
    //Create a matrix with the opposite amount of rows and columns
    Matrix result(n, m);

    //Iterate and store the flipped matrix in our result
    for (int i = 0; i < this->m; i++) {
        for (int j = 0; j < this->n; j++) {
            result.array[i][j] = this->array[j][i];
        }
    }
    return result;
}
/** Matrix comparison
 * Check if two matrices are the same
 * Two matrices are the same if they both contain the same value at the same location
 * @param matrix is another matrix
 * @return true if both matrices are equal, false if they are not
 */
bool Matrix::operator==(const Matrix &matrix) {
    //Check if dimensions are equal
    if (this->m != matrix.m || this->n != matrix.n) {
        return false;
    }
    //Iterate, and check each value of the matrices to see if they're equal
    //If not we just return false
    for (int i = 0; i < this->m; i++) {
        for (int j = 0; j < this->n; j++) {
            if (this->array[i][j] != matrix.array[i][j]) {
                return false;
            }
        }
    }
    //If we manage to get through the iteration then the matrices must be equal
    return true;
}
/** Returning Matrix as a string
 * Stores all values of our matrix in a string
 * @return a string consisting of all values in our matrix
 */
std::string Matrix::toString() {
    //Create a string to store the result
    std::string result = "";

    //Iterate through the matrix and add the value to the string
    for (int i = 0; i < this->m; i++) {
        for (int j = 0; j < this->n; j++) {
            result += std::to_string(this->array[i][j]);
        }
    }

    //Return the string
    return result;
}