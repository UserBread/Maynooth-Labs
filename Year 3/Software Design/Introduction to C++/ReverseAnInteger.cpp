#include <iostream>

int main() {

    //Initialize two variables to store the input and output
    int input;
    int output = 0;

    //Allow for the user to input any integer and store it in the "input" variable
    std::cout << "Please Enter a number: ";
    std::cin >> input;

    //Iterate as long as the value of input is not zero while incrementing i
    for (int i = 0; input != 0; i++) {

        //Multiply output by 10 to allow for the value furthest right to always remain as 0
        output *= 10;

        //Add the modulo of input to output
        output += input%10;

        //Divide input by 10 and reassign it to this new number
        input /= 10;
    }

    //Print the reversed number
    std::cout << "Your number reversed is: " << output << std::endl;
}