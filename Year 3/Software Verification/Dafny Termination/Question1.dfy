function MaxDef(a: int, b: int): int
{
    if a > b then a else b
}

method Max(a: int, b: int) returns (m: int)
    ensures MaxDef(a, b) == a || MaxDef(a, b) == b   
{
    // todo
    m := MaxDef(a,b);
}

function MinDef(a: int, b: int): int
{
    if a < b then a else b
}

method Min(a: int, b: int) returns (m: int)
    ensures MinDef(a, b) == a || MinDef(a, b) == b
{
    // todo
    m := MinDef(a,b);
}