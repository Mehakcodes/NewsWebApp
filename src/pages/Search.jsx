import React from 'react';
import NewsCard from '../components/NewsCard';
import { useState } from 'react';
import Pagination from '../components/Pagination';

function Search() {
  const apikey=process.env.REACT_APP_NEWS_API_KEY;
  const [news,setNews]=useState([]);
  const [errormsg,setErrormsg]=useState(null);
  const [keyword,setKeyword]=useState(null); 
  const [currentPage, setCurrentPage] = useState(1);
  const PageSize=6;
  const [totalCount,setTotalCount]=useState(0);
  const [loading,setLoading]=useState(false);



const onPageChange = (page) => {
    setLoading(true);
    fetch(`https://newsapi.org/v2/everything?q=${keyword}&searchIn=title,description&language=en&sortBy=relevancy&pageSize=${PageSize}&page=${page}&apiKey=${apikey}`)
    .then((res) => res.json())
    .then((data) => {
      setLoading(false);
      if (data.status==='error'){
        setErrormsg(data.message);
        return;
      }
      setNews(data.articles);
      setCurrentPage(page);

    });
    window.scrollTo({top:0,behavior:'smooth'});
  }



  
  const SearchFunction=(e)=>{
    e.preventDefault();
    setLoading(true);
    fetch(`https://newsapi.org/v2/everything?q=${keyword}&searchIn=title,description&language=en&sortBy=relevancy&pageSize=${PageSize}&page=1&apiKey=${apikey}`)
    .then((res)=>res.json())
    .then((data)=>{
      if (data.status==='error'){
        setErrormsg(data.message);
        setLoading(false);
        return;
      }
      setNews(data.articles);
      setTotalCount(Math.min(data.totalResults,72));
      setLoading(false);
      setCurrentPage(1);
    })
  }
  
  return (
    <div className='w-full'>
      <h1 className='w-full text-center py-20 uppercase text-6xl font-bold'>Search By <span className='text-pallete-600'>Keyword</span></h1>
      <div className='w-full flex justify-center'>

      
        <form onSubmit={SearchFunction} className='flex w-full justify-center'>
            <input type="text" className='border-2 border-pallete-300 rounded-tl-md rounded-bl-md p-2 border-r-0 w-1/2' placeholder='Enter Keyword' onChange={(e)=>setKeyword(e.target.value)}/>
            <button type='submit' className='bg-pallete-500 text-white px-4 py-2 rounded-tr-md rounded-br-md'>Search</button>
        </form>
      </div>
      {keyword===null && <h1 className='text-center text-2xl mt-36'>Type a keyword to search . . . .</h1>}
      {loading && <h1 className='text-center mt-20'>Loading...</h1>}
      {errormsg && <h1 className='text-center mt-20'>{errormsg}</h1>}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-10 '>
        {news?.map((item,index)=>{
          return(
            <div key={index}>
              <NewsCard item={item}/>
              
            </div>
          )
        })}
        </div>

        <div className="flex justify-center mt-10 mb-20 ">
        <Pagination
        className="pagination-bar  bg-pallete-100/25 p-2 rounded-md"
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={PageSize}
        onPageChange={page => onPageChange(page)

        }
      />
      </div>

    </div>
  )
}

export default Search;