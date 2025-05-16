function Helper(path, target, remaining)
{
    // If any number already equals the target, it returns //
    for (let item of remaining)
    {
        if (Math.abs(item.value - target) < 1e-9)
        {
            return item.expr;
        }
    }

    // Returns if there is only one number left and it isn't it //
    if (remaining.length === 1)
    {
        return null;
    }

    // If there is only one number left and it is equal to it's target //
    if (remaining.length === 1 && Math.abs(remaining[0].value - target) < 1e-9)
    {
        return remaining[0].expr;
    }

    // Tries all pairs of numbers //
    for (let i = 0; i < remaining.length; i++)
    {
        for (let j = 0; j < remaining.length; j++)
        {
            // Skips if they are at the same index //
            if (i === j) { continue; }

            // Fetches the two sides //
            let a = remaining[i];
            let b = remaining[j];

            // Stores the rest of the possible numbers //
            let rest = remaining.filter((_, idx) => idx !== i && idx !== j);

            // Tries all operations //
            let candidates = [];

            candidates.push
            ({
                value: a.value + b.value,
                expr: `(${a.expr} + ${b.expr})`
            });

            candidates.push
            ({
                value: a.value - b.value,
                expr: `(${a.expr} - ${b.expr})`
            });

            candidates.push
            ({
                value: a.value * b.value,
                expr: `(${a.expr} * ${b.expr})`
            });

            // Recursises over the candidates //
            for (let c of candidates)
            {
                let result = Helper(path.concat(c.expr), target, [c, ...rest]);

                if (result)
                {
                    return result;
                }
            }
        }
    }

    return null;
}

function FindExpression(nums, target)
{
    const initial = nums.map(n => ({ value: n, expr: n.toString() }));
    return Helper([], target, initial) || "Cannot find a reason why silksong will release tommorow.";
}

onmessage = function(e)
{
    // Transfers the data //
    const { nums, targetNum } = e.data;

    // Runs the computation //
    const result = FindExpression(nums, targetNum);

    // Posts the result back to the main thread //
    this.postMessage(result);
}
