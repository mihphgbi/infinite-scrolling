import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Products} from "../../models/Product";
import "../home/styles/style.scss";
const HomePage: React.FC = () =>  {

    const [dataRender, setDataRender] = useState<Products[]>([]);
    const [skip, setSkip] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [totalItem, setTotalItem] = useState(0);

    useEffect(() => {
        const getListOfProduct = async () => {
            setIsLoading(true)
            try {
                let url = `https://dummyjson.com/products?limit=20&skip=${skip}`;
                if (searchKeyword) {
                    url = `https://dummyjson.com/products/search?q=${searchKeyword}&limit=20&skip=${skip}`;
                }
                const res = await axios.get(url)
                if(res.data.products.length > 0) {
                    setDataRender(prevData => [...prevData, ...res.data.products]);
                    setTotalItem(res.data.total)
                }
                return res.data.products;
            } catch (error: any) {
                console.debug("error", error.response.data)
            }finally {
                setIsLoading(false);
            }
        }
        const handleScroll = () => {
            if ((Math.ceil(window.innerHeight + document.documentElement.scrollTop) === Math.ceil(document.documentElement.offsetHeight)) ||
                (Math.floor(window.innerHeight + document.documentElement.scrollTop) === Math.floor(document.documentElement.offsetHeight))) {
                skip <= totalItem && setSkip(prevPage => prevPage + 20);
            } else {
                return;
            }
        };
        window.addEventListener('scroll', handleScroll);

        getListOfProduct();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [skip, searchKeyword]);

    const handleChangeSearchData = async (value: any) => {
        setSearchKeyword(value.target.value);
        setDataRender([])
        setSkip(0); // Reset page to 1 when search query changes
    };
    return (
        <>
            <header>
                <h1>Infinite Scrolling</h1>
            </header>
            <div className='container'>
                <div className='search-wrapper'>
                    <form>
                        <label>Search: </label>
                        <input className='search-input' type='text' value={searchKeyword} onChange={(value: any) => handleChangeSearchData(value)}/>
                    </form>
                </div>
                <div className='list-of-product-wrapper'>
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
                        {dataRender.length === 0 && <p>No record founds</p>}
                </div>
            </div>
            {/*<footer>This source build by Bui Minh Phuong</footer>*/}
        </>
    );
}

export default HomePage;
