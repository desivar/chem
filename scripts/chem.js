document.getElementById('mixButton').addEventListener('click', function() {
    const element1 = document.getElementById('element1').value;
    const quantity1 = parseInt(document.getElementById('quantity1').value);
    const element2 = document.getElementById('element2').value;
    const quantity2 = parseInt(document.getElementById('quantity2').value);
    
    let result = '';
    let color = '';
    let reactionDiagram = '';

    // Simple reaction logic
    if (element1 === 'H' && element2 === 'O') {
        if (quantity1 >= 2 && quantity2 >= 1) {
            result = 'Water (H₂O)';
            color = 'blue'; // Water is clear, but we can represent it as blue for visualization
            reactionDiagram = '2H₂ + O₂ → 2H₂O';
        } else {
            result = 'Not enough reactants for water.';
        }
    } else if (element1 === 'Na' && element2 === 'Cl') {
        if (quantity1 >= 1 && quantity2 >= 1) {
            result = 'Sodium Chloride (NaCl)';
            color = 'white'; // Sodium chloride is white
            reactionDiagram = 'Na + Cl₂ → NaCl';
        } else {
            result = 'Not enough reactants for sodium chloride.';
        }
 } else {
        result = 'Invalid combination or insufficient quantities.';
    }

    // Display result
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = <div style="color: ${color};">${result}</div>;

    // Display reaction diagram
    const reactionDiv = document.getElementById('reactionDiagram');
    reactionDiv.innerHTML = <div>${reactionDiagram}</div>;

    // Animate the transition
    animateReaction(result, color);
});

function animateReaction(result, color) {
    const resultDiv = document.getElementById('result');
    const reactionDiv = document.getElementById('reactionDiagram');

    // Clear previous animations
    resultDiv.style.opacity = 0;
    reactionDiv.style.opacity = 0;

// Animate the result display
    anime({
        targets: resultDiv,
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeInOutQuad',
        complete: function() {
            // Change color after animation
            resultDiv.style.color = color;
        }
    });

    // Animate the reaction diagram display
    anime({
        targets: reactionDiv,
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeInOutQuad'
    });
}
// Add sound effects
const mixSound = new Audio('mix_sound.mp3'); // Add your sound file here

document.getElementById('mixButton').addEventListener('click', function() {
    const element1 = document.getElementById('element1').value;
    const quantity1 = parseInt(document.getElementById('quantity1').value);
    const element2 = document.getElementById('element2').value;
    const quantity2 = parseInt(document.getElementById('quantity2').value);
    
    let result = '';
    let color = '';
    let reactionDiagram = '';
    let productImage = '';

    // Simple reaction logic
    if (element1 === 'H' && element2 === 'O') {
        if (quantity1 >= 2 && quantity2 >= 1) {
            result = 'Water (H₂O)';
            color = 'blue';
            reactionDiagram = '2H₂ + O₂ → 2H₂O';
            productImage = 'images/water.png';
        } else {
            result = 'Not enough reactants for water.';
            color = 'red'; // Error color
        }
    } else if (element1 === 'Na' && element2 === 'Cl') {
        if (quantity1 >= 1 && quantity2 >= 1) {
            result = 'Sodium Chloride (NaCl)';
color = 'white';
            reactionDiagram = 'Na + Cl₂ → NaCl';
            productImage = 'images/sodium_chloride.png';
        } else {
            result = 'Not enough reactants for sodium chloride.';
            color = 'red'; // Error color
        }
    } else {
        result = 'Invalid combination or insufficient quantities.';
        color = 'red'; // Error color
    }
 // Display result
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = <div style="color: ${color};">${result}</div>;

    // Display reaction diagram
    const reactionDiv = document.getElementById('reactionDiagram');
    reactionDiv.innerHTML = <div>${reactionDiagram}</div>;

    // Animate the transition
    animateReaction(result, color, productImage);
});

function animateReaction(result, color, productImage) {
    const resultDiv = document.getElementById('result');
    const reactionDiv = document.getElementById('reactionDiagram');
    const reactantsDiv = document.getElementById('reactants');
    const productsDiv = document.getElementById('products');
// Clear previous animations
    resultDiv.style.opacity = 0;
    reactionDiv.style.opacity = 0;
    reactantsDiv.innerHTML = ''; // Clear previous reactants
    productsDiv.innerHTML = ''; // Clear previous products

    // Add reactants images
    if (element1 === 'H') {
        reactantsDiv.innerHTML += '<img src="images/hydrogen.png" width="50" />';
    } else if (element1 === 'Na') {
        reactantsDiv.innerHTML += '<img src="images/sodium.png" width="50" />';
    }

    if (element2 === 'O') {
        reactantsDiv.innerHTML += '<img src="images/oxygen.png" width="50" />';
    } else if (element2 === 'Cl') {
        reactantsDiv.innerHTML += '<img src="images/chlorine.png" width="50" />';
    }

    // Play sound effect
    mixSound.play();

    // Animate the result display
  anime({
        targets: resultDiv,
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeInOutQuad',
        complete: function() {
            // Change color after animation
            resultDiv.style.color = color;
        }
    });

    // Animate the reaction diagram display
    anime({
        targets: reactionDiv,
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeInOutQuad'
});

    // Animate the movement of reactants to the reaction area
    anime({
        targets: reactantsDiv.children,
        translateY: [0, -50],
        opacity: [1, 0],
        duration: 1000,
        easing: 'easeInOutQuad',
        complete: function() {
            // Clear reactants and show product
            reactantsDiv.innerHTML = '';
            productsDiv.innerHTML = <img src="${productImage}" width="50" />;
            productsDiv.style.opacity = 0;

            // Animate product appearance
            anime({
                targets: productsDiv,
                opacity: [0, 1],
 duration: 1000,
                easing: 'easeInOutQuad'
            });
        }
    });
}