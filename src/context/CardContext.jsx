import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CardContext = createContext();

export default function CardContexProvider(props) {
    const [cardNumber, setCardNumber] = useState(0);  // تصحيح اسم المتغير
    const [isCardLoading, setCardLoading] = useState(false);
    const [CardData, setCardData] = useState(false);

    const headers = {
        token: localStorage.getItem('token')
    };

    // Remove a product from the cart
    function removeCard(productItem) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productItem}`, {
            headers
        })
        .then((response) => response)
        .catch((error) => error);
    }

    // Remove all products from the cart
    function removeAllCard() {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers
        })
        .then((response) => response)
        .catch((error) => error);
    }

    // Update product quantity in the cart
    function updateQantity(productItem, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productItem}`, {
            count: count
        }, {
            headers
        })
        .then((response) => response)
        .catch((error) => error);
    }

    // Fetch the cart
    function getCard() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
            headers
        })
        .then((response) => response)
        .catch((error) => error);
    }

    // Add a product to the cart
    function addToCard(productId) {
        return axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
            productId: productId
        }, {
            headers
        })
        .then((response) => response)
        .catch((error) => error);
    }

    // Fetch cart details
    async function getCardDetals() {
        setCardLoading(true);
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
                headers
            });
            setCardNumber(data.numOfCartItems);
            setCardData(data);
        } catch (error) {
            console.error("Error fetching cart details:", error);
        } finally {
            setCardLoading(false);
        }
    }

    useEffect(() => {
        getCardDetals();
    }, []); // Ensure getCardDetals is called only once on component mount

    return (
        <CardContext.Provider value={{
            addToCard,
            getCard,
            removeCard,
            cardNumber,  // تم تصحيح الاسم هنا
            setCardNumber,
            updateQantity,
            removeAllCard,
            isCardLoading,
            setCardLoading
        }}>
            {props.children}
        </CardContext.Provider>
    );
}
