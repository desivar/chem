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

        const beaker2 = document.createElement('div');

        beaker2.id = 'reactant-beaker-2';

        beaker2.classList.add('beaker', 'right');

        const label2 = document.createElement('div');

        label2.classList.add('label');

        label2.id = 'reactant-label-2';

        const content2 = document.createElement('div');

        content2.classList.add('content');

        content2.id = 'reactant-content-2';


        // Simple logic to avoid adding the second beaker multiple times

        if (!document.getElementById('reactant-beaker-2')) {

            reactantBeaker1.parentNode.insertBefore(beaker2, reactionFlask);

            beaker2.appendChild(label2);

            beaker2.appendChild(content2);

            updateBeakerContent(content2, label2, element2);

        } else {

            const existingLabel = document.getElementById('reactant-label-2');

            const existingContent = document.getElementById('reactant-content-2');

            updateBeakerContent(existingContent, existingLabel, element2);

        }

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

                    { element: 'hydrogen', quantity: Math.min(quantity1, 2), target: reactionFlask },

                    { element: 'oxygen', quantity: Math.min(quantity2, 1), target: reactionFlask }

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

                    { element: 'sodium', quantity: Math.min(quantity1, 1), target: reactionFlask },

                    { element: 'chlorine', quantity: Math.min(quantity2, 1), target: reactionFlask }

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

    });



    function animateReaction(reactants, productClass) {

        reactionContent.className = 'content animate-mix'; // Start mixing animation

        productContent.className = 'content'; // Clear previous product



        // Animate reactants moving to the flask (simplified)

        reactants.forEach(reactant => {

            const elementClass = reactant.element;

            const quantity = reactant.quantity;

            // Basic visual representation in the flask

            reactionContent.classList.add(elementClass);

        });



        // After a delay, show the product

        setTimeout(() => {

            reactionContent.className = 'content'; // Stop mixing

            productContent.classList.add(productClass, 'animate-appear');

        }, 1500); // Adjust timing as needed

    }



    function animateError() {

        anime({

            targets: [reactantBeaker1, document.getElementById('reactant-beaker-2') || reactantBeaker1, reactionFlask, productBeaker],

            borderColor: ['#888', '#ff0000', '#888'],

            duration: 500,

            easing: 'easeInOutSine',

        });

    }

});