#include <iostream>
#include <cstring>

using namespace std;

/*
    Ensure you include sufficient comments to explain your solutions. This can
    come in the form of a multi-line comment before the solution, or inline
    comments left within the solution itself.
*/


unsigned int length(const char* str){

    // Initialize a counter variable to store the length
    int count = 0;

    // Iterate through the string until we find '\0'
    while(str[count] != '\0'){

        // Increment the counter
        count++;
    }

    // Return the value of the counter
    return count;
}

char* copy(char* dest, const char* src) {

    // Check if dest has enough space for src
    if (length(dest) < length(src)) {
        return NULL;
    }

    // Copy src to dest
    for (int i = 0; i < length(src); i++) {
        dest[i] = src[i];
    }

    return dest;
}


int indexOf(char c, const char* str){

    // Iterate through the string
    for (int i = 0; i < length(str); i++){

        // If we find the character, return the index
        if (str[i] == c){
            return i;
        }
    }
    return -1;
}

char* substring(int i, int j, const char* str){

    // Initialize a new string to store the substring
    char* sub = new char[j-i];

    // Check if the indices are valid
    if (i < 0 || j > length(str)){
        return NULL;
    }

    // Store the substring into the new string
    for (int k = i; k < j; k++){
        sub[k-i] = str[k];
    }

    // Return the substring
    return sub;
}

char* replace(char c, char p, const char* str){

    // Initialize a new string to store the replaced string
    char* new_str = new char[length(str)];

    // Iterate through the string
    for (int i = 0; i < length(str); i++){

        // If we find the character, replace it
        if (str[i] == c){
            new_str[i] = p;
        }

        // If not we copy the character
        else {
            new_str[i] = str[i];
        }
    }

    // Return the replaced string
    return new_str;
}

/*
    - Try to include your test cases below this multi-line comment -

    Ensure your test cases use the following format:

    [function]_name_test_case_[k](){
        test_input = example_value;
        expected_output = example_value;

        result = [function](test_input)
        if(result == output){
            cout << "[function]_name_test_case_[k] PASSED" << endl;
        }
        else{
            cout << "[function]_name_test_case_[k] FAILED" << endl;
        }
    }

    [function] - The name of the function being tested
    [k] - The index of the test
*/

void length_test_case_1(){
    char test_input[] = "String";
    int expected_output = 6;

    unsigned int result = length(test_input);
    if(result == expected_output){
        cout << "length_test_case_1 PASSED" << endl;
    }
    else{
        cout << "length_test_case_1 FAILED" << endl;
    }
}
void length_test_case_2(){
    char test_input[] = "String\0";
    int expected_output = 6;

    unsigned int result = length(test_input);
    if(result == expected_output){
        cout << "length_test_case_2 PASSED" << endl;
    }
    else{
        cout << "length_test_case_2 FAILED" << endl;
    }
}

void copy_test_case_1() {
    char test_input1[] = "aaaaaa";
    char test_input2[] = "String";
    char expected_output[] = "String";

    char* result = copy(test_input1, test_input2);
    if (strcmp(result, expected_output) == 0) {
        cout << "copy_test_case_1 PASSED" << endl;
    }
    else {
        cout << "copy_test_case_1 FAILED" << endl;
    }
}
void copy_test_case_2() {
    char test_input1[] = "hello";
    char test_input2[] = "String";
    char* expected_output = NULL;

    char* result = copy(test_input1, test_input2);
    if (result == expected_output) {
        cout << "copy_test_case_2 PASSED" << endl;
    }
    else {
        cout << "copy_test_case_2 FAILED" << endl;
    }
}

void indexOf_test_case_1() {
    char test_input1 = 'i';
    char test_input2[] = "String";
    int expected_output = 3;

    int result = indexOf(test_input1, test_input2);
    if (result == expected_output) {
        cout << "indexOf_test_case_1 PASSED" << endl;
    }
    else {
        cout << "indexOf_test_case_1 FAILED" << endl;
    }
}
void indexOf_test_case_2() {
    char test_input1 = 'o';
    char test_input2[] = "String";
    int expected_output = -1;

    int result = indexOf(test_input1, test_input2);
    if (result == expected_output) {
        cout << "indexOf_test_case_2 PASSED" << endl;
    }
    else {
        cout << "indexOf_test_case_2 FAILED" << endl;
    }
}

void substring_test_case_1() {
    char test_input[] = "String";
    int start = 0;
    int end = 3;
    char expected_output[] = "Str";

    char* result = substring(start, end, test_input);
    if (strcmp(result, expected_output) == 0) {
        cout << "substring_test_case_1 PASSED" << endl;
    }
    else {
        cout << "substring_test_case_1 FAILED" << endl;
    }
}
void substring_test_case_2() {
    char test_input[] = "String";
    int start = -1;
    int end = 20;
    char* expected_output = NULL;

    char* result = substring(start, end, test_input);
    if (result == expected_output) {
        cout << "substring_test_case_2 PASSED" << endl;
    }
    else {
        cout << "substring_test_case_2 FAILED" << endl;
    }
}

void replace_test_case_1() {
    const char test_input[] = "String";
    char expected_output[] = "Strong";
    char c = 'i', p = 'o';

    char* result = replace(c, p, test_input);
    if (strcmp(result, expected_output) == 0) {
        cout << "replace_test_case_1 PASSED" << endl;
    }
    else {
        cout << "replace_test_case_1 FAILED" << endl;
    }
}
void replace_test_case_2() {
    const char test_input[] = "String";
    char expected_output[] = "String";
    char c = 'x', p = 'o';

    char* result = replace(c, p, test_input);
    if (strcmp(result, expected_output) == 0) {
        cout << "replace_test_case_2 PASSED" << endl;
    }
    else {
        cout << "replace_test_case_2 FAILED" << endl;
    }
}

// Call your test functions in the main function below
int main(){
    // [function]_name_test_case_[k]()

    length_test_case_1();
    length_test_case_2();
    copy_test_case_1();
    copy_test_case_2();
    indexOf_test_case_1();
    indexOf_test_case_2();
    substring_test_case_1();
    substring_test_case_2();
    replace_test_case_1();
    replace_test_case_2();
    return 0;
}