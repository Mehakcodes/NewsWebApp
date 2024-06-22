import React from 'react';
import NewsCard from '../components/NewsCard';
import { useEffect,useState } from 'react';
import Pagination from '../components/Pagination';

function Home() {
  const apikey=process.env.REACT_APP_NEWS_API_KEY;
  const [news,setNews]=useState([]);
  const [loading,setLoading]=useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const PageSize=6;
  const [totalCount,setTotalCount]=useState(0);
  const [errormsg,setErrormsg]=useState(null);


  useEffect(()=>{
    fetch(`https://newsapi.org/v2/top-headlines?country=in&pageSize=${PageSize}&page=1&apiKey=${apikey}`)
    .then((res)=>res.json())
    .then((data)=>{
      if (data.status=='ok'){
        setNews(data.articles);
        setLoading(false);
        setCurrentPage(1);
        setTotalCount(Math.min(data.totalResults,72));
      }
      else{
        setErrormsg(data.message);
        setLoading(false);
      }

    })
  },[apikey])

  const onPageChange= (page)=>{
    fetch(`https://newsapi.org/v2/top-headlines?country=in&pageSize=${PageSize}&page=${page}&apiKey=${apikey}`)
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
  }

;
  return (
    <div className='w-full'>
      <h1 className='w-full text-center py-20 uppercase text-6xl font-bold'>Top <span className='text-pallete-600'>HEADLINES</span></h1>
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

export default Home