let navbarDiv = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if(document.body.scrollTop > 40 || document.documentElement.scrollTop > 40){
        navbarDiv.classList.add('navbar-cng');
    } else {
        navbarDiv.classList.remove('navbar-cng');
    }
});


const navbarCollapseDiv = document.getElementById('navbar-collapse');
const navbarShowBtn = document.getElementById('navbar-show-btn');
const navbarCloseBtn = document.getElementById('navbar-close-btn');
// show navbar
navbarShowBtn.addEventListener('click', () => {
    navbarCollapseDiv.classList.add('navbar-collapse-rmw');
});

// hide side bar
navbarCloseBtn.addEventListener('click', () => {
    navbarCollapseDiv.classList.remove('navbar-collapse-rmw');
});

document.addEventListener('click', (e) => {
    if(e.target.id != "navbar-collapse" && e.target.id != "navbar-show-btn" && e.target.parentElement.id != "navbar-show-btn"){
        navbarCollapseDiv.classList.remove('navbar-collapse-rmw');
    }
});



class ContactForm {
  
    constructor(el) {
      this.element = el || null
      this.action = el.action
      this.fields = Object.keys(el.elements).reduce((obj, key) => {
        if (key === el.elements[key].id) obj[key] = el.elements[key]
        return obj
      }, {})
      console.log('Contact Form:', this)
    }
    
    init() {
      this.element.addEventListener('submit', (event) => this.onSubmit(event))
    }
    
    onSubmit(event) {
      event.preventDefault()
      this.element.classList.remove('contact-form--errors')
      this.element.classList.remove('contact-form--sent')
      this.element.classList.add('contact-form--loading')
      this.sendFormData(this.getFormData())
        .then(response => {
          if (response.status === 200) {
            return response.json()
                    .then(res => this.onSent(res))
          } else {
            throw 'An error occured while submitting the form'
          }
        })
        .catch(err => this.onError(err))
    }
    
    onSent(response) {
      for (let i = 0; i < this.element.querySelectorAll('div').length; i++) {
        this.element.querySelectorAll('div')[i].classList.add('is-hidden')
      }
      
      let successElement = document.createElement('div')
      successElement.innerHTML = `Message sent successfully`
      this.element.appendChild(successElement)
  
      this.element.classList.remove('contact-form--loading')
      this.element.classList.add('contact-form--sent')
      console.log('Sent:', response.success)
    }
    
    onError(err = '') {
      this.element.classList.remove('contact-form--loading')
      this.element.classList.add('contact-form--errors')
      console.error('Error:', err)
    }
    
    sendFormData(data = {}) {
      return new Promise((resolve, reject) => {
        console.log('Send Data:', data)
        fetch(this.action, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(data)
        })
        .then(response => resolve(response))
        .catch(err => reject(err))
      })
    }
    
    getFormData() {
      let formData = {},
          values = []
  
      Object.keys(this.fields).forEach(key => {
        switch(this.fields[key].type) {
          case 'checkbox':
          case 'radio': {
            formData[key] = this.fields[key].checked
            break
          }
          case'select-one': {
            if (!this.fields[key][this.fields[key].selectedIndex].disabled) {
              formData[key] = this.fields[key][this.fields[key].selectedIndex].value
            } else {
              formData[key] = ''
            }
            break
          }
          case'select-multiple': {
            Object.keys(this.fields[key].options).forEach(i => {
              if (this.fields[key].options[i].selected && !this.fields[key].options[i].disabled) {
                values.push(this.fields[key].options[i].value)
              }
            })
            formData[key] = values.length > 0 ? values.join(', ') : ''
            break
          }
          default: {
            formData[key] = this.fields[key].value
            break
          }
        }
      })
      return formData
    }
  
  }
  
  // Create a new instance of the ContactForm class
  const form = new ContactForm(document.querySelector('.contact-form'))
  
  // Initialise our instance of the ContactForm class when document has loaded
  window.onload = (event) => form.init()
  

  function myFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
  
  