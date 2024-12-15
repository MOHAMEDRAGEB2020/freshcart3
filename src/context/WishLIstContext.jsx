import { createContext, useEffect, useState } from "react";
import axios from "axios";

export let WishListContext = createContext();

export default function WishListProvider(props) {
    const [isLoadingWish, setLoadingWish] = useState(false);
    const [wishDat, setWishData] = useState(null);
    const [wishNumber, setWishNumber] = useState(0);

    const headers = {
        token: localStorage.getItem('token')
    };

    useEffect(() => {
        // Calling getWishCard when the component mounts
        getWishCard();
    }, []); // Ensure getWishCard is called only once on component mount

    // Add product to the wishlist
    function addToWishCard(productId) {
        return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', {
            productId: productId
        }, {
            headers
        })
        .then((response) => response)
        .catch((error) => error);
    }

    // Remove product from the wishlist
    function deleteFromWishList(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
            headers
        })
        .then((response) => response)
        .catch((error) => error);
    }

    // Fetch the wishlist
    async function getWishCard() {
        setLoadingWish(true);

        try {
            const response = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
                headers
            });
            setWishData(response?.data?.data);
            setWishNumber(response?.data?.count);
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        } finally {
            setLoadingWish(false);
        }
    }

    return (
        <WishListContext.Provider value={{
            addToWishCard,
            deleteFromWishList,
            getWishCard,
            wishNumber,
            setWishNumber,
            setLoadingWish,
            isLoadingWish,
            wishDat
        }}>
            {props.children}
        </WishListContext.Provider>
    );
}
