function accumulate(uppLimit) {
    if(uppLimit <= 0) {
        return uppLimit;
    }

    let totalSum = count(uppLimit - 1);
    return totalSum + uppLimit;     
}