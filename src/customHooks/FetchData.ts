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
