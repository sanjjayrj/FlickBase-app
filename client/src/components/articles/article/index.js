import React,{ useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getArticle } from '../../../store/actions/article_actions';
import { clearCurrentArticle } from '../../../store/actions/index';
import Loader from '../../../utils/loader';
import ScoreCard from '../../../utils/scoreCard';
//import { Transformation } from 'cloudinary-react';

const Article = (props) => {
    // const cloudinary = require('cloudinary').v2;
    // require('dotenv').config();
    // cloudinary.config({
    //     cloud_name: `${process.env.CLOUD_NAME}`,
    //     api_key: `${process.env.CLOUD_API_KEY}`,
    //     api_secret: `${process.env.CLOUD_API_SECRET}`
    // });
    const { current } = useSelector( state => state.articles );
    const dispatch = useDispatch();
    console.log(current);

    useEffect(()=>{
        /// props.match.params.id
        dispatch(getArticle(props.match.params.id))
    },[dispatch, props.match.params.id])

    useEffect(()=>{
        return () => {
            dispatch(clearCurrentArticle())
        }
    },[dispatch])

    return(
        <>
            { current ?
                <div className="article_container">
                    <div className= "image" >
                        <img alt="poster" src = {current.bg_image}>
                            {/*<Transformation height="150" width="150" crop="fill"/>*/}
                        </img>
                    </div>
                    <h1>{current.title}</h1>
                    <div className="mt-3 content">
                        <div dangerouslySetInnerHTML={
                            { __html: current.content }
                        }>
                        </div>
                    </div>
                    <ScoreCard current={current}/>
                </div>
            :
                <Loader/>
            }
        </>
    )
}

export default Article;