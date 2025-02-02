function gcd(a: int, b: int): int
    requires a > 0 && b > 0
    decreases a+b
{
    if a == b then
      a
    else if b > a then
      gcd(b - a, a)
    else
      gcd(b, a - b)
}