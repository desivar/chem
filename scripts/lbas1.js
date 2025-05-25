document.addEventListener('DOMContentLoaded', () => {
    // ... (Your existing variable declarations remain the same) ...
    const element1Select = document.getElementById('element1');
    const quantity1Input = document.getElementById('quantity1');
    const element2Select = document.getElementById('element2');
    const quantity2Input = document.getElementById('quantity2');
    const element3Select = document.getElementById('element3');
    const quantity3Input = document.getElementById('quantity3');

    const mixButton = document.getElementById('mixButton');

    const reactantBeaker1 = document.getElementById('reactant-beaker-1');
    const reactantContent1 = document.getElementById('reactant-content-1');
    const reactantLabel1 = document.getElementById('reactant-label-1');

    const reactantBeaker2 = document.getElementById('reactant-beaker-2');
    const reactantContent2 = document.getElementById('reactant-content-2');
    const reactantLabel2 = document.getElementById('reactant-label-2');

    const reactantBeaker3 = document.getElementById('reactant-beaker-3');
    const reactantContent3 = document.getElementById('reactant-content-3');
    const reactantLabel3 = document.getElementById('reactant-label-3');

    const reactionFlask = document.getElementById('reaction-flask');
    const reactionContent = document.getElementById('reaction-content');
    const productBeaker = document.getElementById('product-beaker');
    const productContent = document.getElementById('product-content');
    const productLabel = document.getElementById('product-label');
    const resultDiv = document.getElementById('result');
    const reactionDiagramDiv = document.getElementById('reactionDiagram');
    const productImageDiv = document.getElementById('product-image');

    const mixSound = new Audio('sounds/mix_sound.mp3'); // Ensure this path is correct

    function updateBeakerContent(contentElement, labelElement, element, quantity) {
        labelElement.textContent = `${element} (${quantity})`;
        contentElement.className = 'content'; // Reset classes
        if (element === 'H') contentElement.classList.add('hydrogen');
        else if (element === 'O') contentElement.classList.add('oxygen');
        else if (element === 'Na') contentElement.classList.add('sodium');
        else if (element === 'Cl') contentElement.classList.add('chlorine');
        else {
            contentElement.style.backgroundColor = 'transparent'; // Clear if "None" or unknown
            labelElement.textContent = ''; // Clear label if "None"
        }
    }

    // Initial updates for all beakers
    updateBeakerContent(reactantContent1, reactantLabel1, element1Select.value, quantity1Input.value);
    updateBeakerContent(reactantContent2, reactantLabel2, element2Select.value, quantity2Input.value);
    updateBeakerContent(reactantContent3, reactantLabel3, element3Select.value, quantity3Input.value);

    element1Select.addEventListener('change', () => {
        updateBeakerContent(reactantContent1, reactantLabel1, element1Select.value, quantity1Input.value);
    });
    quantity1Input.addEventListener('input', () => {
        updateBeakerContent(reactantContent1, reactantLabel1, element1Select.value, quantity1Input.value);
    });

    element2Select.addEventListener('change', () => {
        updateBeakerContent(reactantContent2, reactantLabel2, element2Select.value, quantity2Input.value);
    });
    quantity2Input.addEventListener('input', () => {
        updateBeakerContent(reactantContent2, reactantLabel2, element2Select.value, quantity2Input.value);
    });

    element3Select.addEventListener('change', () => {
        updateBeakerContent(reactantContent3, reactantLabel3, element3Select.value, quantity3Input.value);
    });
    quantity3Input.addEventListener('input', () => {
        updateBeakerContent(reactantContent3, reactantLabel3, element3Select.value, quantity3Input.value);
    });

    mixButton.addEventListener('click', () => {
        const element1 = element1Select.value;
        const quantity1 = parseInt(quantity1Input.value);
        const element2 = element2Select.value;
        const quantity2 = parseInt(quantity2Input.value);
        const element3 = element3Select.value;
        const quantity3 = parseInt(quantity3Input.value);

        let resultText = '';
        let reactionDiagramText = '';
        let productClass = '';
        let productImage = '';
        let finalColor = '';
        let error = false;

        // Reset display
        resultDiv.textContent = '';
        reactionDiagramDiv.textContent = '';
        productImageDiv.innerHTML = '';
        productContent.className = 'content';
        productLabel.textContent = '';
        reactionContent.style.backgroundColor = 'transparent';
        reactionContent.classList.remove('animate-mix'); // Ensure no mixing animation on reset

        // --- Reaction Logic ---
        // You'll need to define all the 2-element and 3-element reactions you want to support here.
        // Example: Hydrogen Peroxide (H2O2) - simplified example
        if (element1 === 'H' && element2 === 'O' && element3 === 'O' && quantity1 >= 2 && quantity2 >= 1 && quantity3 >= 1) {
            resultText = 'Hydrogen Peroxide (H₂O₂) (Example)'; // Simplified
            finalColor = 'rgba(173, 216, 230, 0.9)'; // Light blue for H2O2
            reactionDiagramText = 'H₂ + 2O → H₂O₂ (simplified)';
            productImage = 'images/h2o2.png'; // Make sure you have this image
            productClass = 'hydrogen-peroxide';
        }
        // Water (2 elements)
        else if (element1 === 'H' && element2 === 'O' && quantity3 === 0 && quantity1 >= 2 && quantity2 >= 1) {
            resultText = 'Water (H₂O)';
            finalColor = 'rgba(47, 197, 213, 0.932)';
            reactionDiagramText = '2H₂ + O₂ → 2H₂O';
            productImage = 'images/water.png';
            productClass = 'water';
        }
        // Salt (2 elements)
        else if (element1 === 'Na' && element2 === 'Cl' && quantity3 === 0 && quantity1 >= 1 && quantity2 >= 1) {
            resultText = 'Salt (NaCl)';
            finalColor = 'rgba(242, 236, 236, 0.882)';
            reactionDiagramText = 'Na + Cl₂ → NaCl';
            productImage = 'images/salt.png';
            productClass = 'salt';
        }
        else {
            resultText = 'Invalid combination or insufficient quantities.';
            error = true;
        }

        // --- End Reaction Logic ---

        resultDiv.textContent = resultText;
        resultDiv.style.color = error ? 'red' : '#2e7d32';
        reactionDiagramDiv.textContent = reactionDiagramText;
        productLabel.textContent = resultText ? resultText.split(' ')[0] : '';

        if (productImage && !error) {
            productImageDiv.innerHTML = `<img src="${productImage}" alt="${resultText}" />`;
        } else {
            productImageDiv.innerHTML = '';
        }

        if (!error) {
            const activeReactantContents = [];
            const activeReactantBeakers = [];

            // Add elements only if a value is selected and quantity is > 0
            if (element1Select.value && parseInt(quantity1Input.value) > 0) {
                activeReactantContents.push(reactantContent1);
                activeReactantBeakers.push(reactantBeaker1);
            }
            if (element2Select.value && parseInt(quantity2Input.value) > 0) {
                activeReactantContents.push(reactantContent2);
                activeReactantBeakers.push(reactantBeaker2);
            }
            if (element3Select.value && parseInt(quantity3Input.value) > 0) {
                activeReactantContents.push(reactantContent3);
                activeReactantBeakers.push(reactantBeaker3);
            }

            animateReaction(activeReactantContents, activeReactantBeakers, productClass, finalColor);
        } else {
            animateError();
        }
    });


    function animateReaction(reactantContents, reactantBeakers, productClass, finalColor) {
        // Clear previous states
        reactionContent.style.backgroundColor = 'transparent';
        reactionContent.classList.remove('animate-mix');
        productContent.className = 'content'; // Clear previous product
        productContent.style.backgroundColor = 'transparent'; // Clear previous product color

        let pourDelay = 0;
        const pourDuration = 900; // Time for each pour animation
        const pourStagger = 300; // Delay between consecutive pours

        // 1. Pouring Phase
        const pourPromises = reactantContents.map((contentElement, index) => {
            return new Promise(resolve => {
                const beakerElement = reactantBeakers[index];
                const color = window.getComputedStyle(contentElement).backgroundColor;

                if (color && color !== 'rgba(0, 0, 0, 0)') { // Only pour if liquid is present
                    const pourDiv = document.createElement('div');
                    pourDiv.classList.add('content', 'animate-pour');
                    pourDiv.style.backgroundColor = color;
                    beakerElement.appendChild(pourDiv);

                    anime({
                        targets: pourDiv,
                        height: ['40%', '0%'], // Simulate liquid leaving beaker
                        translateX: {
                            value: reactionFlask.offsetLeft - beakerElement.offsetLeft + (reactionFlask.offsetWidth / 2 - beakerElement.offsetWidth / 2),
                            duration: pourDuration,
                            easing: 'easeInOutQuad'
                        },
                        translateY: {
                            value: reactionFlask.offsetTop - beakerElement.offsetTop + reactionFlask.offsetHeight / 2,
                            duration: pourDuration,
                            easing: 'easeInOutQuad'
                        },
                        opacity: 0,
                        delay: pourDelay,
                        complete: () => {
                            pourDiv.remove(); // Clean up temporary element
                            resolve(); // Resolve promise when animation complete
                        }
                    });
                    pourDelay += pourStagger; // Increment delay for the next pour
                } else {
                    resolve(); // Resolve immediately if no liquid to pour
                }
            });
        });

        // Wait for all pouring animations to complete
        Promise.all(pourPromises).then(() => {
            // 2. Mixing Phase
            // Set the reaction flask background to the combined color (or initial product color)
            reactionContent.style.backgroundColor = finalColor;
            reactionContent.classList.add('animate-mix');
            mixSound.play().catch(e => console.error("Error playing sound:", e)); // Play sound and catch potential errors

            const mixingDuration = 2000; // How long the mixing animation lasts

            setTimeout(() => {
                reactionContent.classList.remove('animate-mix');
                reactionContent.style.backgroundColor = 'transparent'; // Clear reaction flask content

                // 3. Result (Product Formation)
                productContent.classList.add(productClass, 'animate-appear');
                productContent.style.backgroundColor = finalColor; // Set product color
            }, mixingDuration); // After mixing duration
        });
    }

    function animateError() {
        anime({
            targets: [reactantBeaker1, reactantBeaker2, reactantBeaker3, reactionFlask, productBeaker],
            borderColor: ['#888', '#ff0000', '#888'],
            duration: 500,
            easing: 'easeInOutSine',
            loop: 2, // Flash red twice
            direction: 'alternate'
        });
        // Optionally play a 'buzz' or 'error' sound
        // const errorSound = new Audio('sounds/error_sound.mp3');
        // errorSound.play().catch(e => console.error("Error playing error sound:", e));
    }

    // Initial population of beakers
    updateBeakerContent(reactantContent1, reactantLabel1, element1Select.value, quantity1Input.value);
    updateBeakerContent(reactantContent2, reactantLabel2, element2Select.value, quantity2Input.value);
    updateBeakerContent(reactantContent3, reactantLabel3, element3Select.value, quantity3Input.value);
});