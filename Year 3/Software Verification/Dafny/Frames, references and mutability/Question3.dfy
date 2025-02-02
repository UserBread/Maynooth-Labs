function SumTo(a: array<int>, i: nat): int
    reads a
    requires 0 <= i <= a.Length
{
    if i == 0 then 0 else SumTo(a, i - 1) + a[i - 1]
}

method CumulativeSum(a: array<int>)
    // needs modifies clause and postcondition
    modifies a
    ensures forall i | 0 <= i < a.Length :: a[i] == old(SumTo(a, i)) + old(a[i])
{
    // todo
    var i := 0;
    var sum := 0;
    while (i < a.Length) 
    invariant 0 <= i <= a.Length
    invariant sum == old(SumTo(a, i))
    invariant forall j | 0 <= j < i :: a[j] == old(SumTo(a, j)) + old(a[j])
    invariant forall j | i <= j < a.Length :: a[j] == old(a[j])
    {
        sum := sum + a[i];
        a[i] := sum;
        i := i + 1;
    }
}