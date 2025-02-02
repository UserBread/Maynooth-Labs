#include <iostream>

class Matrix
{
  public:
    //Constructors
    Matrix(unsigned int m, unsigned int n);
    Matrix(const Matrix &matrix);
    Matrix(int** array, unsigned int m, unsigned int n);

    //Methods
    unsigned int rows() const;
    unsigned int columns() const;
    int get(unsigned int i, unsigned int j) const;
    void set(unsigned int i, unsigned int j, int value);

    //Matrix Operations
    Matrix operator+(const Matrix &matrix);
    Matrix operator-(const Matrix &matrix);
    Matrix operator*(const Matrix &matrix);
    Matrix operator~() const;
    bool operator==(const Matrix &matrix);
    std::string toString();

private:
    unsigned int m, n;  //Rows and columns
    int** array;        //2D Array for our data
};