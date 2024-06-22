import React from 'react';
import NewsCard from '../components/NewsCard';
import { useEffect,useState } from 'react';
import Pagination from '../components/Pagination';

function Categories() {
  const apikey=process.env.REACT_APP_NEWS_API_KEY;
  const [news,setNews]=useState([]);
  const [loading,setLoading]=useState(true);
  const [category,setCategory]=useState('technology'); 
  const [currentPage, setCurrentPage] = useState(1);
  const PageSize=6;
  const [totalCount,setTotalCount]=useState(0);
  const [errormsg,setErrormsg]=useState(null);

  useEffect(()=>{
    fetch(`https://newsapi.org/v2/top-headlines?category=${category}&country=in&pageSize=${PageSize}&page=1&apiKey=${apikey}`)
    .then((res)=>res.json())
    .then((data)=>{
      if (data.status==='ok'){
      setNews(data.articles);
      setTotalCount(Math.min(data.totalResults,72));
      setLoading(false);
      setCurrentPage(1);
      }
      else{
        setErrormsg(data.message);
        setLoading(false);

      }
    })
  },[category,apikey]);

  const onPageChange= (page)=>{
    fetch(`https://newsapi.org/v2/top-headlines?category=${category}&country=in&pageSize=${PageSize}&page=${page}&apiKey=${apikey}`)
    .then((res)=>res.json())
    .then((data)=>{
      if(data.status==='ok'){
      setNews(data.articles);
      setLoading(false);
      setCurrentPage(page);
      }
      else{
        setErrormsg(data.message);
        setLoading(false);
      }
    })
    window.scrollTo({top:0,behavior:'smooth'});
  };



  
  const categoryChange=(e)=>{
    setCategory(e.target.value);
  }
  const NewsCategories=[
    {
      name:'Technology',
      value:'technology',
    },
    {
      name:'Business',
      value:'business',
    },
    {
      name:'Entertainment',
      value:'entertainment',
    },
    {
      name:'Sports',
      value:'sports',
    },
    {
      name:'Science',
      value:'science',
    },

    {
      name:'Health',
      value:'health',
    },
    {
      name:'General',
      value:'general',
    }
  ];
  return (
    <div className='w-full'>
      <h1 className='w-full text-center py-20 uppercase text-6xl font-bold'>Search By <span className='text-pallete-600'>category</span></h1>
      <div className='w-full flex justify-center'>

      
      <select className='w-1/2  mx-auto p-2 outline-none border-2 border-pallete-300 rounded-md font-semibold ' name="category " id="category" onChange={categoryChange}>
        {NewsCategories.map((item,index)=>{
          return(
            <option key={index} value={item.value} className="">{item.name}</option>
          )
        })}
      </select>
      </div>
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

export default Categories;