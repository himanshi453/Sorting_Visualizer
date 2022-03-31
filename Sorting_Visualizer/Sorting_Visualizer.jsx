import React, { useState, useEffect, useRef }from 'react';
import ReactDom from 'react-dom'
import {getMergeSortAnimations} from '../Sorting_Algorithms/MergeSort.js';
import {getQuickSortAnimations} from '../Sorting_Algorithms/QuickSort.js';
import {getInsertionSortAnimations} from '../Sorting_Algorithms/InsertionSort.js';
import {getBubbleSortAnimations} from '../Sorting_Algorithms/BubbleSort.js';
import {getSelectionSortAnimations} from '../Sorting_Algorithms/SelectionSort.js';
import {getHeapSortAnimations} from '../Sorting_Algorithms/HeapSort.js';

import './Sorting_Visualizer.css';


var ANIMATION_SPEED = 20;

var ARR_LEN = 130;

var WIDTH = 2;

const ACCESSED_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SORTED_COLOR = 'green';


export default function SortingVisualizer(props) {

  const [arr, setArr] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const containerRef = useRef(null);

  useEffect(initialiseArray, []);

   /* super(props);

    this.state = {
      array: [],*/



      function initialiseArray() {
        if (isSorting) return;
        if (isSorted) resetArrayColour();
        setIsSorted(false);
        const arr = [];
        for (let i = 0; i < ARR_LEN; i++) {
          arr.push(randomIntFromInterval(5, 650));
        }
        //shuffle(arr);
        setArr(arr);
      }
    
      function mergeSort() {
        const animations = getMergeSortAnimations(arr);
        animateArrayUpdate(animations);
      }
    
      function insertionSort() {
        const animations = getInsertionSortAnimations(arr);
        animateArrayUpdate(animations);
      }
    
      function quickSort() {
        const animations = getQuickSortAnimations(arr);
        animateArrayUpdate(animations);
      }

      function bubbleSort() {
        const animations = getBubbleSortAnimations(arr);
        animateArrayUpdate(animations);
      }

      function selectionSort() {
        const animations = getSelectionSortAnimations(arr);
        animateArrayUpdate(animations);
      }

      function heapSort() {
        const animations = getHeapSortAnimations(arr);
        animateArrayUpdate(animations);
      }

       
      function animateArrayUpdate(animations) {
        if (isSorting) return;
        setIsSorting(true);
        animations.forEach(([comparison, swapped], index) => {
          setTimeout(() => {
            if (!swapped) {
              if (comparison.length === 2) {
                const [i, j] = comparison;
                animateArrayAccess(i);
                animateArrayAccess(j);
              } else {
                const [i] = comparison;
                animateArrayAccess(i);
              }
            } else {
              setArr((prevArr) => {
                const [k, newValue] = comparison;
                const newArr = [...prevArr];
                newArr[k] = newValue;
                return newArr;
              });
            }
          }, index * ANIMATION_SPEED);
        });
        setTimeout(() => {
          animateSortedArray();
        }, animations.length * ANIMATION_SPEED);
      }


      function animateArrayAccess(index) {
        const arrayBars = containerRef.current.children;
        const arrayBarStyle = arrayBars[index].style;
        setTimeout(() => {
          arrayBarStyle.backgroundColor = ACCESSED_COLOR;
        }, ANIMATION_SPEED);
        setTimeout(() => {
          arrayBarStyle.backgroundColor = '';
        }, ANIMATION_SPEED * 2);
      }      


  function animateSortedArray() {
    const arrayBars = containerRef.current.children;
    for (let i = 0; i < arrayBars.length; i++) {
      const arrayBarStyle = arrayBars[i].style;
      setTimeout(
        () => (arrayBarStyle.backgroundColor = SORTED_COLOR),
        i * ANIMATION_SPEED,
      );
    }
    setTimeout(() => {
      setIsSorted(true);
      setIsSorting(false);
    }, arrayBars.length * ANIMATION_SPEED);
  }

  function resetArrayColour() {
    const arrayBars = containerRef.current.children;
    for (let i = 0; i < arr.length; i++) {
      const arrayBarStyle = arrayBars[i].style;
      arrayBarStyle.backgroundColor = '';
    }
  }

 

  return(
      <div className="array-container">

      <div className="Button">
        <button type="button" className="btn btn-outline-secondary btn-xs" onClick={initialiseArray}>Generate New Array</button>
        <button type="button" className="btn btn-outline-secondary btn-xs"onClick={mergeSort}>Merge Sort</button>
        <button type="button" className="btn btn-outline-secondary btn-xs"onClick={quickSort}>Quick Sort</button>
        <button type="button" className="btn btn-outline-secondary btn-xs"onClick={bubbleSort}>Bubble Sort</button>
        <button type="button" className="btn btn-outline-secondary btn-xs"onClick={selectionSort}>Selection Sort</button>
        <button type="button" className="btn btn-outline-secondary btn-xs"onClick={insertionSort}>Insertion Sort</button>
        <button type="button" className="btn btn-outline-secondary btn-xs"onClick={heapSort}>Heap Sort</button>
        
        
    
     </div>

        <div className="bar" ref={containerRef}>
        {arr.map((Height, idx) => (
          <div
            className="array-bar" 
            key={idx}
            style={{
              width:`${1000 / ARR_LEN}px` ,
              height: `${Height}px`,
            }}></div>
        ))}
        </div>
      </div>
    );
  }


function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

