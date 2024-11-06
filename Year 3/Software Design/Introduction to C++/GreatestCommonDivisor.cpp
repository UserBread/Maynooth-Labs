#include <iostream>

int main() {

    //Initialize variables to store inputs and the greatest common divisor
    int input1, input2;
    int GCD = 1;

    //Get user input from the line and store in variables
    std::cout << "Please enter your two numbers: ";
    std::cin >> input1;
    std::cin >> input2;

    //Iterate while i is less than the minimum of the two inputs and increase i after each iteration
    for (int i = 1; i < std::min(input1, input2); i++) {

        //If both numbers are divisible by i assign GCD to the value of i
        if (input1 % i == 0 && input2 % i == 0) GCD = i;
    }

    //Print out the GCD
    std:: cout << "The Greatest Common Divisor is: " << GCD << std::endl;
}