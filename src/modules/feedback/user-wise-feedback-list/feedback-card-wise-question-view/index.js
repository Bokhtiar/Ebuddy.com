import React, {useState, useEffect} from 'react';
import {TableWrapper, Wrapper} from "../../../commons/Wrapper";
import { FEEDBACK_INITIATE_ALL_LIST } from "../../../../scripts/api";
import {getData, postData} from "../../../../scripts/api-service";
import Card from './card';

const FeedbackCardWiseQuestionView = () => {
    const [cardWiseQuestionList, setCardWiseQuestionList] = useState();
    const [current, setCurrent] = useState(0);
    const [dataLength, setDataLength] = useState();
    const [answerData, setAnswerData] = useState([]);

    let searchUrl = window.location.search;
    let params = new URLSearchParams(searchUrl);
    let paramsFeedbackId = params.get('feedback_id');
    let paramsType = params.get('type');
    let feedbackId = paramsFeedbackId ? paramsFeedbackId * 1 : undefined;
    let typeCheck = paramsType ? paramsType : undefined;

    const getCardWiseQuestionList = async (id) => {
        let url = FEEDBACK_INITIATE_ALL_LIST + "/" + id;
        let res = await getData(url);
        
        if (res) {
          let masterData = res?.data?.data;
          if(masterData?.init_cards?.length > 0) setDataLength(masterData.init_cards.length-1);
          if (res) {
            //formating data for easy traversing in ui
            let tempArray = [];
            if(masterData?.init_cards){
                masterData.init_cards.forEach((item, index)=>{
                    let payload = {
                        id: item.id,
                        card_name: item.card.name,
                        questions: item.feedback_init_questions,
                        card_index: index
                    }
                    tempArray.push(payload);
                })
            }
            if (tempArray?.length) {
                let answer = [];

                tempArray.forEach(arr => {
                    if (arr?.questions?.length) {
                        arr.questions.forEach(qus => {
                            if (qus?.feedback_question?.type === "Text") {
                                answer.push({
                                    id: qus.feedback_question_id,
                                    answer: qus.answer
                                })
                            } else if (qus?.feedback_question?.type === "Checkbox") {
                                let ans = JSON.parse(qus.answer);

                                let anss = [];
                                ans.forEach(a => {
                                    if (a.checked === 1) anss.push(a.name);
                                })
                                answer.push({
                                    id: qus.feedback_question_id,
                                    answer: anss
                                })
                            } else if (qus?.feedback_question?.type === "Radio") {
                                let ans = JSON.parse(qus.answer);

                                let find = ans.find(a => a.checked === 1);

                                answer.push({
                                    id: qus.feedback_question_id,
                                    answer: find?.name || ''
                                })
                            }
                        });

                    };
                })

                setAnswerData(answer);
            }

            setCardWiseQuestionList(tempArray);
          }
        }
    }

    useEffect(()=>{
        getCardWiseQuestionList(feedbackId);
    }, [feedbackId, current]);

  return (
    <Wrapper 
        style={{
            display:'flex', 
            justifyContent:'center', 
        }}
    >
        {cardWiseQuestionList ? cardWiseQuestionList?.map(item=>{
            return(
                <>
                    {item.card_index === current ? 
                        <Card 
                            key={item.id} 
                            cardData={item} 
                            setCurrent={setCurrent}     
                            current={current}
                            dataLength={dataLength}
                            answerData={answerData}
                            setAnswerData={setAnswerData}
                            cardWiseQuestionList={cardWiseQuestionList}
                            feedbackId={feedbackId}
                            typeCheck={typeCheck}
                        /> 
                    : null}
                </>
            )
        }):null}
    </Wrapper>
  )
}

export default FeedbackCardWiseQuestionView;