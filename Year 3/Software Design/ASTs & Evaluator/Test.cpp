#include <iostream>
#include "AST.h"

// Test cases for the AddExpr function
void Test_Case_1_AddExpr(Expr* left, Expr* right) {
    double expectedOutput = 7;
    std::string expectedString = "3.000000 + 4.000000";
    AddExpr* expr = new AddExpr(left, right);
    Visitor* visitor = new NumVisitor();
    (expr->toStr() == expectedString && expr->eval(visitor) == expectedOutput) ? std::cout << "Test_Case_1_AddExpr PASSED" << std::endl : std::cout << "Test_Case_1_AddExpr FAILED" << std::endl;
}
void Test_Case_2_AddExpr(Expr* left, Expr* right) {
    double expectedOutput = 8;
    std::string expectedString = "3.000000 + 5.000000";
    AddExpr* expr = new AddExpr(left, right);
    Visitor* visitor = new NumVisitor();
    (expr->toStr() == expectedString && expr->eval(visitor) == expectedOutput) ? std::cout << "Test_Case_2_AddExpr PASSED" << std::endl : std::cout << "Test_Case_2_AddExpr FAILED" << std::endl;
}
void Test_Case_3_AddExpr(Expr* left, Expr* right) {
    double expectedOutput = 9;
    std::string expectedString = "4.000000 + 5.000000";
    AddExpr* expr = new AddExpr(left, right);
    Visitor* visitor = new NumVisitor();
    (expr->toStr() == expectedString && expr->eval(visitor) == expectedOutput) ? std::cout << "Test_Case_3_AddExpr PASSED" << std::endl : std::cout << "Test_Case_3_AddExpr FAILED" << std::endl;
}

// Test Cases for the SubExpr function
void Test_Case_1_SubExpr(Expr* left, Expr* right) {
    double expectedOutput = -1;
    std::string expectedString = "3.000000 - 4.000000";
    SubExpr* expr = new SubExpr(left, right);
    Visitor* visitor = new NumVisitor();
    (expr->toStr() == expectedString && expr->eval(visitor) == expectedOutput) ? std::cout << "Test_Case_1_SubExpr PASSED" << std::endl : std::cout << "Test_Case_1_SubExpr FAILED" << std::endl;
}
void Test_Case_2_SubExpr(Expr* left, Expr* right) {
    double expectedOutput = -2;
    std::string expectedString = "3.000000 - 5.000000";
    SubExpr* expr = new SubExpr(left, right);
    Visitor* visitor = new NumVisitor();
    (expr->toStr() == expectedString && expr->eval(visitor) == expectedOutput) ? std::cout << "Test_Case_2_SubExpr PASSED" << std::endl : std::cout << "Test_Case_2_SubExpr FAILED" << std::endl;
}
void Test_Case_3_SubExpr(Expr* left, Expr* right) {
    double expectedOutput = -1;
    std::string expectedString = "4.000000 - 5.000000";
    SubExpr* expr = new SubExpr(left, right);
    Visitor* visitor = new NumVisitor();
    (expr->toStr() == expectedString && expr->eval(visitor) == expectedOutput) ? std::cout << "Test_Case_3_SubExpr PASSED" << std::endl : std::cout << "Test_Case_3_SubExpr FAILED" << std::endl;
}

