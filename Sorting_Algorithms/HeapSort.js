import { swap } from "./Utility";


  export function getHeapSortAnimations(array){

    const animations =[];

    if(array.length<=1)return array;

    const temp = [...array];
     
    let n=temp.length;
    for(let i=n/2-1;i>=0;i--)
    {
        heapify(temp,n,i,animations);
    }


    for(let i=n-1;i>0;i--)
    {
        animations.push([[0, temp[i]], true]);
        animations.push([[i, temp[0]], true]);
        swap(temp,0,i);

        heapify(temp,i,0,animations);
    }

    return animations;
        
  }

  function heapify(arr,n,i,animations)
  {
      let largest=i;
      let l=2*i+1;
      let r=2*i+2;

      if(l<n)
      {
        animations.push([[l, largest], false]);
        if(arr[l]>arr[largest])
        {

            largest=l;
        }
        
      }

      if(r<n)
      {
        animations.push([[r, largest], false]);
        if(arr[r]>arr[largest])
        {

            largest=r;
        }
        
      }

      animations.push([[i, largest], false]);
      if(largest!==i)
      {
        animations.push([[i, arr[largest]], true]);
        animations.push([[largest, arr[i]], true]);
        swap(arr,largest,i);

        heapify(arr,n,largest,animations)
      }

  }