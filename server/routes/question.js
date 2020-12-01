import Question from '../models/Question'
import Answer from '../models/Answer'
import { Collection } from 'mongoose';

exports.GetContents = async (req, res) => {
  // TODO : get questions from mongodb and return to frontend
  Question.find({}, (err, ques) => {
    if (err) {
      console.error(err);
      res.status(403).json({message: 'error', contents: []});
    }
    else{
      res.status(200).json({message: 'success', contents: ques});
    }

  });
}

exports.CheckAns = async (req, res) => {
  // TODO : get answers from mongodb,
  // check answers coming from frontend and return score to frontend
  Answer.find({}, (err, ans_arr) => {
    if (err) {
      console.error(err);
      res.status(403).json({message: 'error', score: -1});
    }
    else{
      var ret_score=0
      console.log(req.body.params.ans);
      for(var i=0 ; i < req.body.params.ans.length ; i++){
        if(req.body.params.ans[i]===ans_arr[i].answer){
          ret_score++;
        }
      }   
      res.status(200).json({message: 'success', score: ret_score});
    }

  });

}
