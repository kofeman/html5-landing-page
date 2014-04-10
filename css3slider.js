var slider = document.getElementsByClassName('slider')[0],
    slides = slider.getElementsByClassName('slides')[0],
    slidesLength = slider.querySelectorAll('.slides > div').length,
    inputs = [],
    labels = '',
    i;

/* create inputs */

for( i = 0; i < slidesLength; i++ ){
    inputs[i] = document.createElement('input');
    inputs[i].setAttribute('type', 'radio');
    inputs[i].setAttribute('name', 'slider');
    inputs[i].setAttribute('id', 'slider' + ( i + 1));
    slider.insertBefore(inputs[i] ,slides);

    labels += '<label for=slider' + (i + 1) + '></label>'; //for controls
}
inputs[0].setAttribute('checked', 'checked');

/* create controls */

controls = document.createElement('div');
controls.className = 'controls';
controls.innerHTML = labels;
slider.appendChild(controls);

/* create side controls */

sideControls = document.createElement('div');
sideControls.className = 'side-controls';
sideControls.innerHTML = labels;
slider.appendChild(sideControls);

/* add css rules */

var sheetRules = '';

/* style for functionality */

for ( i = 1; i < slidesLength; i++ ){
    sheetRules += '#slider'+i+':checked ~ .slides > div:nth-of-type('+i+'),\n'
}

sheetRules += '#slider'+slidesLength+':checked ~ .slides > div:nth-of-type('+slidesLength+')\n'+
              '{ position: relative; \n' +
              'opacity: 1; \n' +
              'z-index: 1; }\n';

/* style for checked labels */

for ( i = 1; i < slidesLength; i++ ){
    sheetRules += '#slider'+i+':checked ~ .controls label:nth-of-type('+i+'), \n'
}

sheetRules += '#slider'+slidesLength+':checked ~ .controls label:nth-of-type('+slidesLength+') { \n' +
    'background: #333; } \n'; //style for checked label

/* for side controls */

for ( i = 1; i < slidesLength; i++ ){
    sheetRules += '#slider'+i+':checked ~ .side-controls label:nth-of-type('+ (i + 1) +'), \n' ;
}

sheetRules += '#slider' + slidesLength + ':checked ~ .side-controls label:nth-of-type('+ 1 +'){ \n' +
    'border-left: 20px solid #333; \n' +
    'right: -35px; } \n'; //style for right button

for ( i = 1; i < slidesLength; i++ ){
    sheetRules += '#slider'+ (1 + i) +':checked ~ .side-controls label:nth-of-type('+ i +'), \n'
}

sheetRules += '#slider' + 1 + ':checked ~ .side-controls label:nth-of-type('+ slidesLength +'){ \n' +
    'border-right: 20px solid #333; \n' +
    'left: -35px; } \n';  //style for left button

/* create and add style tag */

var style = document.createElement('style');
style.appendChild(document.createTextNode(sheetRules));
document.head.appendChild(style);