#include <iostream>

//Prototype function so that it can be used in main
bool checkPalindrome(int input);

int main() {
    //Declare variable
    int input;

    //Retrieve the input and store it in the variable
    std::cout << "Please enter the number you'd like to check: ";
    std::cin >> input;

    //Print either true or false depending on what the function returns
    if (checkPalindrome(input)) std::cout << "true";
    else std::cout << "false";
}

//Function to check if the number is a palindrome
bool checkPalindrome(int input) {

    //convert the number into a string and create a variable to store it and the reverse of it
    std::string s = std::to_string(input);
    std::string pal;

    //Iterate over the string starting at the end to reverse it
    for (int i = s.size()-1; i >= 0; i--) {

        //Add the value at i to the palindrome string
        pal += s.at(i);
    }

    //if the strings match, return true
    if (s == pal) return true;
    //if not return false
    return false;
}
