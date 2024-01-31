import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Products} from "../../models/Product";
import {initialProduct} from "../../models/Product";

const HomePage: React.FC = () =>  {

    const [dataRender, setDataRender] = useState<Products[]>([]);
    const [skip, setSkip] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');

    useEffect(() => {
            getListOfProduct();
    }, []);

    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, [isLoading]);

    const getListOfProduct = async () => {
        try {
            const res = await axios.get(`https://dummyjson.com/products?limit=20&skip=${skip}`)
            if(res.data.products.length > 0) {
                setDataRender(res.data.products);
                setSkip(skip => skip + 1);
            } else {
                setDataRender([initialProduct]);
            }
            return res.data.products;
        } catch (error: any) {
            console.debug("error", error.response.data)
        }
    }
    const handleScroll = () => {
        if (Math.floor(window.innerHeight + document.documentElement.scrollTop) === Math.floor(document.documentElement.offsetHeight)) {
            const list = getListOfProduct();
        } else {
            return;
        }
    };
    const getListProductsBySearchKeyWords = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(`https://dummyjson.com/products/search?q=${searchKeyword}&limit=20&skip=${skip}`)
            if(res.data.products.length > 0) {
                setDataRender(res.data.products)
            } else {
                setDataRender([initialProduct]);
            }
        } catch (error: any) {
            console.debug("error", error.response.data)
        }
        finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        setTimeout(() => {
            searchKeyword!== '' && getListProductsBySearchKeyWords();
        },500)
    },[searchKeyword])

    const handleChangeSearchData = (value: any) => {
        setSearchKeyword(value.target.value);
    }
    return (
        <>
            <header>
                <h1>Infinite Scrolling</h1>
            </header>
            <div className='container'>
                <form>
                    <label>Search: </label>
                    <input type='text' value={searchKeyword} onChange={(value: any) => handleChangeSearchData(value)}/>
                </form>
                <div className='list-of-product'>
                    <table>
                        <thead>
                            <tr>
                                <td>Index</td>
                                <td>Title</td>
                                <td>Description</td>
                                <td>Price</td>
                                <td>Discount</td>
                            </tr>
                        </thead>
                        <tbody>
                        {dataRender.length > 0 && dataRender.map((item,index) => (
                            <tr key={index}>
                                <th>{index+1}</th>
                                <th>{item.title}</th>
                                <th>{item.description}</th>
                                <th>{item.price}</th>
                                <th>{item.discountPercentage}</th>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                        {isLoading && <p>Loading...</p>}
                </div>
            </div>
            {/*<footer>This source build by Bui Minh Phuong</footer>*/}
        </>
    );
}

export default HomePage;
