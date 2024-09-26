#include <iostream>

int expBySquaring(int input, int power);

int main() {
    //Initialize variables
    int input, power, output = 1;

    //Get the user input and store it in variables
    std::cout << "Please enter your number and the power you'd like to raise it to: ";
    std::cin >> input;
    std::cin >> power;

    //Print the return value of the function
    std::cout << expBySquaring(input, power);
}

//Recursive function implementing the exponentiation by squaring algorithm
//This reaches O(log n) time complexity by decomposing the exponent(power) into powers of two
//Resulting in a lower amount of multiplication needed
int expBySquaring(int input, int power) {
    if (power == 0) return 1;   //special case for power = 0
    if (power == 1) return input;   //special case for power = 1
    else if (power % 2 == 0) {  //if even
        return expBySquaring(input * input, power/2);
    }
    else if (power % 2 == 1) {  //if odd
        return input * expBySquaring(input*input, (power-1)/2);
    }
}
