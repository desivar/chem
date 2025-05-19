document.getElementById('mixButton').addEventListener('click', function() {
    const element1 = document.getElementById('element1').value;
    const quantity1 = parseInt(document.getElementById('quantity1').value);
    const element2 = document.getElementById('element2').value;
    const quantity2 = parseInt(document.getElementById('quantity2').value);
    
    let result = '';
    let color = '';

    // Simple reaction logic
    if (element1 === 'H' && element2 === 'O') {
        if (quantity1 >= 2 && quantity2 >= 1) {
            result = 'Water (H₂O)';
            color = 'blue'; // Water is clear, but we can represent it as blue for visualization
        } else {
            result = 'Not enough reactants for water.';
        }
    } else if (element1 === 'Na' && element2 === 'Cl') {
        if (quantity1 >= 1 && quantity2 >= 1) {
            result = 'Sodium Chloride (NaCl)';
            color = 'white'; // Sodium chloride is white
        } else {
            result = 'Not enough reactants for sodium chloride.';
        }
    } else {
        result = 'Invalid combination or insufficient quantities.';
    }

    // Display result
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = <div style="color: ${color};">${result}</div>;
});