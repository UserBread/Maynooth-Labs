method DoubleArray(s: array<int>, t: array<int>)
    // needs a frame
    modifies t

    // needs one precondition
    requires s.Length == t.Length

    // needs a postcondition saying that t[i] is twice s[i]
    ensures forall i | 0 <= i < s.Length :: (old(s[i]) == t[i]/2)
{
    // todo
    var i := 0;
    
    while (i < s.Length) 
    invariant 0 <= i <= s.Length
    invariant forall j | 0 <= j < i :: (old(s[j]) == t[j] / 2)
    invariant forall j | i <= j < s.Length :: (old(t[j]) == t[j])
    decreases s.Length - i
    {
        t[i] := 2 * s[i];
        i := i + 1;
    }
}