// scripts/lab.js
document.addEventListener('DOMContentLoaded', () => {
    const element1Select = document.getElementById('element1');
    const quantity1Input = document.getElementById('quantity1');
    const element2Select = document.getElementById('element2');
    const quantity2Input = document.getElementById('quantity2');
    const mixButton = document.getElementById('mixButton');
    const reactantBeaker1 = document.getElementById('reactant-beaker-1');
    const reactantContent1 = document.getElementById('reactant-content-1');
    const reactantLabel1 = document.getElementById('reactant-label-1');
    const reactionFlask = document.getElementById('reaction-flask');
    const reactionContent = document.getElementById('reaction-content');
    const productBeaker = document.getElementById('product-beaker');
    const productContent = document.getElementById('product-content');
    const productLabel = document.getElementById('product-label');
    const resultDiv = document.getElementById('result');
    const reactionDiagramDiv = document.getElementById('reactionDiagram');

    let reactantBeaker2 = null;
    let reactantContent2 = null;
    let reactantLabel2 = null;

    function updateBeakerContent(contentElement, labelElement, element) {
        labelElement.textContent = `${element} (${document.getElementById(contentElement.id.replace('-content', '')).value})`;
        contentElement.className = 'content';
        if (element === 'H') contentElement.classList.add('hydrogen');
        else if (element === 'O') contentElement.classList.add('oxygen');
        else if (element === 'Na') contentElement.classList.add('sodium');
        else if (element === 'Cl') contentElement.classList.add('chlorine');
        else contentElement.style.backgroundColor = 'transparent'; // Clear previous
    }

    element1Select.addEventListener('change', () => updateBeakerContent(reactantContent1, reactantLabel1, element1Select.value));

    element2Select.addEventListener('change', () => {
        const element2 = element2Select.value;

        if (!reactantBeaker2) {
            reactantBeaker2 = document.createElement('div');
            reactantBeaker2.id = 'reactant-beaker-2';
            reactantBeaker2.classList.add('beaker', 'right');
            reactantLabel2 = document.createElement('div');
            reactantLabel2.classList.add('label');
            reactantLabel2.id = 'reactant-label-2';
            reactantContent2 = document.createElement('div');
            reactantContent2.classList.add('content');
            reactantContent2.id = 'reactant-content-2';

            reactantBeaker2.appendChild(reactantLabel2);
            reactantBeaker2.appendChild(reactantContent2);
            reactantBeaker1.parentNode.insertBefore(reactantBeaker2, reactionFlask);
        }
        updateBeakerContent(reactantContent2, reactantLabel2, element2);
    });

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
                    { element: 'hydrogen', quantity: Math.min(quantity1, 2), source: reactantContent1, target: reactionContent },
                    { element: 'oxygen', quantity: Math.min(quantity2, 1), source: reactantContent2, target: reactionContent }
                ], productClass);
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
                    { element: 'sodium', quantity: Math.min(quantity1, 1), source: reactantContent1, target: reactionContent },
                    { element: 'chlorine', quantity: Math.min(quantity2, 1), source: reactantContent2, target: reactionContent }
                ], productClass);
            } else {
                resultText = 'Not enough reactants for sodium chloride.';
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
        productContent.className = `content ${productClass} animate-appear`;
    });

    function animateReaction(reactants, productClass) {
        reactionContent.className = 'content animate-mix'; // Start mixing animation
        reactionContent.innerHTML = ''; // Clear previous reaction content

        reactants.forEach(reactant => {
            const elementClass = reactant.element;
            const quantity = reactant.quantity;
            const sourceElement = reactant.source;
            const targetElement = reactant.target;

            for (let i = 0; i < quantity; i++) {
                const movingElement = document.createElement('div');
                movingElement.className = `animate-pour ${elementClass}`;
                const startRect = sourceElement.getBoundingClientRect();
                const targetRect = targetElement.getBoundingClientRect();
                document.body.appendChild(movingElement);

                anime({
                    targets: movingElement,
                    left: [startRect.left + startRect.width / 2 - 10, targetRect.left + targetRect.width / 2 - 10],
                    top: [startRect.top + startRect.height, targetRect.top + targetRect.height / 2],
                    opacity: [1, 0.5],
                    scale: [0.5, 1],
                    duration: 800,
                    easing: 'easeInOutQuad',
                    complete: () => {
                        targetElement.classList.add(elementClass); // Basic visual in flask
                        movingElement.remove();
                    }
                });
            }
        });

        // After a delay, show the product
        setTimeout(() => {
            reactionContent.className = 'content animate-mix'; // Keep mixing style
        }, 1000);

        setTimeout(() => {
            reactionContent.className = 'content'; // Stop mixing
        }, 2500);
    }

    function animateError() {
        anime({
            targets: [reactantBeaker1, reactantBeaker2 || reactantBeaker1, reactionFlask, productBeaker],
            borderColor: ['#66bb6a', '#ff0000', '#66bb6a'],
            duration: 500,
            easing: 'easeInOutSine',
        });
    }
});