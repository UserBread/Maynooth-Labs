method SumFirst(n: nat) returns (sum: nat)
    ensures sum == n * (n + 1) / 2
{
    // todo
    var i := 0;
    sum := 0;
    while i < n
    {
        sum := sum + i;
        i := i + 1;
    }
}


//n = 3
//sum == 3