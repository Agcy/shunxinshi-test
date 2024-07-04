import React, {useState, useEffect} from 'react';
import {
    Card,
    CardContent,
    Button,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    CircularProgress
} from '@mui/material';
import '../style/css/Question.css';

const Question = () => {
    const [questionData, setQuestionData] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8080/questions')
            .then(response => response.json())
            .then(data => setQuestionData(data));
    }, []);

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
        if (selectedOption === questionData[currentQuestionIndex].correctAnswer) {
            setIsCorrect(true);
            setCorrectCount(correctCount + 1);
        } else {
            setIsCorrect(false);
            setIncorrectCount(incorrectCount + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex + 1 < questionData.length) {
            setSelectedOption(null);
            setIsSubmitted(false);
            setIsCorrect(null);
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setIsCompleted(true);
        }
        // setIsSubmitted(false);
        // setSelectedOption(null);
        // setIsCorrect(null);
        // if (currentQuestionIndex < questionData.length - 1) {
        //     setCurrentQuestionIndex(currentQuestionIndex + 1);
        // }
    };

    if (!questionData) {
        return <div><CircularProgress/>Loading...</div>;
    }

    if (isCompleted) {
        return (
            <Card>
                <CardContent>
                    <Typography variant="h5">恭喜，您已完成所有题目！</Typography>
                    <Typography variant="body1">正确: {correctCount}</Typography>
                    <Typography variant="body1">错误: {incorrectCount}</Typography>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card style={{margin: '20px', padding: '20px', maxWidth: '600px'}}>
            <CardContent>
                <Typography variant="h5">
                    {questionData[currentQuestionIndex].id}. {questionData[currentQuestionIndex].questionText}
                </Typography>
                <RadioGroup
                    aria-label="options"
                    name="options"
                    value={selectedOption}
                    onChange={handleOptionChange}
                >
                    {questionData[currentQuestionIndex].options.map((option, index) => (
                        <FormControlLabel
                            key={index}
                            value={String.fromCharCode(65 + index)} // A, B, C, D
                            control={<Radio/>}
                            label={`${String.fromCharCode(65 + index)}. ${option}`}
                            style={{display: 'block', textAlign: 'left', marginLeft: 0}}
                        />
                    ))}
                </RadioGroup>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={isSubmitted ? handleNextQuestion : handleSubmit}
                        disabled={!selectedOption}
                    >
                        {isSubmitted ? '下一题' : '确定'}
                    </Button>
                </div>
                {isSubmitted && (
                    <div>
                        <Typography
                            variant="body2"
                            style={{
                                marginTop: '10px',
                                color: isCorrect ? 'green' : 'red',
                                border: `1px solid ${isCorrect ? 'lightgreen' : 'lightcoral'}`,
                                padding: '10px',
                                borderRadius: '5px'
                            }}
                        >
                            {isCorrect
                                ?
                                <>
                                    回答正确<br/>
                                    {questionData[currentQuestionIndex].answerAnalysis}
                                </>
                                :
                                <>
                                    回答错误，正确答案是{questionData[currentQuestionIndex].correctAnswer}<br/>
                                    {questionData[currentQuestionIndex].answerAnalysis}
                                </>
                            }
                        </Typography>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default Question;
