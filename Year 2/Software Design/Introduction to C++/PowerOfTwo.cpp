#include <iostream>

//Prototype function for use in main
bool powerOfTwo(int input);

int main() {

    //Declare variable and store the user input inside of it
    int input;
    std::cin >> input;

    //If the function returns true we print true
    if(powerOfTwo(input)) std::cout << "true";
    //If not we print false
    else std::cout << "false";
}

//Function to check if the number is a power of 2
bool powerOfTwo(int input) {

    //Declare and Initialize a variable to store the current power of 2
    int pow = 1;

    //Loop while the pow variable is less than the input and multiply it by 2 each iteration
    while (pow < input) {
        pow *= 2;
    }

    //If pow is equal to input it returns true and if not it returns false
    if (pow == input) return true;
    return false;
}
