import React, { useEffect, useState } from 'react';
import axios from '../../apis/axios';
import Card from '../Card/Card';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Skeleton from '../Skeleton/Skeleton';

const Row = ({ title, fetchUrl, settings }) => {
   const [results, setResults] = useState([]);

   useEffect(() => {
      const controller = new AbortController();
      const signal = controller.signal;
      axios
         .get(fetchUrl, { signal })
         .then(res => {
            if (!res.status) {
               throw Error("Coulnt't not fetch the data");
            } else {
               setResults(res.data.data);
            }
         })
         .catch(err => {
            if (err.name === 'AbortError') {
               return 'Request Aborted ';
            }
            return err;
         });

      return () => controller.abort();
   }, [fetchUrl]);

   return (
      <section className="mt-8">
         <h2 className="relative text-white font-semibold ml-2 mb-[20px] whitespace-nowrap uppercase">
            <span className="ml-3 text-base md:text-[21px] tracking-tighter">
               {title}
            </span>
            <span className="absolute top-0 left-0 h-full w-[4px] bg-[#e74538]"></span>
         </h2>
         <div className="relative">
            <Slider {...settings}>
               {!results ||
                  (Array.isArray(results) &&
                     results.length === 0 &&
                     Array.from(Array(25), (_, index) => (
                        <Skeleton key={index} />
                     )))}
               {results.map((result, index) => {
                  return <Card key={index} data={result} type="anime" />;
               })}
            </Slider>
         </div>
      </section>
   );
};

export default Row;
