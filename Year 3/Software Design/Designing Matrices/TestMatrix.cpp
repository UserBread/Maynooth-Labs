#include <iostream>
#include "Matrix.h"

void Test_Case_1_Rows(const Matrix *test) {
    const int expectedRows = 3;
    (test->rows() == expectedRows) ? std::cout << "Test 1 passed" << std::endl : std::cout << "Test 1 failed" << std::endl;
}
void Test_Case_2_Rows(const Matrix *test) {
    const int expectedRows = 4;
    (test->rows() == expectedRows) ? std::cout << "Test 2 passed" << std::endl : std::cout << "Test 2 failed" << std::endl;
}
void Test_Case_1_Columns(const Matrix *test) {
    const int expectedColumns = 3;
    (test->columns() == expectedColumns) ? std::cout << "Test 1 passed" << std::endl : std::cout << "Test 1 failed" << std::endl;
}
void Test_Case_2_Columns(const Matrix *test) {
    const int expectedColumns = 5;
    (test->columns() == expectedColumns) ? std::cout << "Test 2 passed" << std::endl : std::cout << "Test 2 failed" << std::endl;
}
void Test_Case_1_Get(const Matrix *test) {
    const int expectedValue = 0;
    const int i = 0, j = 1;
    (test->get(i, j) == expectedValue) ? std::cout << "Test 1 passed" << std::endl : std::cout << "Test 1 failed" << std::endl;
}
void Test_Case_1_Set(Matrix *test) {
    const int i = 0, j = 1;
    int value = 1;
    test->set(i, j, value);
}
void Test_Case_2_Get(Matrix *test) {
    const int expectedValue = 1;
    const int i = 0, j = 1;
    (test->get(i, j) == expectedValue) ? std::cout << "Test 2 passed" << std::endl : std::cout << "Test 2 failed" << std::endl;
}
void Test_Case_3_Get(Matrix *test) {
    const int expectedValue = 0;
    const int i = 0, j = 1;
    (test->get(i, j) == expectedValue) ? std::cout << "Test 3 passed" << std::endl : std::cout << "Test 3 failed" << std::endl;
}
void Test_Case_Plus(Matrix *test, const Matrix *test2) {
    Matrix expectedMatrix = *test;
    (test->operator+(*test2) == expectedMatrix) ? std::cout << "Test passed" << std::endl : std::cout << "Test failed" << std::endl;
}
void Test_Case_Minus(Matrix *test, const Matrix *test2) {
    Matrix expectedMatrix = *test;
    (test->operator-(*test2) == expectedMatrix) ? std::cout << "Test passed" << std::endl : std::cout << "Test failed" << std::endl;
}
void Test_Case_Multiplication(Matrix *test, const Matrix *test2) {
    Matrix expectedMatrix = *test;
    (test->operator*(*test2) == expectedMatrix) ? std::cout << "Test passed" << std::endl : std::cout << "Test failed" << std::endl;
}
void Test_Case_Transpose(Matrix *test) {
    Matrix expectedMatrix = *test;
    (test->operator~() == expectedMatrix) ? std::cout << "Test passed" << std::endl : std::cout << "Test failed" << std::endl;
}
void Test_Case_ToString_1(Matrix *test) {
   std::string expectedString = "010000000";
    (test->toString() == expectedString) ? std::cout << "Test 1 passed" << std::endl : std::cout << "Test 1 failed" << std::endl;
}
void Test_Case_ToString_2(Matrix *test) {
    std::string expectedString = "111111111";
    (test->toString() == expectedString) ? std::cout << "Test 2 passed" << std::endl : std::cout << "Test 2 failed" << std::endl;
}
void Test_Case_ToString_3(Matrix *test) {
    std::string expectedString = "123456789";
    (test->toString() == expectedString) ? std::cout << "Test 3 passed" << std::endl : std::cout << "Test 3 failed" << std::endl;
}
int main() {
    //Create an empty matrix using the first constructor
    Matrix *test1 = new Matrix(3, 3);
    //Using second
    Matrix *test2 = new Matrix(*test1);

    //Using third
    int** array = new int*[3*3];
    for (int i = 0; i < 9; i++) {
        array[i] = new int[3];
    }
    array[0][0] = 1;
    array[0][1] = 2;
    array[0][2] = 3;
    array[1][0] = 4;
    array[1][1] = 5;
    array[1][2] = 6;
    array[2][0] = 7;
    array[2][1] = 8;
    array[2][2] = 9;
    Matrix *test3 = new Matrix(array, 3, 3);

    std::cout << "Testing rows() method: " << std::endl;
    Test_Case_1_Rows(test1); //Should Pass
    Test_Case_2_Rows(test2); //Should Fail

    std::cout << "\nTesting columns() method: " << std::endl;
    Test_Case_1_Columns(test1); //Should Pass
    Test_Case_2_Columns(test2); //Should Fail

    std::cout << "\nTesting get() and set() method: " << std::endl;
    Test_Case_1_Get(test1); //Should Pass
    Test_Case_1_Set(test1); //Is combined with the next method
    Test_Case_2_Get(test1); //Should Pass
    Test_Case_3_Get(test1); //Should Fail

    std::cout << "\nTesting toString() method: " << std::endl;
    Test_Case_ToString_1(test1); //Should Pass
    Test_Case_ToString_2(test2); //Should Fail
    Test_Case_ToString_3(test3); //Should Pass

    std::cout << "\nTesting plus() method: " << std::endl;
    Test_Case_Plus(test1, test2); //Should Pass
    Test_Case_Plus(test3, test1); //Should Fail

    std::cout << "\nTesting subtraction() method: " << std::endl;
    Test_Case_Minus(test1, test2); //Should Pass
    Test_Case_Minus(test3, test1); //Should Fail

    std::cout << "\nTesting multiplication() method: " << std::endl;
    Test_Case_Multiplication(test2, test1); //Should Pass
    Test_Case_Multiplication(test3, test1); //Should Fail

    std::cout << "\nTesting transpose() method: " << std::endl;
    Test_Case_Transpose(test2); //Should Pass
    Test_Case_Transpose(test3); //Should Fail

    delete test1;
    delete test2;
    delete test3;
}