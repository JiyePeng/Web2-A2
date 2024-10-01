function loadData() {
    fetch('http://localhost:3000/fundraisers')
      .then(res => res.json())
      .then(result => {
        const fundraisersContainer = document.getElementById('fundraisers');
  
        result.forEach((fundraiser, index) => {
          const fundraiserCard = document.createElement('div');
          fundraiserCard.classList.add('fundraiser-item');
  
          fundraiserCard.innerHTML = `
          <div class="fundraiser-header">
            <img src="./images/logo${fundraiser.FUNDRAISER_ID}.png" alt="Logo" class="fundraiser-logo">
            <h3>${fundraiser.ORGANIZER}</h3>
            <div class="fundraiser-status">
              (${fundraiser.ACTIVE ? 'Active' : 'Suspended'})
            </div>
          </div>
          <div class="fundraiser-details">
            <p><strong>ID:</strong> ${fundraiser.FUNDRAISER_ID}</p>
            <p><strong>Caption:</strong> ${fundraiser.CAPTION}</p>
            <p><strong>Target Funding:</strong> ${fundraiser.TARGET_FUNDING.toLocaleString()} AUD</p>
            <p><strong>Current Funding:</strong> ${fundraiser.CURRENT_FUNDING.toLocaleString()} AUD</p>
            <p><strong>Location:</strong> ${fundraiser.CITY}</p>
            <p><strong>Category Name:</strong> ${fundraiser.NAME}</p>
          </div>
        `;
  
          fundraiserCard.addEventListener("click", function () {
            localStorage.setItem("FUNDRAISER_ID", fundraiser.FUNDRAISER_ID)
            location.href = './details.html';
          })
  
          fundraisersContainer.appendChild(fundraiserCard);
        });
      })
  }
  