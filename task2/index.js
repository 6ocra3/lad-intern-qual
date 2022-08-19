var formElement = document.forms['formElement'];

for(let i = 0; i < formElement.elements.length; i++){
    console.log(formElement.elements[i])
    formElement.elements[i].onfocus = function(evt) {
        evt.target.classList.add('focused');
        // var activeElement = formElement.querySelector('.focused');
        // console.log(activeElement)
        // if (activeElement) {
        //     activeElement.classList.remove('focused');
        // }
    };
    
    formElement.elements[i].onblur = function(evt) {
        var activeElement = formElement.querySelector('.focused');
        if (activeElement) {
             activeElement.classList.remove('focused');   
        }
    };
}
