function clearChechboxes(event) {
    event.preventDefault(); // Prevent the default reset submission
  
    document.getElementById('organizer').value = "";
    document.getElementById('city').value = "";
    document.getElementById('category').value = "";
  
    // uncheck all checkboxes
  }
  
  function loadData() {
    fetch('http://localhost:3000/categories')
      .then(res => res.json())
      .then(result => {
        const category = document.getElementById('category');
  
        result.forEach((item, index) => {
          const option = document.createElement('option');
          option.innerHTML = item.NAME;
          option.value = item.CATEGORY_ID;
  
          category.appendChild(option);
        });
      });
  
  
    document.getElementById('fundraiser-form').addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission
  
      const ORGANIZER = document.getElementById('organizer').value;
      const CITY = document.getElementById('city').value;
      const CATEGORY_ID = document.getElementById('category').value;
  
      console.log('Organizer:', ORGANIZER);
      console.log('City:', CITY);
      console.log('Category:', CATEGORY_ID);
  
      if (!ORGANIZER && !CITY && !CATEGORY_ID) {
        alert("You should enter at least one search term");
      } else {
        const fundraisersContainer = document.getElementById('fundraisers');
        fundraisersContainer.innerHTML = '';
  
        fetch('http://localhost:3000/fundraisers?' + new URLSearchParams({
          ORGANIZER,
          CITY,
          CATEGORY_ID,
        }).toString())
          .then(res => res.json())
          .then(result => {
  
            if (result.length === 0) {
              fundraisersContainer.innerHTML = '<div class="empty">No fundraisers are found</div>';
            } else {
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
            }
          })
      }
    });
  
    document.getElementById('fundraiser-form').addEventListener('reset', clearChechboxes);
  }
  
  