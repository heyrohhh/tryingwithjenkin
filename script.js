document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navOp = document.getElementById("navop");

  hamburger.addEventListener("click", () => {
    navOp.classList.toggle("fullscreen");
    // Change hamburger to close icon
    if (navOp.classList.contains("fullscreen")) {
      hamburger.textContent = "✕";
    } else {
      hamburger.textContent = "☰";
    }
  });

  // Optional: Close menu when clicking on any link
  const links = navOp.querySelectorAll("li");
  links.forEach(link => {
    link.addEventListener("click", () => {
      navOp.classList.remove("fullscreen");
      hamburger.textContent = "☰";
    });
  });
});


// cursoul wala section

 function scrollTestimonials(direction) {
    const container = document.getElementById('testimonialContainer');
    const scrollAmount = 320; // card width + gap
    container.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    });
  }

  //contact page
 const popup = document.getElementById('popupMsg');
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const contactInput = contactForm.querySelector('input[name="contact"]');
  const contactValue = contactInput.value.trim();

  // ✅ Validate 10 digits
  if (!/^\d{10}$/.test(contactValue)) {
    contactInput.classList.add('error');
    showPopup('Please enter a valid 10-digit contact number', 'error');
    return;
  } else {
    contactInput.classList.remove('error');
  }

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  try {
    const res = await fetch('https://atechyz-it-and-support-services.onrender.com/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    if (res.ok) {
      e.target.reset();
      showPopup(result.message, 'success');
    } else {
      showPopup(result.message, 'error');
    }
  } catch (err) {
    showPopup('Failed to send message.', 'error');
  }
});

function showPopup(message, type) {
  popup.textContent = message;
  popup.className = type;
  popup.style.display = 'block';
  setTimeout(() => {
    popup.style.display = 'none';
  }, 3000);
}

// Target all elements with scroll-animate class
const scrollElements = document.querySelectorAll('.scroll-animate');

const elementInView = (el, offset = 0) => {
  const elementTop = el.getBoundingClientRect().top;
  return (
    elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset
  );
};

const displayScrollElement = (element) => {
  element.classList.add('show');
};

const hideScrollElement = (element) => {
  element.classList.remove('show');
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 100)) {
      displayScrollElement(el);
    } else {
      hideScrollElement(el);
    }
  });
};

window.addEventListener('scroll', handleScrollAnimation);


