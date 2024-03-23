import * as _React from 'react'; 
import { useState, useEffect } from 'react';


import { serverCalls } from '../api'; 



export interface ShopProps {
    id: string,
    name: string,
    image: string,
    description: string,
    price: string,
    prod_id: string,
    quantity: number,
    order_id?: string
}


interface GetShopDataProps {
    shopData: ShopProps[]
    getData: () => void
}


export const useGetShop = (): GetShopDataProps => {
    // setup our hooks
    const [ shopData, setShopData ] = useState<ShopProps[]>([])
    
    
    const handleDataFetch = async () => {
        const result = await serverCalls.getShop() //result will be our list of shop dictionary/objects
        
        setShopData(result)
    }
    
    
    useEffect( () => { handleDataFetch() }, []) // [] inside is our depency list aka what are we listening for

    return { shopData, getData: handleDataFetch }

}


interface GetOrderDataProps {
    orderData: ShopProps[]
    getData: () => void
}


// create our custom hook that get's called automatically when we go to our Order page
export const useGetOrder = (): GetOrderDataProps => {
    // setup some hooks
    const [ orderData, setShopData ] = useState<ShopProps[]>([])


    const handleDataFetch = async () => {
        const result = await serverCalls.getOrder() //making the api call from our serverCall dictionary/object

        setShopData(result)
    }

    // useEffect is essentially an event listener listening for changes to variables 
    // takes 2 arguments, 1 is the function to run, the 2nd is the variable we are watching in a []
    useEffect(()=> {
        handleDataFetch()
    }, []) //[] inside list is variable we are watching/listening to for changes 

    return { orderData, getData: handleDataFetch }

}