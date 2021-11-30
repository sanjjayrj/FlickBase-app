import React,{ useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getArticle } from '../../../store/actions/article_actions';
import { clearCurrentArticle } from '../../../store/actions/index';
import Loader from '../../../utils/loader';
import ScoreCard from '../../../utils/scoreCard';

const Article = (props) => {
    const { current } = useSelector( state => state.articles );
    const dispatch = useDispatch();
    useEffect(()=>{
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
                        <img alt="poster" src={current.bg_image.slice(0, 49) +"c_thumb,h_600,w_1200/" + current.bg_image.slice(49)}/>
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