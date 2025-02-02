#include "AST.h"
#include <cmath> // Include for fmod

// BinaryExpr
BinaryExpr::BinaryExpr(Expr* left, Expr* right) : left(left), right(right) {}

Expr* BinaryExpr::getleftExpr() {
    return this->left;
}

Expr* BinaryExpr::getrightExpr() {
    return this->right;
}

void BinaryExpr::setleftExpr(Expr* left) {
    this->left = left;
}

void BinaryExpr::setrightExpr(Expr* right) {
    this->right = right;
}

// ConstExpr
ConstExpr::ConstExpr(double v) : value(v) {}

std::string ConstExpr::toStr() {
    return std::to_string(value);
}

double ConstExpr::eval(Visitor* visitor) {
    return visitor->visit(this);
}

double ConstExpr::getValue() const {
    return value;
}

// AddExpr
AddExpr::AddExpr(Expr* left, Expr* right) : BinaryExpr(left, right) {}

std::string AddExpr::toStr() {
    return left->toStr() + " + " + right->toStr();
}

double AddExpr::eval(Visitor* visitor) {
    return visitor->visit(this);
}

// SubExpr
SubExpr::SubExpr(Expr* left, Expr* right) : BinaryExpr(left, right) {}

std::string SubExpr::toStr() {
    return left->toStr() + " - " + right->toStr();
}

double SubExpr::eval(Visitor* visitor) {
    return visitor->visit(this);
}

// MulExpr
MulExpr::MulExpr(Expr* left, Expr* right) : BinaryExpr(left, right) {}

std::string MulExpr::toStr() {
    return left->toStr() + " * " + right->toStr();
}

double MulExpr::eval(Visitor* visitor) {
    return visitor->visit(this);
}

// DivExpr
DivExpr::DivExpr(Expr* left, Expr* right) : BinaryExpr(left, right) {}

std::string DivExpr::toStr() {
    return left->toStr() + " / " + right->toStr();
}

double DivExpr::eval(Visitor* visitor) {
    return visitor->visit(this);
}

// ModExpr
ModExpr::ModExpr(Expr* left, Expr* right) : BinaryExpr(left, right) {}

std::string ModExpr::toStr() {
    return left->toStr() + " % " + right->toStr();
}

double ModExpr::eval(Visitor* visitor) {
    return visitor->visit(this);
}

// NumVisitor
double NumVisitor::visit(Expr* expr) {
    return expr->eval(this);
}

double NumVisitor::visit(AddExpr* expr) {
    return expr->getleftExpr()->eval(this) + expr->getrightExpr()->eval(this);
}

double NumVisitor::visit(SubExpr* expr) {
    return expr->getleftExpr()->eval(this) - expr->getrightExpr()->eval(this);
}

double NumVisitor::visit(MulExpr* expr) {
    return expr->getleftExpr()->eval(this) * expr->getrightExpr()->eval(this);
}

double NumVisitor::visit(DivExpr* expr) {
    return expr->getleftExpr()->eval(this) / expr->getrightExpr()->eval(this);
}

double NumVisitor::visit(ModExpr* expr) {
    return std::fmod(expr->getleftExpr()->eval(this), expr->getrightExpr()->eval(this));
}

double NumVisitor::visit(ConstExpr* expr) {
    return expr->getValue();
}
