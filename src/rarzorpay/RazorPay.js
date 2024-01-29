import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Razorpay = () => {
    const key_secret = process.env.REACT_APP_KEY_SECRET
    const [orderid, setOrderId] = useState(null);
    const [loading2, setLoading2] = useState(false);
    const [formValues, setFormValues] = useState({
        amount: 1,
        name: 'Lakshay Khokhar',
        profile_name: 'LakshayKhokhar',
        email: 'lakshaykhokhar2003@gmail.com',
        product: 'Expenses',
        number: '7498608775',
        address: 'Mumbai Bhiwandi 421302',
        callback_url: 'http://localhost:80/api/payment-callback',
        cancel_url: 'http://localhost:80/api/payment-cancel',
    });
    const getOrderId = async () => {
        setLoading2(true);
        try {
            const response = await axios.post('http://localhost:80/api/orders', {...formValues})
            setOrderId(response.data);
            setLoading2(false);
        } catch (e) {
            console.log(e)
            setLoading2(false)
        }

    };

    useEffect(() => {

        getOrderId();
        // eslint-disable-next-line
    }, []);

    return (<>
        <form method="POST" action="https://api.razorpay.com/v1/checkout/embedded">
            <input type="hidden" name="key_id" value={key_secret}/>
            <input type="hidden" name="amount" value={formValues.amount}/>
            <input type="hidden" name="order_id" value={orderid}/>
            <input type="hidden" name="name" value={formValues.name}/>
            <input type="hidden" name="description" value={formValues.product}/>
            <input type="hidden" name="image"
                   value="https://d6xcmfyh68wv8.cloudfront.net/newsroom-content/uploads/2022/07/Razorpay_payments.png"/>
            <input type="hidden" name="prefill[name]" value={formValues.profile_name}/>
            <input type="hidden" name="prefill[contact]" value={formValues.number}/>
            <input type="hidden" name="prefill[email]" value={formValues.email}/>
            <input type="hidden" name="notes[shipping address]" value={formValues.address}/>
            <input type="hidden" name="callback_url" value={formValues.callback_url}/>
            <input type="hidden" name="cancel_url" value={formValues.cancel_url}/>

            {!loading2 ? <div className='col-12 center'>
                <button disabled={!orderid} className='w-100' type="submit">Pay Now</button>
            </div> : <div className='col-12 center'>
                <button className='w-100 text-center' type="submit">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Wait...</span>
                    </div>
                </button>
            </div>}
        </form>
    </>)
}

export default Razorpay
