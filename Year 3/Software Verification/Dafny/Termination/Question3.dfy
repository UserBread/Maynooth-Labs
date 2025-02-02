function powN(a: int, n : nat): int
{
    if (n == 0) then 1
    else a * powN(a, n-1)
}

method Pow(a: int, n: nat) returns (result: int)
    // needs postcondition
    ensures powN(a, n) == result
{
    // todo
    result := 1;
    var i := 0;
    while i < n
        invariant 0 <= i <= n
        // needs another invariant
        invariant result == powN(a, i)
    {
        // todo
        i := i + 1;
        result := result * a;
    }
}