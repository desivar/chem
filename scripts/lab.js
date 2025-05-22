mixButton.addEventListener('click', () => {
    const element1 = element1Select.value;
    const quantity1 = parseInt(quantity1Input.value);
    const element2 = element2Select.value;
    const quantity2 = parseInt(quantity2Input.value);
    let resultText = '';
    let reactionDiagramText = '';
    let productClass = '';

    // Simple reaction logic
    if (element1 === 'H' && element2 === 'O') {
        if (quantity1 >= 2 && quantity2 >= 1) {
            resultText = 'Water (H₂O)';
            reactionDiagramText = '2H₂ + O₂ → 2H₂O';
            productClass = 'water';
            animateReaction([
                { element: 'hydrogen', quantity: Math.min(quantity1, 2), target: reactionFlask },
                { element: 'oxygen', quantity: Math.min(quantity2, 1), target: reactionFlask }
            ], productClass);
            
            // Play sound effect when reaction occurs
            mixSound.play().catch(error => {
                console.error('Error playing sound:', error);
            });
        } else {
            resultText = 'Not enough reactants for water.';
            reactionDiagramText = '';
            animateError();
        }
    } else if (element1 === 'Na' && element2 === 'Cl') {
        if (quantity1 >= 1 && quantity2 >= 1) {
            resultText = 'Sodium Chloride (NaCl)';
            reactionDiagramText = '2Na + Cl₂ → 2NaCl'; // Simplified
            productClass = 'sodium-chloride';
            animateReaction([
                { element: 'sodium', quantity: Math.min(quantity1, 1), target: reactionFlask },
                { element: 'chlorine', quantity: Math.min(quantity2, 1), target: reactionFlask }
            ], productClass);
            
            // Play sound effect when reaction occurs
            mixSound.play().catch(error => {
                console.error('Error playing sound:', error);
            });
        } else {
            resultText = 'Not enough reactants for sodium chloride.';
            reactionDiagramText = '';
            animateError();
        }
    } else if (element1 === 'Mg' && element2 === 'O') {
        if (quantity1 >= 2 && quantity2 >= 1) {
            resultText = 'Magnesium Oxide (MgO)';
            reactionDiagramText = '2Mg + O₂ → 2MgO';
            productClass = 'magnesium-oxide';
            animateReaction([
                { element: 'magnesium', quantity: Math.min(quantity1, 2), target: reactionFlask },
                { element: 'oxygen', quantity: Math.min(quantity2, 1), target: reactionFlask }
            ], productClass);
            
            // Play sound effect when reaction occurs
            mixSound.play().catch(error => {
                console.error('Error playing sound:', error);
            });
        } else {
            resultText = 'Not enough reactants for magnesium oxide.';
            reactionDiagramText = '';
            animateError();
        }
    } else {
        resultText = 'Invalid combination or insufficient quantities.';
        reactionDiagramText = '';
        animateError();
    }

    resultDiv.textContent = resultText;
    reactionDiagramDiv.textContent = reactionDiagramText;
    productLabel.textContent = resultText ? resultText.split(' ')[0] : '';
});