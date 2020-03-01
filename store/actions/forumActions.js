export const POST_REPLY = "POST_REPLY";
export const FETCH_QUESTIONS = "FETCH_QUESTIONS";

export const postReply = reply => {
    return { type: POST_REPLY, reply: reply };
};

export const fetchQuestions = question => {
    return { type: FETCH_QUESTIONS, question: question };
};