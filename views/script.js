'use strict';

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth();
const date = now.getDate();
const hour = now.getHours();
const min = now.getMinutes();

const output = `${year}/${month+1}/${date} ${hour}:${min}`;

document.getElementById('date').value=output;