// Test Cases for the MulExpr function
void Test_Case_1_MulExpr(Expr* left, Expr* right) {
    double expectedOutput = 12;
    std::string expectedString = "3.000000 * 4.000000";
    MulExpr* expr = new MulExpr(left, right);
    Visitor* visitor = new NumVisitor();
    (expr->toStr() == expectedString && expr->eval(visitor) == expectedOutput) ? std::cout << "Test_Case_1_MulExpr PASSED" << std::endl : std::cout << "Test_Case_1_MulExpr FAILED" << std::endl;
}
void Test_Case_2_MulExpr(Expr* left, Expr* right) {
    double expectedOutput = 15;
    std::string expectedString = "3.000000 * 5.000000";
    MulExpr* expr = new MulExpr(left, right);
    Visitor* visitor = new NumVisitor();
    (expr->toStr() == expectedString && expr->eval(visitor) == expectedOutput) ? std::cout << "Test_Case_2_MulExpr PASSED" << std::endl : std::cout << "Test_Case_2_MulExpr FAILED" << std::endl;
}
void Test_Case_3_MulExpr(Expr* left, Expr* right) {
    double expectedOutput = 20;
    std::string expectedString = "4.000000 * 5.000000";
    MulExpr* expr = new MulExpr(left, right);
    Visitor* visitor = new NumVisitor();
    (expr->toStr() == expectedString && expr->eval(visitor) == expectedOutput) ? std::cout << "Test_Case_3_MulExpr PASSED" << std::endl : std::cout << "Test_Case_3_MulExpr FAILED" << std::endl;
}
// Test Cases for the DivExpr function
void Test_Case_1_DivExpr(Expr* left, Expr* right) {
    double expectedOutput = 0.75;
    std::string expectedString = "3.000000 / 4.000000";
    DivExpr* expr = new DivExpr(left, right);
    Visitor* visitor = new NumVisitor();
    (expr->toStr() == expectedString && expr->eval(visitor) == expectedOutput) ? std::cout << "Test_Case_1_DivExpr PASSED" << std::endl : std::cout << "Test_Case_1_DivExpr FAILED" << std::endl;
}
void Test_Case_2_DivExpr(Expr* left, Expr* right) {
    double expectedOutput = 0.6;
    std::string expectedString = "3.000000 / 5.000000";
    DivExpr* expr = new DivExpr(left, right);
    Visitor* visitor = new NumVisitor();
    (expr->toStr() == expectedString && expr->eval(visitor) == expectedOutput) ? std::cout << "Test_Case_2_DivExpr PASSED" << std::endl : std::cout << "Test_Case_2_DivExpr FAILED" << std::endl;
}
void Test_Case_3_DivExpr(Expr* left, Expr* right) {
    double expectedOutput = 0.8;
    std::string expectedString = "4.000000 / 5.000000";
    DivExpr* expr = new DivExpr(left, right);
    Visitor* visitor = new NumVisitor();
    (expr->toStr() == expectedString && expr->eval(visitor) == expectedOutput) ? std::cout << "Test_Case_3_DivExpr PASSED" << std::endl : std::cout << "Test_Case_3_DivExpr FAILED" << std::endl;
}
// Test cases for ModExpr function
void Test_Case_1_ModExpr(Expr* left, Expr* right) {
    double expectedOutput = 3;
    std::string expectedString = "3.000000 % 4.000000";
    ModExpr* expr = new ModExpr(left, right);
    Visitor* visitor = new NumVisitor();
    (expr->toStr() == expectedString && expr->eval(visitor) == expectedOutput) ? std::cout << "Test_Case_1_ModExpr PASSED" << std::endl : std::cout << "Test_Case_1_ModExpr FAILED" << std::endl;
}
void Test_Case_2_ModExpr(Expr* left, Expr* right) {
    double expectedOutput = 3;
    std::string expectedString = "3.000000 % 5.000000";
    ModExpr* expr = new ModExpr(left, right);
    Visitor* visitor = new NumVisitor();
    (expr->toStr() == expectedString && expr->eval(visitor) == expectedOutput) ? std::cout << "Test_Case_2_ModExpr PASSED" << std::endl : std::cout << "Test_Case_2_ModExpr FAILED" << std::endl;
}
void Test_Case_3_ModExpr(Expr* left, Expr* right) {
    double expectedOutput = 4;
    std::string expectedString = "4.000000 % 5.000000";
    ModExpr* expr = new ModExpr(left, right);
    Visitor* visitor = new NumVisitor();
    (expr->toStr() == expectedString && expr->eval(visitor) == expectedOutput) ? std::cout << "Test_Case_3_ModExpr PASSED" << std::endl : std::cout << "Test_Case_3_ModExpr FAILED" << std::endl;
}
// Test cases for a combination of functions
void Test_Case_1_Combine(Expr* first, Expr* second, Expr* third) {
    double expectedOutput = 2;
    std::string expectedString = "3.000000 + 4.000000 - 5.000000";
    AddExpr* addExpr = new AddExpr(first, second);
    SubExpr* subExpr = new SubExpr(addExpr, third);
    Visitor* visitor = new NumVisitor();
    (subExpr->toStr() == expectedString && subExpr->eval(visitor) == expectedOutput) ? std::cout << "Test_Case_1_Combine PASSED" << std::endl : std::cout << "Test_Case_1_Combine FAILED" << std::endl;
}
void Test_Case_2_Combine(Expr* first, Expr* second, Expr* third) {
    double expectedOutput = 2.4;
    std::string expectedString = "3.000000 * 4.000000 / 5.000000";
    MulExpr* mulExpr = new MulExpr(first, second);
    DivExpr* divExpr = new DivExpr(mulExpr, third);
    Visitor* visitor = new NumVisitor();
    (divExpr->toStr() == expectedString && divExpr->eval(visitor) == expectedOutput) ? std::cout << "Test_Case_2_Combine PASSED" << std::endl : std::cout << "Test_Case_2_Combine FAILED" << std::endl;
}
void Test_Case_3_Combine(Expr* first, Expr* second, Expr* third) {
    double expectedOutput = 8;
    std::string expectedString = "3.000000 % 4.000000 + 5.000000";
    ModExpr* modExpr = new ModExpr(first, second);
    AddExpr* addExpr = new AddExpr(modExpr, third);
    Visitor* visitor = new NumVisitor();
    (addExpr->toStr() == expectedString && addExpr->eval(visitor) == expectedOutput) ? std::cout << "Test_Case_3_Combine PASSED" << std::endl : std::cout << "Test_Case_3_Combine FAILED" << std::endl;
}
// Testing getleftExpr and getrightExpr functions
void Test_Case_1_getBothSidesOfExpr(Expr* left, Expr* right) {
    double expectedLeft= 3, expectedRight = 4;
    AddExpr* expr = new AddExpr(left, right);
    Visitor* visitor = new NumVisitor();
    (expr->getleftExpr()->eval(visitor) == expectedLeft && expr->getrightExpr()->eval(visitor) == expectedRight) ? std::cout << "Test_Case_1_getBothSidesOfExpr PASSED" << std::endl : std::cout << "Test_Case_1_getBothSidesOfExpr FAILED" << std::endl;
}
void Test_Case_2_getBothSidesOfExpr(Expr* left, Expr* right) {
    double expectedLeft= 4, expectedRight = 5;
    AddExpr* expr = new AddExpr(left, right);
    Visitor* visitor = new NumVisitor();
    (expr->getleftExpr()->eval(visitor) == expectedLeft && expr->getrightExpr()->eval(visitor) == expectedRight) ? std::cout << "Test_Case_2_getBothSidesOfExpr PASSED" << std::endl : std::cout << "Test_Case_2_getBothSidesOfExpr FAILED" << std::endl;
}
void Test_Case_3_getBothSidesOfExpr(Expr* left, Expr* right) {
    double expectedLeft= 3, expectedRight = 5;
    AddExpr* expr = new AddExpr(left, right);
    Visitor* visitor = new NumVisitor();
    (expr->getleftExpr()->eval(visitor) == expectedLeft && expr->getrightExpr()->eval(visitor) == expectedRight) ? std::cout << "Test_Case_3_getBothSidesOfExpr PASSED" << std::endl : std::cout << "Test_Case_3_getBothSidesOfExpr FAILED" << std::endl;
}
// Testing the setleftExpr and setrightExpr functions
void Test_Case_1_setBothSidesOfExpr(Expr* left, Expr* right, Expr* extra) {
    double expectedLeft= 4, expectedRight = 5;
    AddExpr* expr = new AddExpr(left, right);
    Visitor* visitor = new NumVisitor();
    expr->setleftExpr(right);
    expr->setrightExpr(extra);
    (expr->getleftExpr()->eval(visitor) == expectedLeft && expr->getrightExpr()->eval(visitor) == expectedRight) ? std::cout << "Test_Case_1_setBothSidesOfExpr PASSED" << std::endl : std::cout << "Test_Case_1_setBothSidesOfExpr FAILED" << std::endl;
}
void Test_Case_2_setBothSidesOfExpr(Expr* left, Expr* right, Expr* extra) {
    double expectedLeft= 5, expectedRight = 3;
    AddExpr* expr = new AddExpr(left, right);
    Visitor* visitor = new NumVisitor();
    expr->setleftExpr(right);
    expr->setrightExpr(extra);
    (expr->getleftExpr()->eval(visitor) == expectedLeft && expr->getrightExpr()->eval(visitor) == expectedRight) ? std::cout << "Test_Case_2_setBothSidesOfExpr PASSED" << std::endl : std::cout << "Test_Case_2_setBothSidesOfExpr FAILED" << std::endl;
}
void Test_Case_3_setBothSidesOfExpr(Expr* left, Expr* right, Expr* extra) {
    double expectedLeft= 3, expectedRight = 4;
    AddExpr* expr = new AddExpr(left, right);
    Visitor* visitor = new NumVisitor();
    expr->setleftExpr(right);
    expr->setrightExpr(extra);
    (expr->getleftExpr()->eval(visitor) == expectedLeft && expr->getrightExpr()->eval(visitor) == expectedRight) ? std::cout << "Test_Case_3_setBothSidesOfExpr PASSED" << std::endl : std::cout << "Test_Case_3_setBothSidesOfExpr FAILED" << std::endl;
}
int main() {

    ConstExpr* c1 = new ConstExpr(3);
    ConstExpr* c2 = new ConstExpr(4);
    ConstExpr* c3 = new ConstExpr(5);

    // Testing the AddExpr function
    Test_Case_1_AddExpr(c1, c2);
    Test_Case_2_AddExpr(c1, c3);
    Test_Case_3_AddExpr(c2, c3);

    // Testing the SubExpr function
    Test_Case_1_SubExpr(c1, c2);
    Test_Case_2_SubExpr(c1, c3);
    Test_Case_3_SubExpr(c2, c3);

    // Testing the MulExpr function
    Test_Case_1_MulExpr(c1, c2);
    Test_Case_2_MulExpr(c1, c3);
    Test_Case_3_MulExpr(c2, c3);

    // Testing the DivExpr function
    Test_Case_1_DivExpr(c1, c2);
    Test_Case_2_DivExpr(c1, c3);
    Test_Case_3_DivExpr(c2, c3);

    // Testing the ModExpr function
    Test_Case_1_ModExpr(c1, c2);
    Test_Case_2_ModExpr(c1, c3);
    Test_Case_3_ModExpr(c2, c3);

    // Testing the combination of functions
    Test_Case_1_Combine(c1, c2, c3);
    Test_Case_2_Combine(c1, c2, c3);
    Test_Case_3_Combine(c1, c2, c3);

    // Testing the getleftExpr and getrightExpr functions
    Test_Case_1_getBothSidesOfExpr(c1, c2);
    Test_Case_2_getBothSidesOfExpr(c2, c3);
    Test_Case_3_getBothSidesOfExpr(c1, c3);

    // Testing the setleftExpr and setrightExpr functions
    Test_Case_1_setBothSidesOfExpr(c1, c2, c3);
    Test_Case_2_setBothSidesOfExpr(c2, c3, c1);
    Test_Case_3_setBothSidesOfExpr(c3, c1, c2);

    // Deleting the expressions to free up memory
    delete c1;
    delete c2;
    delete c3;
}
